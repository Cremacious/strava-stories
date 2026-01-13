'use client';

import { Calendar, MapPin, Users, Activity } from 'lucide-react';
import SocialPost from '@/components/shared/SocialPost';
import ProfileImage from './ProfileImage';



const userProfile = {
  name: 'Alex Johnson',
  avatar: '/placeholder-avatar.jpg',
  bio: 'Fitness enthusiast and outdoor adventurer. Love running trails, cycling mountains, and sharing my journey with fellow athletes. 🏃‍♂️🚴‍♂️⛰️',
  joinDate: 'March 2024',
  stats: {
    posts: 42,
    friends: 128,
    workouts: 156,
  },
};

const userPosts = [
  {
    id: '1',
    userName: 'Alex Johnson',
    avatar: '/placeholder-avatar.jpg',
    time: '2 hours ago',
    content:
      'Just finished an amazing 10km trail run in the mountains! The views were incredible and the weather was perfect. Feeling energized and ready for more adventures! 🏔️',
    image: '/placeholder-post-1.jpg',
    tags: {
      friends: ['Sarah Chen', 'Mike Rodriguez'],
      cities: ['Rocky Mountains'],
    },
    feeling: 'Motivated',
  },
  {
    id: '2',
    userName: 'Alex Johnson',
    avatar: '/placeholder-avatar.jpg',
    time: '1 day ago',
    content:
      "Cross-training day! Hit the gym for some strength training after yesterday's long bike ride. Balance is key in fitness! 💪",
    tags: {
      friends: [],
      cities: [],
    },
    feeling: 'Strong',
  },
  {
    id: '3',
    userName: 'Alex Johnson',
    avatar: '/placeholder-avatar.jpg',
    time: '3 days ago',
    content:
      'Weekend group ride with the cycling crew! 45km of beautiful coastal roads. Nothing beats good company and great scenery. The coffee stop halfway was the perfect break! ☕🚴‍♂️',
    image: '/placeholder-post-2.jpg',
    tags: {
      friends: ['Emma Davis', 'Tom Wilson', 'Lisa Park'],
      cities: ['Pacific Coast'],
    },
    feeling: 'Happy',
  },
  {
    id: '4',
    userName: 'Alex Johnson',
    avatar: '/placeholder-avatar.jpg',
    time: '1 week ago',
    content:
      'Personal best on my 5km run today! 6 months of consistent training finally paid off. The journey to PR is just as rewarding as the achievement itself. 🏃‍♂️✨',
    tags: {
      friends: ['Sarah Chen'],
      cities: [],
    },
    feeling: 'Accomplished',
  },
  {
    id: '5',
    userName: 'Alex Johnson',
    avatar: '/placeholder-avatar.jpg',
    time: '2 weeks ago',
    content:
      "Rest day wisdom: Sometimes the hardest workout is the one where you show up when you don't feel like it. Today was that day, and I'm glad I pushed through. Recovery is just as important as the grind! 🧘‍♂️",
    tags: {
      friends: [],
      cities: [],
    },
    feeling: 'Reflective',
  },
];

const ProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Profile Header */}
      <div className="border-0 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Profile Image */}
          <ProfileImage  />
          {/* Profile Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {userProfile.name}
            </h1>
            <p className="text-gray-300 mb-4 max-w-2xl">{userProfile.bio}</p>

            {/* Join Date */}
            <div className="flex items-center justify-center sm:justify-start text-gray-400 mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">Joined {userProfile.joinDate}</span>
            </div>

            {/* Stats */}
            <div className="flex justify-center sm:justify-start gap-6">
              <div className="text-center">
                <div className="text-xl font-bold text-white">
                  {userProfile.stats.posts}
                </div>
                <div className="text-sm text-gray-400">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">
                  {userProfile.stats.friends}
                </div>
                <div className="text-sm text-gray-400">Friends</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">
                  {userProfile.stats.workouts}
                </div>
                <div className="text-sm text-gray-400">Workouts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User's Posts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Posts</h2>
        {userPosts.map((post) => (
          <SocialPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
