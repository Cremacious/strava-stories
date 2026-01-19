'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Users } from 'lucide-react';

import { useState } from 'react';
import { FriendWithDetails } from '@/lib/types/friends.type';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const FriendDisplay = ({ friends }: { friends: FriendWithDetails[] }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends =
    searchQuery.trim() === ''
      ? friends
      : friends.filter(
          (friend) =>
            (friend.name &&
              friend.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (friend.bio &&
              friend.bio.toLowerCase().includes(searchQuery.toLowerCase()))
        );

  const filteredAndSortedFriends = filteredFriends;

  console.log('Friend Display:', friends);

  return (
    <div>
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
export default FriendDisplay;
