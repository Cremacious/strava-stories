'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, Activity } from 'lucide-react';
import { WorkoutDisplayData } from '@/lib/types/workouts.type';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatDate, formatDuration } from '@/lib/utils';

const RecentWorkouts = ({
  workoutData,
}: {
  workoutData: WorkoutDisplayData[];
}) => {
  return (
    <>
      <h2 className="text-xl font-bold text-white">Your Workouts</h2>
      <Card className="darkBackground border-0">
        <CardHeader className="flex flex-row items-center justify-end">
          {workoutData.length > 5 && (
            <Button size='sm' asChild>
              <Link href="/workouts/all">View All</Link>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {workoutData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Activity className="h-16 w-16 text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No Workouts Yet
              </h3>
              <p className="text-gray-400 text-center mb-6 max-w-md">
                Start your fitness journey! Add your first workout to see your
                recent activity here.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="h-4 w-4 text-red-400" />
                  <span>Track your sessions</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Activity className="h-4 w-4 text-red-400" />
                  <span>Monitor progress</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {workoutData.slice(-5).map((workout, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 p-4 bg-[#2e2e2e] rounded-lg gap-3"
                >
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="flex items-center space-x-4 flex-1"
                  >
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shrink-0">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate">
                        {workout.type}
                      </p>
                      <p className="text-sm text-gray-100">
                        {formatDate(workout.date)}
                      </p>
                    </div>
                  </Link>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="text-white text-sm">
                      {formatDuration(workout.duration)}
                    </div>
                    {workout.distance > 0 && (
                      <div className="text-sm text-gray-100">
                        {workout.distance} km
                      </div>
                    )}
                    <Button asChild size="sm">
                      <Link href={`/workouts/${workout.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>{' '}
    </>
  );
};
export default RecentWorkouts;
