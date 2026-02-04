import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail } from 'lucide-react';
import Image from 'next/image';
import defaultAvatar from '@/app/assets/defaults/default_avatar.jpg';

type FriendRequest = {
  id: string;
  friendId: string;
  name?: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  isSentByCurrentUser: boolean;
};

interface DemoPendingFriendRequestsProps {
  friendRequests: FriendRequest[];
}

const DemoPendingFriendRequests = ({
  friendRequests,
}: DemoPendingFriendRequestsProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 cardBackground rounded-2xl">
      <Card className="border-0 shadow-none">
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
            return (
              <Card key={request.id} className="">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={request.avatarUrl || defaultAvatar}
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
                        <div className="text-gray-400 text-sm font-medium flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          Pending
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm font-medium">
                          Demo Mode
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-0 shadow-none">
          <CardContent className="p-8 text-center">
            <User className="w-12 h-12 text-red-400 mx-auto mb-4" />
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

export default DemoPendingFriendRequests;
