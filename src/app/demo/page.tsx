import StatusUpdateInput from '../../components/shared/StatusUpdateInput';
import TimelineFeed from '../../components/shared/TimelineFeed';
import { Post } from '@/lib/types/posts.type';

// Mock demo data
const mockPosts: Post[] = [
  {
    id: 'demo-post-1',
    userName: 'DemoUser',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    time: '2 hours ago',
    content:
      'Just finished an amazing 10k run through Golden Gate Park! The weather was perfect and I felt incredible. Sometimes you just need to get out there and move. 🏃‍♂️ #running #fitness #goldengate',
    tags: { friends: [], cities: ['San Francisco'] },
    feeling: 'excited',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
  },
  {
    id: 'demo-post-2',
    userName: 'YogaEnthusiast',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    time: '4 hours ago',
    content:
      'Morning yoga session done! Starting the day with some mindfulness and stretching. The sunrise over the bay was absolutely breathtaking. Who else is embracing that early morning routine? 🌅🧘‍♀️ #yoga #mindfulness #morningroutine',
    tags: { friends: [], cities: ['San Francisco'] },
    feeling: 'happy',
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
  },
  {
    id: 'demo-post-3',
    userName: 'BikeAdventurer',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    time: '6 hours ago',
    content:
      'Bike ride through Marin County was epic! 45 miles of rolling hills and stunning views. Legs are tired but the soul is happy. Nothing beats that feeling of freedom on two wheels. 🚴‍♂️ #cycling #marincounty #adventure',
    tags: { friends: [], cities: ['Marin County'] },
    feeling: 'motivated',
    image:
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop',
  },
];

const mockFriends = [
  {
    id: 'demo-user-456',
    name: 'YogaEnthusiast',
    email: 'yoga@example.com',
    avatarUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: 'Yoga instructor and wellness enthusiast',
    isOnline: true,
  },
  {
    id: 'demo-user-789',
    name: 'BikeAdventurer',
    email: 'bike@example.com',
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Cycling through life one pedal at a time',
    isOnline: false,
  },
];

const DemoHomePage = () => {
  const mockUser = {
    id: 'demo-user-123',
    username: 'DemoUser',
    email: 'demo@stravastories.com',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  };

  return (
    <div className=" min-h-full p-4">
      <div className="flex max-w-5xl mx-auto justify-center items-center rounded-lg bg-[#272727] border-b-2 border-red-900/40 pb-4">
        <StatusUpdateInput
          friends={mockFriends}
          userImage={mockUser.avatarUrl}
          location="user"
          isDemo={true}
        />
      </div>
      <TimelineFeed posts={mockPosts} />
    </div>
  );
};

export default DemoHomePage;
