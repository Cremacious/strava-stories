import TimelineFeed from '@/components/shared/TimelineFeed';
import ActiveCirclesGrid from '../../(user)/circles/components/ActiveCirclesGrid';
import ChallengesHighlights from '../../(user)/circles/components/ChallengesHighlights';
import RecentCirclesHighlights from '../../(user)/circles/components/RecentCirclesHighlights';
import { Post } from '@/lib/types/posts.type';

const mockCircles = [
  {
    id: 'demo-circle-1',
    name: 'Morning Runners Club',
    description: 'Early morning running group for all levels',
    category: 'Fitness',
    memberCount: 24,
    avatar: '/default-circle-avatar.png',
    lastActivity: 'Recently active',
    upcomingChallenge: undefined,
    achievements: ['5K Challenge Completed', 'Community Goal Reached'],
    recentActivity: [
      { user: 'Sarah M.', action: 'completed a workout', time: '2 hours ago' },
      { user: 'Mike R.', action: 'joined the circle', time: '5 hours ago' },
    ],
  },
  {
    id: 'demo-circle-2',
    name: 'Yoga & Wellness',
    description: 'Mindful yoga sessions and wellness discussions',
    category: 'Wellness',
    memberCount: 18,
    avatar: '/default-circle-avatar.png',
    lastActivity: 'Recently active',
    upcomingChallenge: undefined,
    achievements: ['Meditation Streak', 'Group Session Record'],
    recentActivity: [
      { user: 'Emma L.', action: 'shared a post', time: '1 hour ago' },
      { user: 'David K.', action: 'completed a routine', time: '3 hours ago' },
    ],
  },
  {
    id: 'demo-circle-3',
    name: 'Cycling Adventures',
    description: 'Long distance cycling and bike maintenance tips',
    category: 'Cycling',
    memberCount: 31,
    avatar: '/default-circle-avatar.png',
    lastActivity: 'Recently active',
    upcomingChallenge: undefined,
    achievements: ['Century Ride Completed', 'Group Tour Success'],
    recentActivity: [
      { user: 'Alex T.', action: 'logged a workout', time: '30 minutes ago' },
      { user: 'Lisa P.', action: 'created a challenge', time: '4 hours ago' },
    ],
  },
];

const mockActiveChallenges = [
  {
    id: 'demo-challenge-1',
    title: 'February Running Challenge',
    circle: 'Morning Runners Club',
    participants: 12,
    progress: 75,
    endDate: '2026-02-28',
    type: 'Running',
  },
  {
    id: 'demo-challenge-2',
    title: 'Weekly Yoga Sessions',
    circle: 'Yoga & Wellness',
    participants: 8,
    progress: 60,
    endDate: '2026-02-25',
    type: 'Wellness',
  },
  {
    id: 'demo-challenge-3',
    title: 'Distance Cycling Goal',
    circle: 'Cycling Adventures',
    participants: 15,
    progress: 45,
    endDate: '2026-03-15',
    type: 'Cycling',
  },
];

const mockRecentHighlights = [
  {
    id: 'demo-highlight-1',
    circle: 'Morning Runners Club',
    user: 'Sarah M.',
    achievement: 'Created event: Weekend Group Run',
    type: 'event',
    time: '2 hours ago',
  },
  {
    id: 'demo-highlight-2',
    circle: 'Yoga & Wellness',
    user: 'Emma L.',
    achievement: 'Created poll: Favorite meditation apps?',
    type: 'poll',
    time: '3 hours ago',
  },
  {
    id: 'demo-highlight-3',
    circle: 'Cycling Adventures',
    user: 'Alex T.',
    achievement: 'Created challenge: Hill Climbing Practice',
    type: 'challenge',
    time: '5 hours ago',
  },
  {
    id: 'demo-highlight-4',
    circle: 'Morning Runners Club',
    user: 'Mike R.',
    achievement: 'Created event: Speed Training Session',
    type: 'event',
    time: '1 day ago',
  },
];

const mockCirclePosts: Post[] = [
  {
    id: 'demo-post-1',
    userName: 'Sarah M.',
    avatar: '/default-avatar.png',
    time: '2026-02-03T14:30:00.000Z',
    content:
      'Great morning run today! The weather was perfect for our group session. Anyone up for an evening jog?',
    image: undefined,
    tags: { friends: [], cities: ['Downtown'] },
    feeling: 'excited',
  },
  {
    id: 'demo-post-2',
    userName: 'Emma L.',
    avatar: '/default-avatar.png',
    time: '2026-02-03T12:15:00.000Z',
    content:
      'Just finished an amazing yoga flow. Feeling so centered and energized! 🧘‍♀️',
    image: '/demo-yoga.jpg',
    tags: { friends: [], cities: [] },
    feeling: 'motivated',
  },
  {
    id: 'demo-post-3',
    userName: 'Alex T.',
    avatar: '/default-avatar.png',
    time: '2026-02-03T10:45:00.000Z',
    content:
      'Epic cycling route today - 45km with some challenging hills. The views were incredible!',
    image: '/demo-cycling.jpg',
    tags: { friends: ['Mike R.'], cities: ['Mountain Trail'] },
    feeling: 'accomplished',
  },
];

const DemoCirclesPage = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 w-full">
      <div className="space-y-4 max-w-5xl mx-auto p-4 rounded-lg">
        <ActiveCirclesGrid myCircles={mockCircles} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start border-t-2 border-red-900/40 pt-6 max-w-5xl mx-auto">
        <ChallengesHighlights featuredChallenges={mockActiveChallenges} />
        <RecentCirclesHighlights recentHighlights={mockRecentHighlights} />
      </div>
      <TimelineFeed posts={mockCirclePosts} />
    </div>
  );
};

export default DemoCirclesPage;
