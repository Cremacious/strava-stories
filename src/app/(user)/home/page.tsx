import StatusUpdateInput from '../../../components/shared/StatusUpdateInput';
import TimelineFeed from '../../../components/shared/TimelineFeed';
import { getUserPosts } from '@/actions/post.actions';
import { Post } from '@/lib/types/posts.type';

const UserHomePage = async () => {
  const postsResult = await getUserPosts();
  const transformedPosts: Post[] = postsResult.success ? (postsResult.posts || []) : [];

  return (
    <div className=" min-h-full p-4">
      <div className="flex max-w-5xl mx-auto justify-center items-center rounded-lg p-4 bg-[#272727] border-b-2 border-red-900/40 mb-8">
        <StatusUpdateInput location="user" />
      </div>
      <TimelineFeed posts={transformedPosts} />
    </div>
  );
};

export default UserHomePage;