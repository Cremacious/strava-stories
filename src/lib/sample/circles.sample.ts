import {
  Circles,
  FeaturedChallenges,
  RecentHighlights,
} from '../types/circles.type';

export const myCirclesSample: Circles = [
  {
    id: '1',
    name: 'Mountain Runners',
    description: 'Trail running enthusiasts conquering peaks together',
    memberCount: 24,
    avatar: '/placeholder-circle-1.jpg',
    category: 'Running',
    lastActivity: '2 hours ago',
    upcomingChallenge: 'Summit Series Challenge',
    achievements: ['100km Club', 'Trail Master'],
    recentActivity: [
      {
        user: 'Sarah Chen',
        action: 'completed 15km trail run',
        time: '2h ago',
      },
      {
        user: 'Mike Rodriguez',
        action: 'shared workout routine',
        time: '4h ago',
      },
      { user: 'Emma Davis', action: 'joined challenge', time: '6h ago' },
    ],
  },
  {
    id: '2',
    name: 'Urban Cyclists',
    description: 'City cycling crew exploring urban landscapes',
    memberCount: 18,
    avatar: '/placeholder-circle-2.jpg',
    category: 'Cycling',
    lastActivity: '1 day ago',
    upcomingChallenge: 'City Loop Challenge',
    achievements: ['Pedal Power', 'Urban Explorer'],
    recentActivity: [
      { user: 'Tom Wilson', action: 'logged 45km ride', time: '1d ago' },
      { user: 'Lisa Park', action: 'created group ride', time: '2d ago' },
    ],
  },
  {
    id: '3',
    name: 'Strength Collective',
    description: 'Building strength and community in the gym',
    memberCount: 31,
    avatar: '/placeholder-circle-3.jpg',
    category: 'Strength Training',
    lastActivity: '30 min ago',
    upcomingChallenge: '30-Day Plank Challenge',
    achievements: ['Iron Will', 'Strength Master'],
    recentActivity: [
      {
        user: 'Alex Johnson',
        action: 'hit new PR on deadlift',
        time: '30m ago',
      },
      {
        user: 'Jordan Lee',
        action: 'shared transformation photo',
        time: '2h ago',
      },
      {
        user: 'Casey Morgan',
        action: 'completed challenge milestone',
        time: '3h ago',
      },
    ],
  },
];

export const featuredChallengesSample: FeaturedChallenges = [
  {
    id: '1',
    title: '30-Day Plank Challenge',
    circle: 'Strength Collective',
    participants: 28,
    progress: 65,
    endDate: 'Dec 25, 2025',
    type: 'Individual',
  },
  {
    id: '2',
    title: 'Summit Series Challenge',
    circle: 'Mountain Runners',
    participants: 16,
    progress: 40,
    endDate: 'Jan 15, 2026',
    type: 'Team vs Team',
  },
];

export const recentHighlightsSample: RecentHighlights = [
  {
    id: '1',
    circle: 'Mountain Runners',
    user: 'Sarah Chen',
    achievement: 'Completed 100km milestone',
    type: 'Personal Record',
    time: '2 hours ago',
  },
  {
    id: '2',
    circle: 'Strength Collective',
    user: 'Alex Johnson',
    achievement: 'New deadlift PR: 225lbs',
    type: 'Strength Achievement',
    time: '30 minutes ago',
  },
  {
    id: '3',
    circle: 'Urban Cyclists',
    user: 'Tom Wilson',
    achievement: 'Led group ride with 12 participants',
    type: 'Community Event',
    time: '1 day ago',
  },
];
