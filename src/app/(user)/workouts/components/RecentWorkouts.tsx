'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Activity } from 'lucide-react';

const workoutData = [
  {
    date: '2024-12-01',
    duration: 45,
    distance: 8.5,
    calories: 320,
    type: 'Running',
  },
  {
    date: '2024-12-02',
    duration: 60,
    distance: 0,
    calories: 280,
    type: 'Cycling',
  },
  {
    date: '2024-12-03',
    duration: 30,
    distance: 0,
    calories: 180,
    type: 'Strength Training',
  },
  {
    date: '2024-12-04',
    duration: 50,
    distance: 10.2,
    calories: 380,
    type: 'Running',
  },
  {
    date: '2024-12-05',
    duration: 45,
    distance: 0,
    calories: 250,
    type: 'Yoga',
  },
  {
    date: '2024-12-06',
    duration: 75,
    distance: 15.8,
    calories: 450,
    type: 'Cycling',
  },
  {
    date: '2024-12-07',
    duration: 40,
    distance: 6.2,
    calories: 290,
    type: 'Running',
  },
];

const RecentWorkouts = () => {
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
            .reverse()
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
