'use client';

import { useState, useEffect } from 'react';
import WorkoutCard from '@/components/shared/cards/WorkoutCard';
import { CircleWorkout } from '@/lib/types/circles.type';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

const WorkoutDisplay = ({
  workouts,
  circleId,
}: {
  workouts: CircleWorkout[];
  circleId: string;
}) => {
  const [filteredWorkouts, setFilteredWorkouts] =
    useState<CircleWorkout[]>(workouts);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    let filtered = workouts.filter(
      (workout) =>
        workout.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'type') {
      filtered = filtered.sort((a, b) =>
        (a.type || '').localeCompare(b.type || '')
      );
    } else if (sortBy === 'date') {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setFilteredWorkouts(filtered);
  }, [workouts, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Circle Workouts</h1>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search workouts by type, title, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="date" className="text-white">
                  Date
                </SelectItem>
                <SelectItem value="type" className="text-white">
                  Type
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <WorkoutCard
                circleId={circleId}
                key={workout.id}
                workout={workout}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No workouts found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDisplay;
