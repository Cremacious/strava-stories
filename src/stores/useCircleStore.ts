import { create } from 'zustand';
import { createCircle } from '@/actions/circle.actions';

interface CreateCircleData {
  name: string;
  description?: string;
  invitedMembers?: string[];
}

interface Circle {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
}

interface CircleStore {
  isLoading: boolean;
  error: string | null;
  createCircle: (
    data: CreateCircleData
  ) => Promise<{ success: boolean; circle?: Circle }>;
  clearError: () => void;
}

export const useCircleStore = create<CircleStore>((set) => ({
  isLoading: false,
  error: null,
  clearError: () => set({ error: null }),
  createCircle: async (data: CreateCircleData) => {
    set({ isLoading: true, error: null });
    try {
      const result = await createCircle(data);
      if (!result.success) {
        set({
          error: result.error || 'Failed to create circle',
          isLoading: false,
        });
        return { success: false };
      }
      set({ isLoading: false });
      return { success: true, circle: result.circle };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      return { success: false };
    }
  },
}));
