'use client';
import { Post } from '@/lib/types/posts.type';
import SocialPost from './SocialPost';
import { MessageSquare } from 'lucide-react';

const TimelineFeed = ({ posts }: { posts: Post[] }) => {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
          <MessageSquare className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
        <p className="text-gray-400 max-w-md">
          Be the first to share your fitness journey, achievements, or connect
          with fellow athletes in this community.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto w-full cardBackground p-4 rounded-2xl min-h-105 pt-12">
      {posts.map((post) => (
        <SocialPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default TimelineFeed;
