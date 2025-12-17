// Friend represents a user's friend connection
export interface Friend {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  circles: string[];
  lastActivity: string;
  mutualFriends: number;
  isOnline: boolean;
}

// Array type for friends collection
export type Friends = Friend[];

// Filter and sort options
export type FriendSortOption = 'name' | 'activity' | 'circles';
export type FriendFilterOption = 'all' | 'online' | 'circle';
