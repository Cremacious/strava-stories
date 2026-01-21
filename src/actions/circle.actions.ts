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
