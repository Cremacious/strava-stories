import { Button } from '@/components/ui/button';
import {
  myCirclesSample,
  featuredChallengesSample,
  recentHighlightsSample,
} from '@/lib/sample/circles.sample';
import TimelineFeed from '@/components/shared/TimelineFeed';
import ActiveCirclesGrid from './components/ActiveCirclesGrid';
import ChallengesHighlights from './components/ChallengesHighlights';
import RecentCirclesHighlights from './components/RecentCirclesHighlights';

const CirclesPage = () => {
  const myCircles = myCirclesSample;
  const featuredChallenges = featuredChallengesSample;
  const recentHighlights = recentHighlightsSample;

  return (
    <div className="p-4 sm:p-6 space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Circles
            </h1>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">
              Connect with fitness communities and track progress together
            </p>
          </div>
        </div>
        <Button className="w-full md:w-auto bg-red-500 hover:bg-red-600">
          Create Circle
        </Button>
      </div>

      {/* My Circles */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">My Circles</h2>
          <Button
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
          >
            View All
          </Button>
        </div>
        <ActiveCirclesGrid myCircles={myCircles} />
      </div>

      {/* Featured Challenges */}
      <ChallengesHighlights featuredChallenges={featuredChallenges} />

      {/* Recent Highlights */}
      <RecentCirclesHighlights recentHighlights={recentHighlights} />

      <TimelineFeed />
    </div>
  );
};

export default CirclesPage;
