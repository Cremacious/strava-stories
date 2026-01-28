'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, Mail, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useFriendStore } from '@/stores/useFriendStore';
import defaultAvatar from '@/app/assets/defaults/default_avatar.jpg';

const SearchFriends = () => {
  const [sendingRequest, setSendingRequest] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());
  const {
    searchResults,
    isSearching,
    searchError,
    searchUsersForFriends,
    clearSearchResults,
    sendFriendRequest: storeSendFriendRequest,
  } = useFriendStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        searchUsersForFriends(searchQuery);
      } else {
        clearSearchResults();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, searchUsersForFriends, clearSearchResults]);

  const handleSendRequest = async (userId: string) => {
    setSendingRequest(true);
    const result = await storeSendFriendRequest(userId);
    if (result.success) {
      setSentRequests((prev) => new Set(prev).add(userId));
    } else {
      console.error('Failed to send friend request:', result.error);
    }
    setSendingRequest(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-2 cardBackground rounded-2xl">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-red-400" />
            Find Friends
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Search for users by name or email to send friend requests
          </p>
        </CardHeader>
      </Card>

      <div className="">
        <div className="px-4">
          <div className="relative">
            {isSearching ? (
              <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4 animate-spin" />
            ) : (
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
            )}
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#2a2a2a] border-red-700/50 text-white placeholder-gray-200 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {searchError && (
        <Card className="border-0">
          <CardContent className="p-4">
            <p className="text-red-400 text-sm">{searchError}</p>
          </CardContent>
        </Card>
      )}

      {searchQuery && !isSearching && (
        <div className="space-y-3">
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div key={user.id} className="">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={user.avatarUrl || defaultAvatar }
                        alt={`${user.name || 'Unknown'} avatar`}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full border-2 border-red-600"
                      />
                      <div>
                        <h3 className="text-white font-semibold flex items-center gap-2">
                          {user.name || 'Unknown'}
                        </h3>
                        <p className="text-gray-400 text-sm flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </p>
                        <p className="text-gray-300 text-xs mt-1">
                          {user.bio || 'No bio available'}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSendRequest(user.id)}
                      disabled={sentRequests.has(user.id)}
                      size="sm"
                      className={`${
                        sentRequests.has(user.id)
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      } transition-colors`}
                    >
                      {sendingRequest && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      {sentRequests.has(user.id)
                        ? 'Request Sent'
                        : 'Send Request'}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : searchQuery.length >= 2 ? (
            <Card className="border-0 shadow-none">
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  No users found
                </h3>
                <p className="text-gray-400">
                  Try searching with a different name or email address.
                </p>
              </CardContent>
            </Card>
          ) : null}
        </div>
      )}

      {!searchQuery && (
        <div className="">
          <div className="p-8 text-center">
            <UserPlus className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Start searching for friends
            </h3>
            <p className="text-gray-400">
              Type a name or email address in the search box above to find users
              to connect with.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFriends;
