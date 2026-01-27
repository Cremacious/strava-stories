'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Activity, Plus } from 'lucide-react';
import { WorkoutDisplayData } from '@/lib/types/workouts.type';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const RecentWorkouts = ({
  workoutData,
}: {
  workoutData: WorkoutDisplayData[];
}) => {
  return (
    <Card className="darkBackground border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-red-400" />
          Recent Workouts
        </CardTitle>

        {workoutData.length > 0 && (
          <Button asChild>
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
              <Link key={index} href={`/workouts/${workout.id}`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 p-4 darkBackground3 hover:bg-red-800 rounded-lg gap-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shrink-0">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate">
                        {workout.type}
                      </p>
                      <p className="text-sm text-gray-100">{workout.date}</p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col sm:items-end gap-2 sm:gap-0">
                    <p className="text-white font-medium">
                      {workout.duration} min
                    </p>
                    <p className="text-sm text-gray-100">
                      {workout.distance > 0 ? `${workout.distance} km • ` : ''}
                      {workout.calories} cal
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default RecentWorkouts;
