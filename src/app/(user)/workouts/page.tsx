import { Activity, MapPin, Clock, Zap, RefreshCw } from 'lucide-react';
import WorkoutGraph from './components/WorkoutGraph';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddWorkoutButton from './components/AddWorkoutButton';
import RecentWorkouts from './components/RecentWorkouts';
import { getWorkouts } from '@/actions/workout.actions';

const WorkoutsPage = async () => {
  const result = await getWorkouts();

  if (!result.success) {
    return <div>Error loading workouts</div>;
  }

  const { workouts } = result;
  const userWorkouts = workouts || [];
  const displayData = userWorkouts.map(workout => ({
    ...workout,
    date: workout.date.toISOString(),
    duration: workout.duration ?? 0,
    distance: workout.distance ?? 0,
    calories: workout.calories ?? 0,
  }));

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Workouts
          </h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Track your fitness journey and sync with Strava
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />

            <span className="">Sync With Strava</span>
          </Button>
          <AddWorkoutButton />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="backgroundDark border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-400">
              Total Workouts
            </CardTitle>
            <Activity className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{userWorkouts.length}</div>
          </CardContent>
        </Card>
        <Card className="backgroundDark border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-400">
              Total Duration
            </CardTitle>
            <Clock className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{userWorkouts.reduce((total, workout) => total + (workout.duration ?? 0), 0)} min</div>
          </CardContent>
        </Card>
        <Card className="backgroundDark border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-400">
              Total Distance
            </CardTitle>
            <MapPin className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{userWorkouts.reduce((total, workout) => total + (workout.distance ?? 0), 0)} km</div>
          </CardContent>
        </Card>
        <Card className="backgroundDark border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-400">
              Total Calories
            </CardTitle>
            <Zap className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{userWorkouts.reduce((total, workout) => total + (workout.calories ?? 0), 0)}</div>
          </CardContent>
        </Card>
      </div>

      <WorkoutGraph workoutData={displayData} />

      <RecentWorkouts workoutData={displayData} />
    </div>
  );
};

export default WorkoutsPage;
