'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { CreateChallengeData } from '@/lib/types/challenge.type';

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
    const circle = await prisma.circle.findUnique({
      where: { id: circleId },
      select: { ownerId: true },
    });

    if (!circle) {
      throw new Error('Circle not found');
    }

    const membership = await prisma.circleMember.findFirst({
      where: {
        circleId: circleId,
        userId: user.id,
      },
    });

    if (!membership && circle.ownerId !== user.id) {
      throw new Error('Unauthorized to add challenges to this circle');
    }

    const challenge = await prisma.circleChallenge.create({
      data: {
        ...challengeData,
        userId: user.id,
        circleId,
        createdAt: new Date(),
        updatedAt: new Date(),
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
