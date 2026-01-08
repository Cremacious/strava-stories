import { getWorkoutById } from '@/actions/workout.actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Flame, User, Circle } from 'lucide-react';
import Link from 'next/link';

const CircleWorkoutPage = async ({
  params,
}: {
  params: Promise<{ workoutId: string; circleId: string }>;
}) => {
  const { workoutId, circleId } = await params;

  const workoutResult = await getWorkoutById(workoutId);
  const workout = workoutResult.success ? workoutResult.workout : null;

  if (!workout) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Workout Not Found</h1>
          <p>
            The workout you are looking for does not exist or is unavailable.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDistance = (meters: number | null) => {
    if (!meters) return 'N/A';
    const km = (meters / 1000).toFixed(2);
    return `${km} km`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/circles/${circleId}/workouts`}
            className="text-red-400 hover:text-red-300"
          >
            ← Back to Workouts
          </Link>
        </div>

        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              {workout.title}
            </CardTitle>
            <Badge variant="secondary" className="bg-red-600 text-white w-fit">
              {workout.type}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            {workout.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  Description
                </h3>
                <p className="text-gray-400">{workout.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white font-medium">
                    {formatDate(workout.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p className="text-white font-medium">
                    {formatDuration(workout.duration)}
                  </p>
                </div>
              </div>

              {workout.distance && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Distance</p>
                    <p className="text-white font-medium">
                      {formatDistance(workout.distance)}
                    </p>
                  </div>
                </div>
              )}

              {workout.calories && (
                <div className="flex items-center space-x-3">
                  <Flame className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Calories</p>
                    <p className="text-white font-medium">
                      {workout.calories} kcal
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-gray-400 text-sm">User ID</p>
                  <p className="text-white font-medium">{workout.userId}</p>
                </div>
              </div>

              {workout.circleId && (
                <div className="flex items-center space-x-3">
                  <Circle className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Circle ID</p>
                    <p className="text-white font-medium">{workout.circleId}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Metadata
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Created At</p>
                  <p className="text-white">{formatDate(workout.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Updated At</p>
                  <p className="text-white">{formatDate(workout.updatedAt)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Workout ID</p>
                  <p className="text-white">{workout.id}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CircleWorkoutPage;
