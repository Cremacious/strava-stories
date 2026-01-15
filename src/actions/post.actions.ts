'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { Post } from '@/lib/types/posts.type';
import cloudinary from '@/lib/cloudinary';

export async function createPost(data: {
  content?: string;
  privacy: string;
  feeling?: string;
  images?: File[];
  tags?: { type: 'USER' | 'LOCATION'; value: string }[];
  location: string;
  circleId?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('User not authenticated');
  }

  const imageUrls: string[] = [];
  if (data.images && data.images.length > 0) {
    for (const file of data.images) {
      const buffer = Buffer.from(await file.arrayBuffer());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'fit-posts',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(buffer);
      });

      imageUrls.push(result.secure_url);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postData: any = {
    userId: user.id,
    content: data.content || '',
    privacy: data.privacy,
    feeling: data.feeling,
    images: {
      create: imageUrls.map((url) => ({ url })),
    },
    tags: {
      create:
        data.tags?.map((tag) => ({ type: tag.type, value: tag.value })) || [],
    },
  };

  if (data.location === 'circle') {
    if (!data.circleId) {
      throw new Error('Circle ID is required for circle posts');
    }
    postData.circleId = data.circleId;
  }

  const post = await prisma.post.create({
    data: postData,
  });

  return post;
}

export async function getUserPosts() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const rawPosts = await prisma.post.findMany({
      where: { userId: user.id, circleId: null },
      include: {
        user: { select: { name: true, avatarUrl: true } },
        images: true,
        tags: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const transformedPosts: Post[] = rawPosts.map((p) => ({
      id: p.id,
      userName: p.user.name || 'Unknown',
      avatar: p.user.avatarUrl || '',
      time: p.createdAt.toLocaleString(),
      content: p.content ?? undefined,
      image: p.images[0]?.url,
      tags: {
        friends: p.tags.filter((t) => t.type === 'USER').map((t) => t.value),
        cities: p.tags.filter((t) => t.type === 'LOCATION').map((t) => t.value),
      },
      feeling: p.feeling ?? undefined,
    }));

    return { success: true, posts: transformedPosts };
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch posts',
    };
  }
}

export async function getCirclePosts(circleId: string) {
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
          where: { userId: user.id },
        },
      },
    });

    if (!circle) {
      return { success: false, error: 'Circle not found' };
    }

    const isMember = circle.members.length > 0;
    if (!isMember) {
      return { success: false, error: 'Access denied' };
    }

    const posts = await prisma.post.findMany({
      where: { circleId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        images: true,
        tags: true,
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
            replies: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const transformedPosts: Post[] = posts.map((p) => ({
      id: p.id,
      userName: p.user.name || 'Unknown',
      avatar: p.user.avatarUrl || '',
      time: p.createdAt.toLocaleString(),
      content: p.content ?? undefined,
      image: p.images[0]?.url,
      tags: {
        friends: p.tags.filter((t) => t.type === 'USER').map((t) => t.value),
        cities: p.tags.filter((t) => t.type === 'LOCATION').map((t) => t.value),
      },
      feeling: p.feeling ?? undefined,
    }));

    return { success: true, posts: transformedPosts };
  } catch (error) {
    console.error('Error fetching circle posts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch posts',
    };
  }
}

export async function getCurrentUserCirclePosts() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const memberships = await prisma.circleMember.findMany({
      where: { userId: user.id },
      select: { circleId: true },
    });

    const circleIds = memberships.map((m) => m.circleId);

    if (circleIds.length === 0) {
      return { success: true, posts: [] };
    }

    const posts = await prisma.post.findMany({
      where: { circleId: { in: circleIds } },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        images: true,
        tags: true,
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
            replies: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        circle: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const transformedPosts: Post[] = posts.map((p) => ({
      id: p.id,
      userName: p.user.name || 'Unknown',
      avatar: p.user.avatarUrl || '',
      time: p.createdAt.toLocaleString(),
      content: p.content ?? undefined,
      image: p.images[0]?.url,
      tags: {
        friends: p.tags.filter((t) => t.type === 'USER').map((t) => t.value),
        cities: p.tags.filter((t) => t.type === 'LOCATION').map((t) => t.value),
      },
      feeling: p.feeling ?? undefined,
    }));

    return { success: true, posts: transformedPosts };
  } catch (error) {
    console.error('Error fetching current user circle posts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch posts',
    };
  }
}
