'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Users } from 'lucide-react';

import { useState } from 'react';
import { FriendWithDetails } from '@/lib/types/friends.type';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import defaultAvatar from '@/app/assets/defaults/default_avatar.jpg';

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
              friend.bio.toLowerCase().includes(searchQuery.toLowerCase())),
        );

  const filteredAndSortedFriends = filteredFriends;

  return (
    <div>
      <div className=" border-0 max-w-lg mx-auto">
        <div className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4 " />
                <input
                  placeholder="Search friends by name or bio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="darkBackground hover:bg-[#4d3030] border border-red-700 rounded-full px-10 py-2 text-white placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

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
                    src={friend.avatarUrl || defaultAvatar}
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
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-100 text-sm line-clamp-2">
                {friend.bio || 'No bio available.'}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-red-400">
                  {friend.mutualFriends === 0
                    ? 'No mutual friends'
                    : friend.mutualFriends === 1
                      ? '1 mutual friend'
                      : '' + friend.mutualFriends + ' mutual friends'}
                </span>
                <Button size="sm" className="">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedFriends.length === 0 && (
        <div className="">
          <div className="p-8 text-center">
            <Users className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No friends found
            </h3>
            <p className="text-gray-300">
              Try adjusting your search or filter criteria to find friends.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default FriendDisplay;
