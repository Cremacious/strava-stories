'use client';
import { Post } from '@/lib/types/posts.type';
import SocialPost from './SocialPost';

const TimelineFeed = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto w-full">
      {posts.map((post) => (
        <SocialPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default TimelineFeed;
