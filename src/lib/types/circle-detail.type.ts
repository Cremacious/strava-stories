// Circle Detail Types
export interface CircleMember {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  role: 'admin' | 'member';
}

export interface WorkoutLog {
  id: string;
  memberId: string;
  memberName: string;
  memberAvatar: string;
  type: string;
  duration: number;
  distance?: number;
  calories?: number;
  sets?: number;
  reps?: number;
  weight?: number;
  description: string;
  image?: string;
  timestamp: string;
  xpEarned: number;
}

export interface Routine {
  id: string;
  name: string;
  createdBy: string;
  description: string;
  exercises: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  downloads: number;
  likes: number;
}

export interface AdventureStory {
  id: string;
  title: string;
  memberId: string;
  memberName: string;
  memberAvatar: string;
  description: string;
  image: string;
  location: string;
  distance?: number;
  timestamp: string;
  likes: number;
  comments: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  participants: number;
  winners?: string[];
  isActive: boolean;
  xpReward: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'group_run' | 'gym_meetup' | 'yoga_session' | 'other';
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees?: number;
  organizer: string;
}

export interface Poll {
  id: string;
  question: string;
  options: {
    text: string;
    votes: number;
  }[];
  createdBy: string;
  createdAt: string;
  endsAt: string;
  totalVotes: number;
}

export interface CircleDetail {
  id: string;
  name: string;
  description: string;
  category: string;
  avatar: string;
  memberCount: number;
  createdDate: string;
  members: CircleMember[];
  recentWorkouts: WorkoutLog[];
  routines: Routine[];
  stories: AdventureStory[];
  challenges: Challenge[];
  pastWinners: string[];
  upcomingEvents: Event[];
  recentPolls: Poll[];
  stats: {
    totalWorkouts: number;
    totalMembers: number;
    activeMembers: number;
    averageXpPerMember: number;
  };
}
