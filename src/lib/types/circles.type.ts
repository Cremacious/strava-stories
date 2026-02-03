export interface CircleActivity {
  user: string;
  action: string;
  time: string;
}

export interface Circle {
  id: string;
  name: string;
  description: string | null;
  memberCount: number;
  avatar: string;
  category: string;
  lastActivity: string;
  upcomingChallenge?: string;
  achievements: string[];
  recentActivity: CircleActivity[];
}

export interface FeaturedChallenge {
  id: string;
  title: string;
  circle: string;
  participants: number;
  progress: number;
  endDate: string;
  type: string;
}

export interface RecentHighlight {
  id: string;
  circle: string;
  user: string;
  achievement: string;
  type: string;
  time: string;
}

export type CircleWorkout = {
  id: string;
  circleId: string | null;
  title: string;
  type: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  duration: number | null;
  distance: number | null;
  calories: number | null;
  date: Date;
  memberName?: string | null;
  xpEarned?: number | null;
};

export type CircleMember = {
  id: string;
  name: string;
  avatar: string | null;
  role: 'admin' | 'member' | 'pending';
};

export type Circles = Circle[];
export type FeaturedChallenges = FeaturedChallenge[];
export type RecentHighlights = RecentHighlight[];
