'use server';
import { prisma } from '@/lib/prisma';
import { Poll } from '@/lib/types/poll.type';
import { createClient } from '@/lib/supabase/server';
import { createPollSchema } from '@/lib/validators/poll.validators';

interface CreatePollData {
  question: string;
  options: string[];
  resultsVisibility: 'LIVE' | 'HIDDEN' | 'AFTER_VOTE';
  closedAt: Date | null;
}

export async function createCirclePoll(
  pollData: CreatePollData,
  circleId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ success: boolean; poll?: any; error?: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const validation = createPollSchema.safeParse(pollData);
    if (!validation.success) {
      const errors = validation.error.issues
        .map((issue) => issue.message)
        .join(', ');
      return { success: false, error: `Validation failed: ${errors}` };
    }

    let mappedVisibility: 'LIVE' | 'AFTER_CLOSE';
    switch (pollData.resultsVisibility) {
      case 'LIVE':
        mappedVisibility = 'LIVE';
        break;
      case 'HIDDEN':
      case 'AFTER_VOTE':
        mappedVisibility = 'AFTER_CLOSE';
        break;
      default:
        return { success: false, error: 'Invalid results visibility' };
    }

    const poll = await prisma.circlePoll.create({
      data: {
        userId: user.id,
        circleId,
        question: pollData.question,
        resultsVisibility: mappedVisibility,
        closedAt: pollData.closedAt,
        options: {
          create: pollData.options.map((text) => ({
            text,
          })),
        },
      },
      include: {
        options: true,
      },
    });

    return { success: true, poll };
  } catch (error) {
    console.error('Error creating poll:', error);
    return { success: false, error: 'Failed to create poll' };
  }
}

export async function getCirclePolls(
  circleId: string
): Promise<{ success: boolean; polls?: Poll[]; error?: string }> {
  try {
    const polls = await prisma.circlePoll.findMany({
      where: { circleId },
      include: {
        user: { select: { name: true } },
        options: {
          include: {
            votes: true,
          },
        },
      },
    });

    const formattedPolls: Poll[] = polls.map((poll) => {
      const totalVotes = poll.options.reduce(
        (sum, opt) => sum + opt.votes.length,
        0
      );
      const options = poll.options.map((opt) => ({
        text: opt.text,
        votes: opt.votes.length,
      }));
      const endsAt = poll.closedAt
        ? poll.closedAt.toISOString().split('T')[0] // Format as date string, adjust if needed
        : 'Never';

      return {
        id: poll.id,
        question: poll.question,
        createdBy: poll.user.name || 'Unknown',
        options,
        totalVotes,
        endsAt,
      };
    });

    return { success: true, polls: formattedPolls };
  } catch (error) {
    console.error('Error fetching polls:', error);
    return { success: false, error: 'Failed to fetch polls' };
  }
}
