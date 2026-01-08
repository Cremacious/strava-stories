'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, SortAsc, Users, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FriendSortOption, FriendFilterOption } from '@/lib/types/friends.type';
import { friendsSample } from '@/lib/sample/friends.sample';
import Image from 'next/image';

const FriendsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<FriendSortOption>('name');
  const [filterBy, setFilterBy] = useState<FriendFilterOption>('all');
  const [selectedCircle, setSelectedCircle] = useState<string>('all');

  const allCircles = useMemo(() => {
    const circles = new Set<string>();
    friendsSample.forEach((friend) => {
      friend.circles?.forEach((circle) => circles.add(circle));
    });
    return Array.from(circles).sort();
  }, []);

  const filteredAndSortedFriends = useMemo(() => {
    const filtered = friendsSample.filter((friend) => {
      const matchesSearch =
        friend.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.bio?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filterBy === 'all' ||
        (filterBy === 'online' && friend.isOnline) ||
        (filterBy === 'circle' && friend.circles?.includes(selectedCircle));

      return matchesSearch && (filterBy === 'all' || matchesFilter);
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'activity':
          return (a.lastActivity || '').localeCompare(b.lastActivity || '');
        case 'circles':
          return (b.circles?.length || 0) - (a.circles?.length || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy, filterBy, selectedCircle]);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Friends</h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Connect with fellow fitness enthusiasts and track progress together
          </p>
        </div>
        <div className="text-sm text-gray-400">
          {filteredAndSortedFriends.length} of {friendsSample.length} friends
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-[#202020] border-0 max-w-4xl mx-auto">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4 " />
                <input
                  placeholder="Search friends by name or bio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="darkBackground hover:bg-[#4d3030] border border-red-700 rounded-full px-10 py-2 text-white placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Select
                value={filterBy}
                onValueChange={(value: FriendFilterOption) =>
                  setFilterBy(value)
                }
              >
                <SelectTrigger className="w-full sm:w-32 bg-[#2e2e2e] text-white border-red-900/40">
                  <Filter className="w-4 h-4 mr-2 text-white" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2e2e2e] text-white border-0">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="circle">By Circle</SelectItem>
                </SelectContent>
              </Select>

              {filterBy === 'circle' && (
                <Select
                  value={selectedCircle}
                  onValueChange={setSelectedCircle}
                >
                  <SelectTrigger className="w-full sm:w-40 bg-[#2e2e2e] text-white border-red-900/40">
                    <SelectValue placeholder="Select circle" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2e2e2e] text-white border-0">
                    <SelectItem value="all">All Circles</SelectItem>
                    {allCircles.map((circle) => (
                      <SelectItem key={circle} value={circle}>
                        {circle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Select
                value={sortBy}
                onValueChange={(value: FriendSortOption) => setSortBy(value)}
              >
                <SelectTrigger className="w-full sm:w-32 bg-[#2e2e2e] text-white border-red-900/40">
                  <SortAsc className="w-4 h-4 mr-2 text-white" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2e2e2e] text-white border-0">
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="activity">Activity</SelectItem>
                  <SelectItem value="circles">Circles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Friends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedFriends.map((friend) => (
          <Card
            key={friend.id}
            className="darkBackground border-0 hover:border-red-500 transition-colors"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={friend.avatarUrl || '/placeholder-avatar.jpg'}
                    alt={`${friend.name || 'Unknown'} avatar`}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full border-2 border-red-600"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-white text-lg truncate">
                    {friend.name || 'Unknown'}
                  </CardTitle>
                  <p className="text-gray-100 text-sm">
                    {friend.lastActivity || 'Unknown'}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-100 text-sm line-clamp-2">
                {friend.bio || 'No bio available.'}
              </p>

              {/* Circles */}
              <div className="space-y-2">
                <div className="flex items-center text-gray-100 text-sm">
                  <Circle className="w-4 h-4 mr-1" />
                  <span>{friend.circles?.length || 0} circles</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(friend.circles || []).slice(0, 3).map((circle, index) => (
                    <span
                      key={index}
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                    >
                      {circle}
                    </span>
                  ))}
                  {(friend.circles?.length || 0) > 3 && (
                    <span className="text-gray-400 text-xs px-2 py-1">
                      +{(friend.circles?.length || 0) - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Mutual Friends */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-red-400">
                  {friend.mutualFriends} mutual friends
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedFriends.length === 0 && (
        <Card className="darkBackground3 border-gray-700">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No friends found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria to find friends.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FriendsPage;
