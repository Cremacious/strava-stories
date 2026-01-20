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
  memberCount: number;
  category: string;
  stats: {
    totalWorkouts: number;
  };
  isMember: boolean;
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
  circleId: string
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
            members: true,
          },
        },
      },
    });

    if (!circle) {
      return { success: false, error: 'Circle not found' };
    }

    const isMember = circle.members.some((member) => member.userId === user.id);

    // Allow viewing public circles even if not a member
    if (!isMember && circle.visibility !== 'PUBLIC') {
      return { success: false, error: 'Access denied' };
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
      memberCount: circle._count.members,
      category: 'Fitness',
      stats: {
        totalWorkouts,
      },
      isMember,
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
                members: true,
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

    await prisma.circleMember.create({
      data: {
        circleId,
        userId: user.id,
        role: 'MEMBER',
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
