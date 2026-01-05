import {
  Activity,
  MapPin,
  Clock,
  Zap,
  RefreshCw,
} from 'lucide-react';
import WorkoutGraph from './components/WorkoutGraph';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddWorkoutButton from './components/AddWorkoutButton';
import RecentWorkouts from './components/RecentWorkouts';

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

const WorkoutsPage = () => {
  const totalWorkouts = workoutData.length;
  const totalDuration = workoutData.reduce(
    (sum, workout) => sum + workout.duration,
    0
  );
  const totalDistance = workoutData.reduce(
    (sum, workout) => sum + workout.distance,
    0
  );
  const totalCalories = workoutData.reduce(
    (sum, workout) => sum + workout.calories,
    0
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="backgroundDark border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-400">
              Total Workouts
            </CardTitle>
            <Activity className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalWorkouts}</div>
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
            <div className="text-2xl font-bold text-white">
              {totalDuration} min
            </div>
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
            <div className="text-2xl font-bold text-white">
              {totalDistance.toFixed(1)} km
            </div>
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
            <div className="text-2xl font-bold text-white">{totalCalories}</div>
          </CardContent>
        </Card>
      </div>

      <WorkoutGraph />

      <RecentWorkouts />
    </div>
  );
};

export default WorkoutsPage;
