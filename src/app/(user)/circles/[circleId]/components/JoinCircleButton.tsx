'use client';

import { Button } from '@/components/ui/button';
import { useCircleStore } from '@/stores/useCircleStore';
import { useRouter } from 'next/navigation';

interface JoinCircleButtonProps {
  isMember: boolean;
  membershipStatus: 'NONE' | 'PENDING' | 'ACTIVE';
  circleId: string;
}

const JoinCircleButton = ({
  isMember,
  membershipStatus,
  circleId,
}: JoinCircleButtonProps) => {
  const { joinCircle, leaveCircle, isJoining, isLeaving, error } =
    useCircleStore();
  const router = useRouter();

  const handleJoin = async () => {
    const result = await joinCircle(circleId);
    if (result.success) {
      router.refresh();
    }
  };

  const handleLeave = async () => {
    const result = await leaveCircle(circleId);
    if (result.success) {
      router.refresh();
    }
  };

  if (isMember) {
    return (
      <Button
        onClick={handleLeave}
        disabled={isLeaving}
        className="bg-red-600 text-white hover:bg-red-700 font-semibold w-full sm:w-auto"
      >
        {isLeaving ? 'Leaving...' : 'Leave Circle'}
      </Button>
    );
  }

  if (membershipStatus === 'PENDING') {
    return (
      <Button
        disabled
        className="bg-gray-600 text-white font-semibold w-full sm:w-auto cursor-not-allowed"
      >
        Request Sent
      </Button>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleJoin}
        disabled={isJoining}
        className="bg-white text-red-600 hover:bg-gray-100 font-semibold w-full sm:w-auto"
      >
        {isJoining ? 'Joining...' : 'Join Circle'}
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default JoinCircleButton;
