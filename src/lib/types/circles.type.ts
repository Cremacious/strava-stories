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
  userId: string;
  memberName: string;
  title: string;
  description?: string;
  type: string;
  duration?: number;
  distance?: number;
  calories?: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  xpEarned: number;
};

export type Circles = Circle[];
export type FeaturedChallenges = FeaturedChallenge[];
export type RecentHighlights = RecentHighlight[];
