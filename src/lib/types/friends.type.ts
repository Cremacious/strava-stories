
export interface Friend {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
}


export interface FriendWithDetails extends Friend {
  bio?: string;
  circles?: string[];
  lastActivity?: string;
  mutualFriends?: number;
  isOnline?: boolean;
}


export type Friends = Friend[];

// Filter and sort options
export type FriendSortOption = 'name' | 'activity' | 'circles';
export type FriendFilterOption = 'all' | 'online' | 'circle';