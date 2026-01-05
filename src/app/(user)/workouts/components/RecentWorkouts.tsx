'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Activity } from 'lucide-react';
import { WorkoutDisplayData } from '@/lib/types/workouts.type';

const RecentWorkouts = ({
  workoutData,
}: {
  workoutData: WorkoutDisplayData[];
}) => {
  return (
    <Card className="darkBackground border-0">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-red-400" />
          Recent Workouts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workoutData
            .slice(-5)
            .map((workout, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 darkBackground3 rounded-lg gap-3"
              >
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
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default RecentWorkouts;
