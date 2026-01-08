'use client';

import { useState, useEffect } from 'react';
import RoutineCard from '../components/FeatureSelector/RoutineCard';
import { Routine } from '@/lib/types/routine.type';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

const RoutinesDisplay = ({
  circleId,
  routines,
}: {
  circleId: string;
  routines: Routine[];
}) => {
  const [filteredRoutines, setFilteredRoutines] = useState<Routine[]>(routines);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); 
  useEffect(() => {
    let filtered = routines.filter(
      (routine) =>
        routine.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        routine.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'difficulty') {
      filtered = filtered.sort((a, b) =>
        a.difficulty.localeCompare(b.difficulty)
      );
    } else if (sortBy === 'category') {
      filtered = filtered.sort((a, b) =>
        (a.category || '').localeCompare(b.category || '')
      );
    } else if (sortBy === 'date') {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setFilteredRoutines(filtered);
  }, [routines, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Circle Routines</h1>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search routines by title or description..."
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
                <SelectItem value="difficulty" className="text-white">
                  Difficulty
                </SelectItem>
                <SelectItem value="category" className="text-white">
                  Category
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Routines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutines.length > 0 ? (
            filteredRoutines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                circleId={circleId}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No routines found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoutinesDisplay;
