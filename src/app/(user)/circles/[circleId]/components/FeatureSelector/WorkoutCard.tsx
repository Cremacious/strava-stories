import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heart, MessageSquare } from 'lucide-react';
import { CircleWorkout } from '@/lib/types/circles.type';

const WorkoutCard = ({ workout }: { workout: CircleWorkout }) => {
  return (
    <Card key={workout.id} className="bg-[#2e2e2e] border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-sm font-bold">
              {workout.memberName?.[0] || '?'}
            </div>
            <div>
              <p className="text-white font-semibold">
                {workout.memberName || 'Unknown Member'}
              </p>
              <p className="text-gray-400 text-sm">{workout.createdAt.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-gray-300 mb-2">
            {workout.description || 'No description'}
          </p>{' '}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#272727] p-2 rounded">
            <p className="text-gray-100 text-xs">Type</p>
            <p className="text-white font-bold">{workout.type || 'Unknown'}</p>
          </div>
          <div className="bg-[#272727] p-2 rounded">
            <p className="text-gray-400 text-xs">Duration</p>
            <p className="text-white font-bold">
              {workout.duration ? `${workout.duration}m` : 'N/A'}
            </p>{' '}
          </div>
          {workout.distance && (
            <div className="bg-[#272727] p-2 rounded">
              <p className="text-gray-400 text-xs">Distance</p>
              <p className="text-white font-bold">{workout.distance} miles</p>
            </div>
          )}
          {workout.calories && (
            <div className="bg-[#272727] p-2 rounded">
              <p className="text-gray-400 text-xs">Calories</p>
              <p className="text-white font-bold">{workout.calories}</p>
            </div>
          )}
        </div>
        <div className="flex gap-4 pt-2">
          <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">Comment</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
