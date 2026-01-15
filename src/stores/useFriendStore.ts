import { create } from 'zustand';
import {
  getCurrentUserFriends,
  getFriendById,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getPendingFriendRequests,
  removeFriend,
  searchUsers,
} from '@/actions/friend.actions';

interface UserSearchResult {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
}

interface FriendStoreState {
  searchResults: UserSearchResult[];
  isSearching: boolean;
  searchError: string | null;
}

interface FriendStoreActions {
  searchUsersForFriends: (query: string) => Promise<void>;
  sendFriendRequest: (
    friendId: string
  ) => Promise<{ success: boolean; error?: string }>;
  clearSearchResults: () => void;
}

type FriendStore = FriendStoreState & FriendStoreActions;

export const useFriendStore = create<FriendStore>((set, get) => ({
  searchResults: [],
  isSearching: false,
  searchError: null,

  searchUsersForFriends: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [], searchError: null });
      return;
    }

    set({ isSearching: true, searchError: null });

    try {
      const result = await searchUsers(query);

      if (result.success) {
        set({
          searchResults: result.users || [],
          isSearching: false,
          searchError: null,
        });
      } else {
        set({
          searchResults: [],
          isSearching: false,
          searchError: result.error || 'Search failed',
        });
      }
    } catch (error) {
      set({
        searchResults: [],
        isSearching: false,
        searchError: 'An unexpected error occurred',
      });
    }
  },

  clearSearchResults: () => {
    set({ searchResults: [], searchError: null });
  },

  sendFriendRequest: async (friendId: string) => {
    try {
      const result = await sendFriendRequest(friendId);
      return result;
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  },
}));
