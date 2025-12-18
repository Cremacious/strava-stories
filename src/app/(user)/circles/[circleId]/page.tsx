import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { circleDetailSample } from '@/lib/sample/circle-detail.sample';
import FeatureSelector from './components/FeatureSelector';
import TopMembers from './components/TopMembers';
import CircleStats from './components/CircleStats';
import CircleTimelineFeed from './components/CircleTimelineFeed';

const CirclePage = () => {
  const circle = circleDetailSample;
  return (
    <div className="bg-gray-900 text-white min-h-full p-4">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-lg p-6 mb-6 text-white">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
            <Users className="w-12 h-12 text-red-400" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              {circle.name}
            </h1>
            <p className="text-red-100 mb-3">{circle.description}</p>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              <div>
                <p className="text-sm text-red-100">Members</p>
                <p className="text-xl font-bold">{circle.memberCount}</p>
              </div>
              <div>
                <p className="text-sm text-red-100">Total Workouts</p>
                <p className="text-xl font-bold">
                  {circle.stats.totalWorkouts}
                </p>
              </div>
              <div>
                <p className="text-sm text-red-100">Category</p>
                <p className="text-xl font-bold">{circle.category}</p>
              </div>
            </div>
          </div>
          <Button className="bg-white text-red-600 hover:bg-gray-100 font-semibold w-full sm:w-auto">
            Join Circle
          </Button>
        </div>
      </div>

      <CircleStats circle={circle} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <FeatureSelector />

          <TopMembers circle={circle} />
        </div>
        <CircleTimelineFeed />
      </div>
    </div>
  );
};

export default CirclePage;
