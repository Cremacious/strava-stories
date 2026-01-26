'use client';
import { useState, useMemo } from 'react';
import { WorkoutDisplayData } from '@/lib/types/workouts.type';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Clock,
  MapPin,
  Flame,
  Activity,
  Search,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import Link from 'next/link';
import Pagination from '../../../../components/layout/Pagination';

type SortOption = 'date-asc' | 'date-desc';
type ViewMode = 'grid' | 'list';

const AllWorkoutsDisplay = ({
  workoutData,
}: {
  workoutData: WorkoutDisplayData[];
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredAndSortedWorkouts = useMemo(() => {
    const filtered = workoutData.filter((workout) =>
      workout.type.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (sortBy === 'date-asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return filtered;
  }, [workoutData, searchTerm, sortBy]);

  const paginatedWorkouts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedWorkouts.slice(startIndex, endIndex);
  }, [filteredAndSortedWorkouts, currentPage, itemsPerPage]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const WorkoutCard = ({ workout }: { workout: WorkoutDisplayData }) => (
    <Link href={`/workouts/${workout.id}`}>
      <Card className="darkBackground border-gray-700 hover:border-red-500 transition-colors cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-red-600 text-white">
              {workout.type}
            </Badge>
            {workout.isStrava && (
              <Badge
                variant="outline"
                className="border-blue-500 text-blue-400"
              >
                Strava
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg text-white">
            {formatDate(workout.date)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-red-400" />
              <span className="text-sm text-gray-300">
                {formatDuration(workout.duration)}
              </span>
            </div>
            {workout.distance > 0 && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-300">
                  {workout.distance.toFixed(1)} km
                </span>
              </div>
            )}
          </div>
          {workout.calories > 0 && (
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-red-400" />
              <span className="text-sm text-gray-300">
                {workout.calories} cal
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );

  const WorkoutListItem = ({ workout }: { workout: WorkoutDisplayData }) => (
    <Link href={`/workouts/${workout.id}`}>
      <div className="darkBackground border border-gray-700 hover:border-red-500 transition-colors cursor-pointer p-4 rounded-lg  mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Badge variant="secondary" className="bg-red-600 text-white">
                  {workout.type}
                </Badge>
                {workout.isStrava && (
                  <Badge
                    variant="outline"
                    className="border-blue-500 text-blue-400"
                  >
                    Strava
                  </Badge>
                )}
              </div>
              <p className="text-white font-medium truncate">
                {formatDate(workout.date)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-300">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-red-400" />
              <span>{formatDuration(workout.duration)}</span>
            </div>
            {workout.distance > 0 && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>{workout.distance.toFixed(1)} km</span>
              </div>
            )}
            {workout.calories > 0 && (
              <div className="flex items-center space-x-1">
                <Flame className="w-4 h-4 text-red-400" />
                <span>{workout.calories} cal</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            All Workouts
          </h1>
          <p className="text-gray-400 mt-1">
            {filteredAndSortedWorkouts.length} workout
            {filteredAndSortedWorkouts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by workout type..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 darkBackground border-gray-600 text-white placeholder-gray-400"
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={sortBy}
            onValueChange={(value: SortOption) => {
              setSortBy(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-40 darkBackground border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="darkBackground border-gray-600">
              <SelectItem
                value="date-desc"
                className="text-white hover:bg-gray-700"
              >
                <div className="flex items-center space-x-2">
                  <ArrowDown className="w-4 h-4" />
                  <span>Newest First</span>
                </div>
              </SelectItem>
              <SelectItem
                value="date-asc"
                className="text-white hover:bg-gray-700"
              >
                <div className="flex items-center space-x-2">
                  <ArrowUp className="w-4 h-4" />
                  <span>Oldest First</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border border-gray-600 rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none border-r border-gray-600"
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              List
            </Button>
          </div>
        </div>
      </div>


      {filteredAndSortedWorkouts.length === 0 ? (
        <div className="text-center py-12">
          <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No workouts found
          </h3>
          <p className="text-gray-400">
            {searchTerm
              ? 'Try adjusting your search criteria.'
              : 'Start your fitness journey by adding your first workout!'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="space-y-">
          {paginatedWorkouts.map((workout) => (
            <WorkoutListItem key={workout.id} workout={workout} />
          ))}
        </div>
      )}

      <Pagination
        totalItems={filteredAndSortedWorkouts.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AllWorkoutsDisplay;
