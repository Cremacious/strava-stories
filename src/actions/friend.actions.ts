'use server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { User } from '@/lib/types/user.type';
export async function getCurrentUserFriends() {}

export async function getFriendById(friendId: string) {}

export async function sendFriendRequest(friendId: string) {
  try {
    const supabase = await createClient();
    const { data, error: authError } = await supabase.auth.getUser();
    const user = data?.user as User | null;

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

export async function acceptFriendRequest(friendId: string) {
  try {
    const supabase = await createClient();
    const { data, error: authError } = await supabase.auth.getUser();
    const user = data?.user as User | null;

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    if (user.id === friendId) {
      return {
        success: false,
        error: 'Cannot accept friend request from yourself',
      };
    }

    const friendship = await prisma.friendship.findFirst({
      where: {
        userId: friendId,
        friendId: user.id,
        status: 'PENDING',
      },
    });

    if (!friendship) {
      return {
        success: false,
        error: 'No pending friend request found',
      };
    }

    await prisma.friendship.update({
      where: { id: friendship.id },
      data: { status: 'ACCEPTED' },
    });

    return { success: true };
  } catch (error) {
    console.error('Error accepting friend request:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to accept friend request',
    };
  }
}

export async function declineFriendRequest(friendId: string) {
  try {
    const supabase = await createClient();
    const { data, error: authError } = await supabase.auth.getUser();
    const user = data?.user as User | null;

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    if (user.id === friendId) {
      return {
        success: false,
        error: 'Cannot decline friend request from yourself',
      };
    }

    const friendship = await prisma.friendship.findFirst({
      where: {
        userId: friendId,
        friendId: user.id,
        status: 'PENDING',
      },
    });

    if (!friendship) {
      return {
        success: false,
        error: 'No pending friend request found',
      };
    }

    await prisma.friendship.delete({
      where: { id: friendship.id },
    });

    return { success: true };
  } catch (error) {
    console.error('Error declining friend request:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to decline friend request',
    };
  }
}

export async function getPendingFriendRequests() {
  try {
    const supabase = await createClient();
    const { data, error: authError } = await supabase.auth.getUser();
    const user = data?.user as User | null;

    if (authError || !user) {
      return {
        success: false,
        error: 'User not authenticated',
        friendRequests: [],
      };
    }

    console.log('Current user ID:', user.id, 'Email:', user.email);

    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId: user.id, status: 'PENDING' },
          { friendId: user.id, status: 'PENDING' },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            bio: true,
          },
        },
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            bio: true,
          },
        },
      },
    });

    console.log(
      'Raw friendships from DB:',
      friendships.map((f) => ({
        id: f.id,
        userId: f.userId,
        friendId: f.friendId,
        status: f.status,
        userEmail: f.user.email,
        friendEmail: f.friend.email,
      }))
    );

    const friendRequests = friendships.map((friendship) => {
      const isSentByCurrentUser = friendship.userId === user.id ? true : false;
      const otherUser = isSentByCurrentUser
        ? friendship.friend
        : friendship.user;
      console.log(
        `Mapping for friendship ${friendship.id}: isSentByCurrentUser = ${isSentByCurrentUser}, otherUserEmail = ${otherUser.email}`
      );
      return {
        id: friendship.id,
        friendId: otherUser.id,
        name: otherUser.name || undefined,
        email: otherUser.email,
        avatarUrl: otherUser.avatarUrl || undefined,
        bio: otherUser.bio || undefined,
        isSentByCurrentUser,
      };
    });

    return { success: true, friendRequests };
  } catch (error) {
    console.error('Error fetching pending friend requests:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch pending friend requests',
      friendRequests: [],
    };
  }
}

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
