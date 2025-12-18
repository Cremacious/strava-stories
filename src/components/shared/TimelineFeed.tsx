'use client';

import SocialPost from '@/components/shared/SocialPost';
import { samplePosts } from '@/lib/sample/posts.sample';


const TimelineFeed = () => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {samplePosts.map((post) => (
        <SocialPost key={post.id} post={post} />
      ))}
    </div>
  );
};
export default TimelineFeed;
