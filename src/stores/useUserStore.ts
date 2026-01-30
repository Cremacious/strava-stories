import { create } from 'zustand';
import {
  getUserSession,
  updateUserProfileImage,
  updateUserLocation,
  getUserProfile,
  getCurrentUserAvatar,
} from '@/actions/user.actions';

interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  city?: string;
  state?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserStore {
  userId: string | null;
  user: User | null;
  setUserId: (id: string | null) => void;
  fetchUserId: () => Promise<void>;
  fetchUser: () => Promise<void>;
  updateUserProfileImage: (
    formData: FormData,
  ) => Promise<{ success: boolean; imageUrl?: string; error?: string }>;
  updateUserLocation: (
    userId: string,
    location: { city: string; state: string; country: string },
  ) => Promise<{ success: boolean; error?: string }>;
  getUserAvatar: () => Promise<string | null>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  userId: null,
  user: null,
  setUserId: (id: string | null) => set({ userId: id }),
  fetchUserId: async () => {
    const sessionResult = await getUserSession();
    if (sessionResult.success && sessionResult.user) {
      set({ userId: sessionResult.user.id });
    } else {
      set({ userId: null });
    }
  },
  fetchUser: async () => {
    const result = await getUserProfile();
    if (result.success && result.user) {
      set({ user: result.user, userId: result.user.id });
    } else {
      set({ user: null, userId: null });
    }
  },
  updateUserProfileImage: async (formData: FormData) => {
    const result = await updateUserProfileImage(formData);
    if (result.success && result.imageUrl) {
      const currentUser = get().user;
      if (currentUser) {
        set({ user: { ...currentUser, avatarUrl: result.imageUrl } });
      }
    }
    return result;
  },
  updateUserLocation: async (
    userId: string,
    location: { city: string; state: string; country: string },
  ) => {
    const result = await updateUserLocation(
      userId,
      location.city,
      location.state,
      location.country,
    );
    if (result.success) {
      const currentUser = get().user;
      if (currentUser) {
        set({ user: { ...currentUser, ...location } });
      }
    }
    return result;
  },
  getUserAvatar: async () => {
    const result = await getCurrentUserAvatar();
    if (result.success) {
      return result.avatarUrl ?? null;
    }
    return null;
  },
}));
