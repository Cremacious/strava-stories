'use client';
import { useEffect, useState } from 'react';
import StatusUpdateInput from '@/components/shared/StatusUpdateInput';
import TimelineFeed from '@/components/shared/TimelineFeed';
import { Post } from '@/lib/types/posts.type';
import { getCirclePosts } from '@/actions/post.actions';
import { getAllUserFriends } from '@/actions/friend.actions';
import { FriendWithDetails } from '@/lib/types/friends.type';

const CircleTimelineFeed = ({
  userImage,
  circleId,
  initialPosts,
}: {
  userImage: string | undefined;
  circleId: string;
  initialPosts: Post[];
}) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [friends, setFriends] = useState<FriendWithDetails[]>([]);

  const fetchPosts = async () => {
    const result = await getCirclePosts(circleId);
    if (result.success) {
      setPosts(result.posts || []);
    }
  };

  const fetchFriends = async () => {
    const friendsResult = await getAllUserFriends();
    if (friendsResult.success) {
      setFriends(friendsResult.friends || []);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchFriends();
  }, [circleId]);

  return (
    <div className="">
      <div className="">
        <h2 className="text-2xl font-bold mb-4">Circle Feed</h2>
      </div>
      <div className="space-y-4">
        <StatusUpdateInput
          userImage={userImage}
          id={circleId}
          location="circle"
          friends={friends}
          onPostCreated={fetchPosts}
        />
        <TimelineFeed posts={posts} />
      </div>
    </div>
  );
};
export default CircleTimelineFeed;
