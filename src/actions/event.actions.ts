'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { CreateEventData } from '@/lib/types/event.type';

export async function createCircleEventAction(
  eventData: CreateEventData,
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

    const event = await prisma.circleEvent.create({
      data: {
        ...eventData,
        circleId,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: eventData.status === 'PUBLISHED' ? new Date() : null,
        totalRsvps: 0,
        confirmedAttendees: 0,
      },
    });

    return { success: true, event };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create event',
    };
  }
}

export async function getCircleEvents(circleId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    const isMember = await prisma.circleMember.findFirst({
      where: { circleId, userId: user.id },
    });
    if (!isMember) {
      throw new Error('Access denied');
    }

    const events = await prisma.circleEvent.findMany({
      where: { circleId },
      orderBy: { createdAt: 'desc' },
    });

    return { success: true, events };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch events',
    };
  }
}
