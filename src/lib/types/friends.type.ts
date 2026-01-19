export interface Friend {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
}

export interface FriendWithDetails extends Friend {
  bio?: string | null;
  circles?: string[];
  lastActivity?: string;
  mutualFriends?: number;
  isOnline?: boolean;
}

export type FriendRequest = {
  id: string;
  name?: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  isSentByCurrentUser: boolean;
};

export type Friends = Friend[];

export type FriendSortOption = 'name' | 'activity' | 'circles';
export type FriendFilterOption = 'all' | 'online' | 'circle';
