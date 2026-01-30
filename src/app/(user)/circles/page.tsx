import { Button } from '@/components/ui/button';
import TimelineFeed from '@/components/shared/TimelineFeed';
import ActiveCirclesGrid from './components/ActiveCirclesGrid';
import ChallengesHighlights from './components/ChallengesHighlights';
import RecentCirclesHighlights from './components/RecentCirclesHighlights';
import Link from 'next/link';
import {
  getCirclesForUser,
  getRecentCirclesHighlights,
} from '@/actions/circle.actions';
import { getCurrentUserCirclePosts } from '@/actions/post.actions';
import { Post } from '@/lib/types/posts.type';
import { Users } from 'lucide-react';
import { getAllActiveChallenges } from '@/actions/challenge.actions';

const CirclesPage = async () => {
  const result = await getCirclesForUser();
  const myCircles = result.success ? result.circles : [];

  const circlePostsResult = await getCurrentUserCirclePosts();
  const circlePosts: Post[] = circlePostsResult.success
    ? circlePostsResult.posts || []
    : [];

  const activeChallengesResult = await getAllActiveChallenges();
  const activeChallenges = activeChallengesResult.success
    ? activeChallengesResult.challenges || []
    : [];

  const recentHighlightsResult = await getRecentCirclesHighlights();
  const recentHighlights = recentHighlightsResult.success
    ? recentHighlightsResult.highlights || []
    : [];

  return (
    <div className="p-4 sm:p-6 space-y-6 w-full">
      <div className="space-y-4 max-w-5xl mx-auto p-4 rounded-lg">
        <div className="flex justify-end items-center">
       
          {myCircles.length > 4 && (
            <Button
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
            >
              View All
            </Button>
          )}
        </div>
        {myCircles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 bg-red-500/80 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-gray-200" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No Circles Yet
            </h3>
            <p className="text-gray-400 text-center mb-4 max-w-md">
              Join or create a circle to connect with fitness communities and
              track progress together
            </p>
            <Button asChild>
              <Link href="/circles/create">Create Your First Circle</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-end">
              <Button asChild>
                <Link href="/circles/create">Create Circle</Link>
              </Button>
            </div>
            <ActiveCirclesGrid myCircles={myCircles} />
          </>
        )}
      </div>
      {/* <div className="border-t-2 border-red-900/40 max-w-3xl mx-auto"></div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start border-t-2 border-red-900/40 pt-6 max-w-5xl mx-auto">
        <ChallengesHighlights featuredChallenges={activeChallenges} />

        <RecentCirclesHighlights recentHighlights={recentHighlights} />

        {/* <TimelineFeed /> */}
      </div>
      <TimelineFeed posts={circlePosts} />
    </div>
  );
};

export default CirclesPage;
