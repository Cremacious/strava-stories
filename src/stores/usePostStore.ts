import { create } from 'zustand';
import { createPost as createPostAction } from '@/actions/post.actions';
import { getUserPosts } from '@/actions/post.actions';
import { Post } from '@/lib/types/posts.type';

interface PostStore {
  posts: Post[];
  loading: boolean;
  setPosts: (posts: Post[]) => void;
  fetchPosts: () => Promise<void>;
  createPost: (data: {
    content?: string;
    privacy: string;
    feeling?: string;
    images?: File[];
    tags?: { type: 'USER' | 'LOCATION'; value: string }[];
    location: string;
    circleId?: string;
  }) => Promise<void>;
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  loading: false,
  setPosts: (posts) => set({ posts }),
  fetchPosts: async () => {
    const postsResult = await getUserPosts();
    const transformedPosts: Post[] = postsResult.success
      ? postsResult.posts || []
      : [];
    set({ posts: transformedPosts });
  },
  createPost: async (data) => {
    set({ loading: true });
    try {
      await createPostAction(data);
      // After creating post, refetch posts to update the list
      await get().fetchPosts();
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
