'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Check, X } from 'lucide-react';
import Image from 'next/image';

type FriendRequest = {
  id: string;
  name?: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  isSentByCurrentUser: boolean;
};

interface PendingFriendRequestsProps {
  friendRequests: FriendRequest[];
}

const PendingFriendRequests = ({
  friendRequests,
}: PendingFriendRequestsProps) => {
  console.log('PendingFriendRequests - friendRequests:', friendRequests);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-[#202020] border-red-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5 text-red-400" />
            Pending Friend Requests
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Review and respond to friend requests from other users
          </p>
        </CardHeader>
      </Card>

    
      {friendRequests.length > 0 ? (
        <div className="space-y-3">
          {friendRequests.map((request) => {
            console.log(
              `Request for ${request.email}: isSentByCurrentUser = ${request.isSentByCurrentUser}`
            ); 

            return (
              <Card
                key={request.id}
                className="bg-[#202020] border-red-700/30 hover:border-red-500/50 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={request.avatarUrl || '/placeholder-avatar.jpg'}
                        alt={`${request.name || 'Unknown'} avatar`}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full border-2 border-red-600"
                      />
                      <div>
                        <h3 className="text-white font-semibold flex items-center gap-2">
                          <User className="w-4 h-4 text-red-400" />
                          {request.name || 'Unknown'}
                        </h3>
                        <p className="text-gray-400 text-sm flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {request.email}
                        </p>
                        <p className="text-gray-300 text-xs mt-1">
                          {request.bio || 'No bio available'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      {request.isSentByCurrentUser ? (
                        // Outgoing request: Show "Pending" status
                        <div className="text-gray-400 text-sm font-medium flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          Pending
                        </div>
                      ) : (
                        // Incoming request: Show Accept/Decline buttons
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white transition-colors flex-1 sm:flex-none"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-colors flex-1 sm:flex-none"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Decline
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="bg-[#202020] border-red-700/30">
          <CardContent className="p-8 text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No pending requests
            </h3>
            <p className="text-gray-400">
              You don&apos;t have any pending friend requests at the moment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PendingFriendRequests;
