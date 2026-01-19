import { getWorkoutById } from '@/actions/workout.actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Flame, Activity } from 'lucide-react';
import { notFound } from 'next/navigation';

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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          {workout.title}
        </h1>
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(workout.date)}</span>
          <span>at</span>
          <span>{formatTime(workout.date)}</span>
        </div>
        <Badge variant="outline" className="border-red-500 text-red-400">
          <Activity className="w-4 h-4 mr-2" />
          {workout.type}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#202020] border-red-700/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-400" />
              Workout Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Duration</span>
              </div>
              <span className="text-white font-semibold">
                {formatDuration(workout.duration)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Distance</span>
              </div>
              <span className="text-white font-semibold">
                {formatDistance(workout.distance)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">Calories</span>
              </div>
              <span className="text-white font-semibold">
                {workout.calories ? `${workout.calories} kcal` : 'N/A'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#202020] border-red-700/30">
          <CardHeader>
            <CardTitle className="text-white">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed">
              {workout.description || 'No description provided.'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#202020] border-red-700/30">
        <CardHeader>
          <CardTitle className="text-white">Workout Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400 text-sm">Created</span>
              <p className="text-white">
                {formatDate(workout.createdAt)} at{' '}
                {formatTime(workout.createdAt)}
              </p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Last Updated</span>
              <p className="text-white">
                {formatDate(workout.updatedAt)} at{' '}
                {formatTime(workout.updatedAt)}
              </p>
            </div>
          </div>
          {workout.circleId && (
            <div>
              <span className="text-gray-400 text-sm">Circle</span>
              <p className="text-white">Part of a fitness circle</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutPage;
