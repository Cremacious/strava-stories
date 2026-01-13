import { create } from 'zustand';
import { getUserSession, updateUserProfileImage } from '@/actions/user.actions';

interface UserStore {
  userId: string | null;
  setUserId: (id: string | null) => void;
  fetchUserId: () => Promise<void>;
  updateUserProfileImage: (
    formData: FormData
  ) => Promise<{ success: boolean; imageUrl?: string; error?: string }>;
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  setUserId: (id: string | null) => set({ userId: id }),
  fetchUserId: async () => {
    const sessionResult = await getUserSession();
    if (sessionResult.success && sessionResult.user) {
      set({ userId: sessionResult.user.id });
    } else {
      set({ userId: null });
    }
  },
  updateUserProfileImage: async (formData: FormData) => {
    return await updateUserProfileImage(formData);
  },
}));
