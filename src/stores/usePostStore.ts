import { create } from 'zustand';
import { createPost } from '@/actions/post.actions';

interface PostStore {
  loading: boolean;
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

export const usePostStore = create<PostStore>((set) => ({
  loading: false,
  createPost: async (data) => {
    set({ loading: true });
    try {
      await createPost(data);
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
