'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, Mail } from 'lucide-react';
import Image from 'next/image';
import defaultAvatar from '@/app/assets/defaults/default_avatar.jpg';

interface DemoUser {
  id: string;
  name?: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
}

const DemoSearchFriends = () => {
  const mockSearchResults: DemoUser[] = [];

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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              className="pl-10 bg-[#2a2a2a] border-red-700/50 text-white placeholder-gray-200 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {mockSearchResults.map((user) => (
          <div key={user.id} className="">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src={user.avatarUrl || defaultAvatar}
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
                <div className="text-gray-400 text-sm font-medium">
                  Demo Mode
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default DemoSearchFriends;
