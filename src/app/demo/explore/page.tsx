import TimelineFeed from '@/components/shared/TimelineFeed';
import DemoRecommendedCircles from './components/DemoRecommendedCircles';
import { MapPin } from 'lucide-react';
import type { RecommendedCircle } from '@/actions/circle.actions';
import { Post } from '@/lib/types/posts.type';


const mockRecommendedCircles: RecommendedCircle[] = [
  {
    id: 'demo-circle-1',
    name: 'Trail Runners United',
    description:
      'A community for trail running enthusiasts sharing routes and tips',
    visibility: 'PUBLIC',
    memberCount: 156,
    friendsInCircle: [
      {
        id: 'friend-1',
        name: 'Sarah Johnson',
        avatarUrl: '/default-avatar.png',
      },
      {
        id: 'friend-2',
        name: 'Mike Chen',
        avatarUrl: '/default-avatar.png',
      },
    ],
    recommendationReason: 'Sarah Johnson and Mike Chen are members',
  },
  {
    id: 'demo-circle-2',
    name: 'Urban Cyclists',
    description:
      'City cycling group focused on bike commuting and urban exploration',
    visibility: 'PUBLIC',
    memberCount: 89,
    friendsInCircle: [
      {
        id: 'friend-3',
        name: 'Emma Davis',
        avatarUrl: '/default-avatar.png',
      },
    ],
    recommendationReason: 'Emma Davis is a member',
  },
  {
    id: 'demo-circle-3',
    name: 'Swim Squad',
    description: 'Competitive and recreational swimming community',
    visibility: 'PUBLIC',
    memberCount: 67,
    friendsInCircle: [
      {
        id: 'friend-4',
        name: 'Alex Rodriguez',
        avatarUrl: '/default-avatar.png',
      },
      {
        id: 'friend-5',
        name: 'Lisa Wang',
        avatarUrl: '/default-avatar.png',
      },
      {
        id: 'friend-6',
        name: 'Tom Brown',
        avatarUrl: '/default-avatar.png',
      },
    ],
    recommendationReason:
      'Alex Rodriguez, Lisa Wang and 1 more friend are members',
  },
];


const mockAreaPosts: Post[] = [
  {
    id: 'demo-post-1',
    userName: 'Local Runner',
    avatar: '/default-avatar.png',
    time: '2026-02-03T16:45:00.000Z',
    content:
      "Beautiful sunset run along the river trail today! The path was perfect and the weather couldn't have been better. Anyone else catch the golden hour?",
    image: '/demo-sunset-run.jpg',
    tags: { friends: [], cities: ['Riverside Trail'] },
    feeling: 'motivated',
  },
  {
    id: 'demo-post-2',
    userName: 'City Cyclist',
    avatar: '/default-avatar.png',
    time: '2026-02-03T14:20:00.000Z',
    content:
      'Just discovered this amazing bike path through downtown. Perfect for commuting and it avoids all the traffic! 🏙️🚴‍♂️',
    image: undefined,
    tags: { friends: [], cities: ['Downtown Bike Path'] },
    feeling: 'excited',
  },
  {
    id: 'demo-post-3',
    userName: 'Swim Enthusiast',
    avatar: '/default-avatar.png',
    time: '2026-02-03T11:30:00.000Z',
    content:
      'Morning swim session at the community pool. The water was perfect temperature and I finally nailed that flip turn! 🏊‍♀️',
    image: '/demo-pool.jpg',
    tags: { friends: [], cities: ['Community Pool'] },
    feeling: 'accomplished',
  },
  {
    id: 'demo-post-4',
    userName: 'Trail Hiker',
    avatar: '/default-avatar.png',
    time: '2026-02-02T18:15:00.000Z',
    content:
      "Weekend hike up Mount Vista was incredible! The views from the summit are breathtaking. Don't forget your layers - it gets chilly up there.",
    image: '/demo-mountain.jpg',
    tags: { friends: [], cities: ['Mount Vista'] },
    feeling: 'happy',
  },
];

const ExploreDemoPage = () => {
  return (
    <div className="min-h-full p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Explore
            </h1>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">
              Discover new circles and connect with athletes in your area
            </p>
          </div>
        </div>

        <DemoRecommendedCircles recommendedCircles={mockRecommendedCircles} />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-red-400" />
            <h2 className="text-xl font-semibold text-white">
              Posts from Your Area
            </h2>
          </div>
          <TimelineFeed posts={mockAreaPosts} />
        </div>
      </div>
    </div>
  );
};

export default ExploreDemoPage;
