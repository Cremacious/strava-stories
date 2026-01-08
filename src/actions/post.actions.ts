'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { Post } from '@/lib/types/posts.type';

export async function createPost(data: {
  content: string;
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
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('posts')
        .upload(fileName, file);

      if (uploadError) {
        throw new Error(`Image upload failed: ${uploadError.message}`);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('posts').getPublicUrl(uploadData.path);

      imageUrls.push(publicUrl);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postData: any = {
    userId: user.id,
    content: data.content,
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
      where: { userId: user.id },
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
      content: p.content,
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
