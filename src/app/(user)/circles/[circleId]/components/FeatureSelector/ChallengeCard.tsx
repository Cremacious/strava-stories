import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Trophy, Users } from 'lucide-react';
import { Challenge } from '@/lib/types/challenge.type';

const ChallengeCard = ({
  challenge,
  circleId,
}: {
  challenge: Challenge;
  circleId: string;
}) => {
  const formatDate = (date: Date | null | undefined) =>
    date ? date.toLocaleDateString() : 'N/A';

  const statusColor = {
    ACTIVE: 'bg-green-500',
    COMPLETED: 'bg-blue-500',
    CANCELLED: 'bg-red-500',
  };

  const difficultyColor = {
    BEGINNER: 'text-green-400',
    INTERMEDIATE: 'text-yellow-400',
    ADVANCED: 'text-red-400',
  };

  return (
    <Link href={`/circles/${circleId}/challenges/${challenge.id}`}>
      <Card className="bg-[#292929] border-0 hover:bg-[#333] transition-colors cursor-pointer p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-red-400" />
              <h3 className="text-white text-sm font-semibold">
                {challenge.title}
              </h3>
            </div>
            <p className="text-gray-400 text-xs mb-2">
              {challenge.description}
            </p>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-3 h-3 text-red-400" />
              <p className="text-gray-300 text-xs">{challenge.goal}</p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-3 h-3 text-red-400" />
              <p className="text-gray-300 text-xs">{challenge.rules}</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-gray-400">
                Start: {formatDate(challenge.startDate)}
              </span>
              <span className="text-gray-400">
                End: {formatDate(challenge.endDate)}
              </span>
            </div>
            {challenge.category && (
              <p className="text-gray-400 text-xs mt-1">
                Category: {challenge.category}
              </p>
            )}
            {challenge.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {challenge.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs text-gray-300 border-gray-600 px-1 py-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Created: {formatDate(challenge.createdAt)} | Updated:{' '}
              {formatDate(challenge.updatedAt)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge
              className={`${statusColor[challenge.status]} text-white text-xs`}
            >
              {challenge.status}
            </Badge>
            <span
              className={`text-xs font-semibold ${
                difficultyColor[challenge.difficulty]
              }`}
            >
              {challenge.difficulty}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ChallengeCard;
