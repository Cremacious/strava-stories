'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

interface CreateCircleData {
  name: string;
  description?: string;
  visibility?: 'PUBLIC' | 'PRIVATE';
  invitedMembers?: string[];
}

interface CircleDetail {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  memberCount: number;
  category: string;
  stats: {
    totalWorkouts: number;
  };
  isMember: boolean;
  membershipStatus: 'NONE' | 'PENDING' | 'ACTIVE';
  visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS' | 'CIRCLE';
}

export async function createCircle(data: CreateCircleData) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const circle = await prisma.circle.create({
      data: {
        name: data.name,
        description: data.description,
        visibility: data.visibility || 'PRIVATE',
        ownerId: user.id,
        members: {
          create: [
            { userId: user.id, role: 'OWNER' },
            ...(data.invitedMembers?.map((memberId) => ({
              userId: memberId,
              role: 'MEMBER' as const,
            })) || []),
          ],
        },
      },
    });

    return { success: true, circle };
  } catch (error) {
    console.error('Error creating circle:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create circle',
    };
  }
}

export async function getCircleById(
  circleId: string,
): Promise<{ success: boolean; circle?: CircleDetail; error?: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const circle = await prisma.circle.findUnique({
      where: { id: circleId },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            members: {
              where: {
                status: 'ACTIVE',
              },
            },
          },
        },
      },
    });

    if (!circle) {
      return { success: false, error: 'Circle not found' };
    }

    const membership = circle.members.find(
      (member) => member.userId === user.id,
    );
    let membershipStatus: 'NONE' | 'PENDING' | 'ACTIVE' = membership
      ? membership.status
      : 'NONE';

    if (circle.ownerId === user.id) {
      membershipStatus = 'ACTIVE';
    }

    const totalWorkouts = await prisma.workout.count({
      where: {
        circleId: circleId,
        userId: {
          in: circle.members.map((member) => member.userId),
        },
      },
    });

    const circleDetail: CircleDetail = {
      id: circle.id,
      name: circle.name,
      description: circle.description,
      ownerId: circle.ownerId,
      memberCount: circle._count.members,
      category: 'Fitness',
      stats: {
        totalWorkouts,
      },
      isMember: membershipStatus === 'ACTIVE',
      membershipStatus,
      visibility: circle.visibility,
    };

    return { success: true, circle: circleDetail };
  } catch (error) {
    console.error('Error fetching circle by ID:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch circle',
    };
  }
}

export async function getCirclesForUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated', circles: [] };
    }

    const circleMembers = await prisma.circleMember.findMany({
      where: {
        userId: user.id,
      },
      include: {
        circle: {
          include: {
            _count: {
              select: {
                members: {
                  where: {
                    status: 'ACTIVE',
                  },
                },
              },
            },
            members: {
              take: 1,
            },
          },
        },
      },
    });

    const circles = circleMembers.map((member) => ({
      id: member.circle.id,
      name: member.circle.name,
      description: member.circle.description,
      category: 'Fitness',
      memberCount: member.circle._count.members,
      avatar: '/default-circle-avatar.png',
      lastActivity: 'Recently active',
      upcomingChallenge: undefined,
      achievements: [] as string[],
      recentActivity: [] as { user: string; action: string; time: string }[],
    }));

    return { success: true, circles };
  } catch (error) {
    console.error('Error fetching circles for user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch circles',
      circles: [],
    };
  }
}

export async function joinCircle(circleId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const existingMember = await prisma.circleMember.findUnique({
      where: {
        circleId_userId: {
          circleId,
          userId: user.id,
        },
      },
    });

    if (existingMember) {
      return { success: false, error: 'Already a member of this circle' };
    }

    const circle = await prisma.circle.findUnique({
      where: { id: circleId },
      select: { visibility: true },
    });

    if (!circle) {
      return { success: false, error: 'Circle not found' };
    }

    const status = circle.visibility === 'PRIVATE' ? 'PENDING' : 'ACTIVE';

    await prisma.circleMember.create({
      data: {
        circleId,
        userId: user.id,
        role: 'MEMBER',
        status,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error joining circle:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to join circle',
    };
  }
}

export async function leaveCircle(circleId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const circle = await prisma.circle.findUnique({
      where: { id: circleId },
      select: { ownerId: true },
    });

    if (!circle) {
      return { success: false, error: 'Circle not found' };
    }

    if (circle.ownerId === user.id) {
      return { success: false, error: 'Cannot leave circle as owner' };
    }

    await prisma.circleMember.deleteMany({
      where: {
        circleId,
        userId: user.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error leaving circle:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to leave circle',
    };
  }
}

export async function getAllCircles() {
  try {
    const circles = await prisma.circle.findMany({
      include: {
        _count: {
          select: {
            members: {
              where: {
                status: 'ACTIVE',
              },
            },
          },
        },
        members: {
          take: 1,
        },
      },
    });

    return { success: true, circles };
  } catch (error) {
    console.error('Error fetching all circles:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch circles',
      circles: [],
    };
  }
}

export async function approveCircleRequest(circleId: string, userId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const membership = await prisma.circleMember.findUnique({
      where: {
        circleId_userId: {
          circleId,
          userId: user.id,
        },
      },
    });

    if (
      !membership ||
      (membership.role !== 'OWNER' && membership.role !== 'MODERATOR')
    ) {
      return { success: false, error: 'Unauthorized' };
    }

    await prisma.circleMember.updateMany({
      where: {
        circleId,
        userId,
        status: 'PENDING',
      },
      data: {
        status: 'ACTIVE',
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error approving circle request:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to approve request',
    };
  }
}

export async function rejectCircleRequest(circleId: string, userId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const membership = await prisma.circleMember.findUnique({
      where: {
        circleId_userId: {
          circleId,
          userId: user.id,
        },
      },
    });

    if (
      !membership ||
      (membership.role !== 'OWNER' && membership.role !== 'MODERATOR')
    ) {
      return { success: false, error: 'Unauthorized' };
    }

    await prisma.circleMember.deleteMany({
      where: {
        circleId,
        userId,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error rejecting circle request:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to reject request',
    };
  }
}

export async function getPendingCircleRequests(circleId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated', requests: [] };
    }

    const membership = await prisma.circleMember.findUnique({
      where: {
        circleId_userId: {
          circleId,
          userId: user.id,
        },
      },
    });

    if (
      !membership ||
      (membership.role !== 'OWNER' && membership.role !== 'MODERATOR')
    ) {
      return { success: false, error: 'Unauthorized', requests: [] };
    }

    const pendingRequests = await prisma.circleMember.findMany({
      where: {
        circleId,
        status: 'PENDING',
      },
      include: {
        user: true,
      },
    });

    const requests = pendingRequests.map((member) => ({
      id: member.id,
      user: {
        id: member.userId,
        name: member.user.name,
        avatarUrl: member.user.avatarUrl,
      },
    }));

    return { success: true, requests };
  } catch (error) {
    console.error('Error fetching pending circle requests:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch requests',
      requests: [],
    };
  }
}

export async function getRecentCirclesHighlights() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: 'User not authenticated',
        highlights: [],
      };
    }

    const userMemberships = await prisma.circleMember.findMany({
      where: {
        userId: user.id,
        status: 'ACTIVE',
      },
      select: {
        circleId: true,
      },
    });

    const circleIds = userMemberships.map((membership) => membership.circleId);

    if (circleIds.length === 0) {
      return { success: true, highlights: [] };
    }

    const recentEvents = await prisma.circleEvent.findMany({
      where: {
        circleId: {
          in: circleIds,
        },
        userId: {
          not: user.id,
        },
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
        circle: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    const recentPolls = await prisma.circlePoll.findMany({
      where: {
        circleId: {
          in: circleIds,
        },
        userId: {
          not: user.id,
        },
      },
      select: {
        id: true,
        question: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
        circle: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    const recentChallenges = await prisma.circleChallenge.findMany({
      where: {
        circleId: {
          in: circleIds,
        },
        userId: {
          not: user.id,
        },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
        circle: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    const allHighlights = [
      ...recentEvents.map((event) => ({
        id: event.id,
        circle: event.circle.name,
        user: event.user.name || 'Unknown User',
        achievement: `Created event: ${event.name}`,
        type: 'event',
        time: event.createdAt,
      })),
      ...recentPolls.map((poll) => ({
        id: poll.id,
        circle: poll.circle.name,
        user: poll.user.name || 'Unknown User',
        achievement: `Created poll: ${poll.question}`,
        type: 'poll',
        time: poll.createdAt,
      })),
      ...recentChallenges.map((challenge) => ({
        id: challenge.id,
        circle: challenge.circle.name,
        user: challenge.user.name || 'Unknown User',
        achievement: `Created challenge: ${challenge.title}`,
        type: 'challenge',
        time: challenge.createdAt,
      })),
    ];

    const sortedHighlights = allHighlights
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 10);

    const formattedHighlights = sortedHighlights.map((highlight) => ({
      ...highlight,
      time: getRelativeTime(highlight.time),
    }));

    return { success: true, highlights: formattedHighlights };
  } catch (error) {
    console.error('Error fetching recent circles highlights:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch highlights',
      highlights: [],
    };
  }
}

export interface RecommendedCircle {
  id: string;
  name: string;
  description: string | null;
  visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS' | 'CIRCLE';
  memberCount: number;
  friendsInCircle: {
    id: string;
    name: string | null;
    avatarUrl: string | null;
  }[];
  recommendationReason: string;
}

export async function getRecommendedCircles(): Promise<{
  success: boolean;
  circles: RecommendedCircle[];
  error?: string;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated', circles: [] };
    }


    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId: user.id, status: 'ACCEPTED' },
          { friendId: user.id, status: 'ACCEPTED' },
        ],
      },
      select: {
        userId: true,
        friendId: true,
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        friend: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    const friendIds = friendships.map((f) =>
      f.userId === user.id ? f.friendId : f.userId,
    );

    if (friendIds.length === 0) {
      return { success: true, circles: [] };
    }

    const userMemberships = await prisma.circleMember.findMany({
      where: { userId: user.id },
      select: { circleId: true },
    });

    const userCircleIds = userMemberships.map((m) => m.circleId);

    const friendCircleMemberships = await prisma.circleMember.findMany({
      where: {
        userId: { in: friendIds },
        status: 'ACTIVE',
        circleId: { notIn: userCircleIds },
      },
      include: {
        circle: {
          include: {
            _count: {
              select: {
                members: {
                  where: { status: 'ACTIVE' },
                },
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });


    const circleMap = new Map<
      string,
      {
        circle: (typeof friendCircleMemberships)[0]['circle'];
        friends: {
          id: string;
          name: string | null;
          avatarUrl: string | null;
        }[];
      }
    >();

    for (const membership of friendCircleMemberships) {
      const circleId = membership.circleId;
      if (!circleMap.has(circleId)) {
        circleMap.set(circleId, {
          circle: membership.circle,
          friends: [],
        });
      }
      circleMap.get(circleId)!.friends.push({
        id: membership.user.id,
        name: membership.user.name,
        avatarUrl: membership.user.avatarUrl,
      });
    }

 
    const recommendedCircles: RecommendedCircle[] = Array.from(
      circleMap.values(),
    )
      .map(({ circle, friends }) => {
        const friendCount = friends.length;
        const friendNames = friends
          .slice(0, 2)
          .map((f) => f.name || 'A friend')
          .join(', ');
        const reason =
          friendCount === 1
            ? `${friendNames} is a member`
            : friendCount === 2
              ? `${friendNames} are members`
              : `${friendNames} and ${friendCount - 2} more friends are members`;

        return {
          id: circle.id,
          name: circle.name,
          description: circle.description,
          visibility: circle.visibility,
          memberCount: circle._count.members,
          friendsInCircle: friends,
          recommendationReason: reason,
        };
      })
      .sort((a, b) => b.friendsInCircle.length - a.friendsInCircle.length)
      .slice(0, 10);

    return { success: true, circles: recommendedCircles };
  } catch (error) {
    console.error('Error fetching recommended circles:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch recommended circles',
      circles: [],
    };
  }
}

function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return past.toLocaleDateString();
}
