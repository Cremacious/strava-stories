import DemoFriendDisplay from './components/DemoFriendDisplay';
import DemoSearchFriends from './components/DemoSearchFriends';
import DemoPendingFriendRequests from './components/DemoPendingFriendRequests';
import { FriendWithDetails } from '@/lib/types/friends.type';

type FriendRequest = {
  id: string;
  friendId: string;
  name?: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  isSentByCurrentUser: boolean;
};

const mockFriends: FriendWithDetails[] = [
  {
    id: 'demo-friend-1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatarUrl: '/default-avatar.png',
    bio: 'Trail runner and coffee enthusiast. Always up for an early morning jog!',
    circles: ['Morning Runners Club', 'Trail Runners United'],
    lastActivity: 'Active 2 hours ago',
    mutualFriends: 3,
    isOnline: true,
  },
  {
    id: 'demo-friend-2',
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    avatarUrl: '/default-avatar.png',
    bio: 'Cyclist and tech enthusiast. Love long rides and coding projects.',
    circles: ['Urban Cyclists', 'Tech Meetups'],
    lastActivity: 'Active yesterday',
    mutualFriends: 5,
    isOnline: false,
  },
  {
    id: 'demo-friend-3',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    avatarUrl: '/default-avatar.png',
    bio: 'Yoga instructor and wellness coach. Finding balance one pose at a time.',
    circles: ['Yoga & Wellness', 'Mindfulness Circle'],
    lastActivity: 'Active 3 days ago',
    mutualFriends: 2,
    isOnline: true,
  },
  {
    id: 'demo-friend-4',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@example.com',
    avatarUrl: '/default-avatar.png',
    bio: 'Swim coach and triathlon competitor. Water is my happy place!',
    circles: ['Swim Squad', 'Triathlon Training'],
    lastActivity: 'Active 1 week ago',
    mutualFriends: 4,
    isOnline: false,
  },
  {
    id: 'demo-friend-5',
    name: 'Lisa Wang',
    email: 'lisa.wang@example.com',
    avatarUrl: '/default-avatar.png',
    bio: 'Marathon runner and nutrition coach. Fueled by passion and vegetables.',
    circles: ['Running Club', 'Nutrition & Fitness'],
    lastActivity: 'Active 5 hours ago',
    mutualFriends: 6,
    isOnline: true,
  },
  {
    id: 'demo-friend-6',
    name: 'David Kim',
    email: 'david.kim@example.com',
    avatarUrl: '/default-avatar.png',
    bio: 'Rock climber and outdoor adventurer. The mountains are calling!',
    circles: ['Climbing Crew', 'Outdoor Adventures'],
    lastActivity: 'Active 1 day ago',
    mutualFriends: 1,
    isOnline: false,
  },
];

const mockFriendRequests: FriendRequest[] = [];

const FriendsDemoPage = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DemoSearchFriends />
          <DemoPendingFriendRequests friendRequests={mockFriendRequests} />
        </div>
        <DemoFriendDisplay friends={mockFriends} />
      </div>
    </div>
  );
};

export default FriendsDemoPage;
