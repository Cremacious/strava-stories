'use client';

import { useState, useEffect } from 'react';
import ChallengeCard from '../components/FeatureSelector/ChallengeCard';
import { Challenge } from '@/lib/types/challenge.type';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

type ChallengesDisplayProps = {
  challenges: Challenge[] | undefined;
  circleId: string; 
};

const ChallengesDisplay = ({
  challenges = [],
  circleId,
}: ChallengesDisplayProps) => {
  const [filteredChallenges, setFilteredChallenges] =
    useState<Challenge[]>(challenges);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); 

  useEffect(() => {
    let filtered = challenges.filter(
      (challenge) =>
        challenge.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.difficulty?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'date') {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setFilteredChallenges(filtered);
  }, [challenges, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Circle Challenges
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search challenges by title, category, or difficulty..."
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
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.length > 0 ? (
            filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                circleId={circleId}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No challenges found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengesDisplay;
