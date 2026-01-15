'use server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function getCurrentUserFriends() {}

export async function getFriendById(friendId: string) {}

export async function sendFriendRequest(friendId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    if (user.id === friendId) {
      return {
        success: false,
        error: 'Cannot send friend request to yourself',
      };
    }

    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId: user.id, friendId },
          { userId: friendId, friendId: user.id },
        ],
      },
    });

    if (existingFriendship) {
      return {
        success: false,
        error: 'Friendship already exists or request pending',
      };
    }

   
    await prisma.friendship.create({
      data: {
        userId: user.id,
        friendId,
        status: 'PENDING',
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending friend request:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to send friend request',
    };
  }
}

export async function acceptFriendRequest(friendId: string) {}

export async function declineFriendRequest(friendId: string) {}

export async function getPendingFriendRequests() {}

export async function removeFriend(friendId: string) {}

export async function searchUsers(query: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    if (!query || query.trim().length < 2) {
      return { success: true, users: [] };
    }

    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
            ],
          },
          { id: { not: user.id } }, 
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        bio: true,
      },
      take: 10, 
    });

    return { success: true, users };
  } catch (error) {
    console.error('Error searching users:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to search users',
    };
  }
}
