'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { ChallengeStatus } from '@/lib/types/challenge.type';
import { CreateChallengeData } from '@/lib/types/challenge.type';

export async function getCircleChallenges(circleId: string) {
  try {
    const challenges = await prisma.circleChallenge.findMany({
      where: { circleId },
      orderBy: { createdAt: 'desc' },
    });

    const transformedChallenges = challenges
      .filter((challenge) => {
        return ['ACTIVE', 'COMPLETED', 'CANCELLED'].includes(challenge.status);
      })
      .map((challenge) => ({
        ...challenge,
        status:
          challenge.status === 'ACTIVE'
            ? ChallengeStatus.ACTIVE
            : challenge.status === 'COMPLETED'
              ? ChallengeStatus.COMPLETED
              : ChallengeStatus.CANCELLED,
      }));

    return { success: true, challenges: transformedChallenges };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch challenges',
    };
  }
}

export async function createCircleChallengeAction(
  challengeData: CreateChallengeData,
  circleId: string,
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    const challenge = await prisma.circleChallenge.create({
      data: {
        ...challengeData,
        circleId,
        status: ChallengeStatus.ACTIVE,
        userId: user.id,
        averageProgress: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        endDate: new Date(),
      },
    });

    return { success: true, challenge };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to create challenge',
    };
  }
}

export async function getCircleChallengeById(challengeId: string) {
  try {
    const challenge = await prisma.circleChallenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      return {
        success: false,
        error: 'Challenge not found',
      };
    }

    return { success: true, challenge };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch challenge',
    };
  }
}

export async function getAllActiveChallenges() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('User not authenticated');
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
      return { success: true, challenges: [] };
    }

    const challenges = await prisma.circleChallenge.findMany({
      where: {
        circleId: {
          in: circleIds,
        },
        status: 'ACTIVE',
      },
      select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        endDate: true,
        goal: true,
        circleId: true,
        totalParticipants: true,
        averageProgress: true,
        category: true,
        circle: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const transformedChallenges = challenges.map((challenge) => ({
      id: challenge.id,
      title: challenge.title,
      circle: challenge.circle.name,
      participants: challenge.totalParticipants,
      progress: Math.round(challenge.averageProgress),
      endDate: challenge.endDate.toISOString().split('T')[0],
      type: challenge.category || 'Challenge',
    }));

    return { success: true, challenges: transformedChallenges };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch active challenges',
    };
  }
}
