import { getWorkoutById } from '@/actions/workout.actions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Flame, Mountain, Gauge, Heart } from 'lucide-react';
import { notFound } from 'next/navigation';
import type {
  WorkoutModel,
  StravaWorkoutModel,
} from '@/generated/prisma/models';
import MapPlot from './MapPlot';

const WorkoutPage = async ({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) => {
  const { workoutId } = await params;
  const result = await getWorkoutById(workoutId);

  if (!result.success || !result.workout) {
    notFound();
  }

  const workout = result.workout;
  const isStrava = result.isStrava;

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDistance = (meters: number | null) => {
    if (!meters) return 'N/A';
    const km = meters / 1000;
    return km >= 1 ? `${km.toFixed(2)} km` : `${meters} m`;
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const workoutTitle = isStrava
    ? (workout as StravaWorkoutModel).name
    : (workout as WorkoutModel).title;
  const workoutDate = isStrava
    ? (workout as StravaWorkoutModel).startDateLocal
    : (workout as WorkoutModel).date;
  const workoutType = workout.type;
  const workoutDuration = isStrava
    ? (workout as StravaWorkoutModel).movingTime
    : (workout as WorkoutModel).duration;
  const workoutDistance = workout.distance;
  const workoutCalories = !isStrava ? (workout as WorkoutModel).calories : null;
  const workoutDescription = !isStrava
    ? (workout as WorkoutModel).description
    : null;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          {workoutTitle}
        </h1>
        <div className="flex items-center justify-center gap-2 text-gray-200">
          <span>{formatDate(workoutDate)}</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Badge variant="outline" className="border-red-500 text-red-400">
            {workoutType}
          </Badge>
          {isStrava && (
            <Badge variant="outline" className="border-red-500 text-red-400">
              Strava Workout
            </Badge>
          )}
        </div>
      </div>

      <div className="gap-6">
        <Card className="bg-[#3e3e3e] border-0">
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-gray-300">Duration</span>
              </div>
              <span className="text-white font-semibold">
                {formatDuration(workoutDuration)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="text-gray-300">Distance</span>
              </div>
              <span className="text-white font-semibold">
                {formatDistance(workoutDistance)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-400" />
                <span className="text-gray-300">Calories</span>
              </div>
              <span className="text-white font-semibold">
                {workoutCalories ? `${workoutCalories} kcal` : 'N/A'}
              </span>
            </div>

            {isStrava && (
              <>
                <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg">
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-red-400" />
                    <span className="text-gray-300">Elevation Gain</span>
                  </div>
                  <span className="text-white font-semibold">
                    {(workout as StravaWorkoutModel).totalElevationGain
                      ? `${(workout as StravaWorkoutModel).totalElevationGain} m`
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-red-400" />
                    <span className="text-gray-300">Average Speed</span>
                  </div>
                  <span className="text-white font-semibold">
                    {(workout as StravaWorkoutModel).averageSpeed
                      ? `${(workout as StravaWorkoutModel).averageSpeed.toFixed(2)} m/s`
                      : 'N/A'}
                  </span>
                </div>
                {(workout as StravaWorkoutModel).hasHeartrate && (
                  <>
                    <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-gray-300">
                          Average Heart Rate
                        </span>
                      </div>
                      <span className="text-white font-semibold">
                        {(workout as StravaWorkoutModel).averageHeartrate
                          ? `${(workout as StravaWorkoutModel).averageHeartrate} bpm`
                          : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-gray-300">Max Heart Rate</span>
                      </div>
                      <span className="text-white font-semibold">
                        {(workout as StravaWorkoutModel).maxHeartrate
                          ? `${(workout as StravaWorkoutModel).maxHeartrate} bpm`
                          : 'N/A'}
                      </span>
                    </div>
                  </>
                )}
              </>
            )}
            <p className="text-white leading-relaxed mt-8">
              {workoutDescription || 'No description provided.'}
            </p>
          </CardContent>
        </Card>
      </div>
      {!isStrava && (workout as WorkoutModel).circleId && (
        <div>
          <span className="text-gray-200 text-sm">Circle</span>
          <p className="text-white">Part of a fitness circle</p>
        </div>
      )}

      {/* <Card className="bg-[#202020] border-red-700/30">
        <CardHeader>
          <CardTitle className="text-white">Workout Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
         
        </CardContent>
      </Card> */}
      <MapPlot workout={workout} isStrava={isStrava} />
    </div>
  );
};

export default WorkoutPage;
