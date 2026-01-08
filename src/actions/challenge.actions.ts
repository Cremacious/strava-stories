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
  circleId: string
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


