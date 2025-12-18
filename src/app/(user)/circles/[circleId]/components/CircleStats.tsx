'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDetail } from '@/lib/types/circle-detail.type';

const CircleStats = ({ circle }: { circle: CircleDetail }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-gray-400">
            Active Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-white">
            {circle.stats.activeMembers}
          </p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-gray-400">
            Total Workouts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-400">
            {circle.stats.totalWorkouts}
          </p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-gray-400">Avg XP/Member</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-white">
            {circle.stats.averageXpPerMember.toLocaleString()}
          </p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-gray-400">Past Winners</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-white">
            {circle.pastWinners.length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
export default CircleStats;
