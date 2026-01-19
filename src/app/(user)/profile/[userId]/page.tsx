import { Calendar } from 'lucide-react';
import SocialPost from '@/components/shared/SocialPost';
import ProfileImage from '../ProfileImage';
import { getUserProfileById } from '@/actions/user.actions';
import { getPostsByUserId } from '@/actions/post.actions';
import TimelineFeed from '@/components/shared/TimelineFeed';

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const { user, success } = await getUserProfileById(userId);
  if (!success || !user) {
    return <div>User not found</div>;
  }
  const postsResult = await getPostsByUserId(userId);

  const userPosts = (postsResult.success && postsResult.posts) || [];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="border-0 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <ProfileImage avatarUrl={user?.avatarUrl} />

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {user.username}
            </h1>
            <p className="text-gray-300 mb-4 max-w-2xl">{user.bio}</p>

            <div className="flex items-center justify-center sm:justify-start text-gray-400 mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-center sm:justify-start gap-6">
              <div className="text-center">
                <div className="text-xl font-bold text-white">
                  {/* {user.stats.posts} */}
                </div>
                <div className="text-sm text-gray-400">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">
                  {/* {userProfile.stats.friends} */}
                </div>
                <div className="text-sm text-gray-400">Friends</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">
                  {/* {userProfile.stats.workouts} */}
                </div>
                <div className="text-sm text-gray-400">Workouts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TimelineFeed posts={userPosts} />
    </div>
  );
};

export default ProfilePage;
