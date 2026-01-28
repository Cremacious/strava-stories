import StatusUpdateInput from '../../../components/shared/StatusUpdateInput';
import TimelineFeed from '../../../components/shared/TimelineFeed';
import { getUserPosts } from '@/actions/post.actions';
import { Post } from '@/lib/types/posts.type';
import { getUserProfile } from '@/actions/user.actions';
import { getAllUserFriends } from '@/actions/friend.actions';

const UserHomePage = async () => {
  const postsResult = await getUserPosts();
  const transformedPosts: Post[] = postsResult.success
    ? postsResult.posts || []
    : [];
  const { user } = await getUserProfile();
  const friendsResult = await getAllUserFriends();
  const friends = friendsResult.success ? friendsResult.friends || [] : [];

  return (
    <div className=" min-h-full p-4">
      <div className="flex max-w-5xl mx-auto justify-center items-center rounded-lg bg-[#272727] border-b-2 border-red-900/40 pb-4">
        <StatusUpdateInput friends={friends} userImage={user?.avatarUrl} location="user" />
      </div>
      <TimelineFeed posts={transformedPosts} />
    </div>
  );
};

export default UserHomePage;
