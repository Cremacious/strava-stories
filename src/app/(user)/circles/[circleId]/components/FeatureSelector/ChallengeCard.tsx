import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Challenge } from '@/lib/types/challenge.type';
const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  return (
    <Card key={challenge.id} className="bg-[#292929] border-0">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-white">{challenge.title}</CardTitle>
            <p className="text-gray-400 text-sm mt-1">
              {challenge.description}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-700 p-2 rounded">
            <p className="text-gray-400 text-xs">Participants</p>
            <p className="text-white font-bold">
              {/* {challenge.participants} */}
            </p>
          </div>
          <div className="bg-gray-700 p-2 rounded">
            <p className="text-gray-400 text-xs">Type</p>
            {/* <p className="text-white font-bold">{challenge.type}</p> */}
          </div>
          <div className="bg-red-500/20 p-2 rounded">
            <p className="text-red-400 text-xs">XP Reward</p>
            <p className="text-red-400 font-bold">
              {/* {challenge.xpReward} */}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default ChallengeCard;
