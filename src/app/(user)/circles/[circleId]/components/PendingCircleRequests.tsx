'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCircleStore } from '@/stores/useCircleStore';
import { getPendingCircleRequests } from '@/actions/circle.actions';
import Image from 'next/image';

interface PendingRequest {
  id: string;
  user: {
    id: string;
    name: string | null;
    avatarUrl: string | null;
  };
}

const PendingCircleRequests = ({
  circleId,
  isOwner,
}: {
  circleId: string;
  isOwner: boolean;
}) => {
  const [requests, setRequests] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    approveCircleRequest,
    rejectCircleRequest,
    isApproving,
    isRejecting,
  } = useCircleStore();

  useEffect(() => {
    const fetchRequests = async () => {
      const result = await getPendingCircleRequests(circleId);
      if (result.success) {
        setRequests(result.requests || []);
      }
      setLoading(false);
    };
    fetchRequests();
  }, [circleId]);

  const handleApprove = async (userId: string) => {
    const result = await approveCircleRequest(circleId, userId);
    if (result.success) {
      setRequests(requests.filter((req) => req.user.id !== userId));
    }
  };

  const handleReject = async (userId: string) => {
    const result = await rejectCircleRequest(circleId, userId);
    if (result.success) {
      setRequests(requests.filter((req) => req.user.id !== userId));
    }
  };

  if (!isOwner) {
    return null;
  }

  if (loading) {
    return <div className="text-center text-gray-400">Loading requests...</div>;
  }

  return (
    <div className="mb-6">
      {requests.length === 0 ? null : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="cardBackground border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={request.user.avatarUrl || '/placeholder-avatar.jpg'}
                      alt={`${request.user.name || 'Unknown'} avatar`}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-medium">
                        {request.user.name || 'Unknown User'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Wants to join the circle
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleApprove(request.user.id)}
                      disabled={isApproving}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(request.user.id)}
                      disabled={isRejecting}
                      size="sm"
                      variant="destructive"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingCircleRequests;
