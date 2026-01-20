'use client';

import { Button } from '@/components/ui/button';
import { useCircleStore } from '@/stores/useCircleStore';
import { useRouter } from 'next/navigation';

interface JoinCircleButtonProps {
  isMember: boolean;
  circleId: string;
}

const JoinCircleButton = ({ isMember, circleId }: JoinCircleButtonProps) => {
  const { joinCircle, leaveCircle, isLoading, error } = useCircleStore();
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
        disabled={isLoading}
        className="bg-red-600 text-white hover:bg-red-700 font-semibold w-full sm:w-auto"
      >
        {isLoading ? 'Leaving...' : 'Leave Circle'}
      </Button>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleJoin}
        disabled={isLoading}
        className="bg-white text-red-600 hover:bg-gray-100 font-semibold w-full sm:w-auto"
      >
        {isLoading ? 'Joining...' : 'Join Circle'}
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default JoinCircleButton;
