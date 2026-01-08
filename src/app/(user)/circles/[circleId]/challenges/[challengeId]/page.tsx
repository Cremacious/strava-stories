import { getCircleChallengeById } from '@/actions/challenge.actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  Users,
  Target,
  Trophy,
  Tag,
  Flame,
} from 'lucide-react';
import Link from 'next/link';

const CircleChallengePage = async ({
  params,
}: {
  params: Promise<{ challengeId: string; circleId: string }>;
}) => {
  const { challengeId, circleId } = await params;

  const challengeResult = await getCircleChallengeById(challengeId);
  const challenge = challengeResult.success ? challengeResult.challenge : null;

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Challenge Not Found</h1>
          <p>
            The challenge you are looking for does not exist or is unavailable.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/circles/${circleId}/challenges`}
            className="text-red-400 hover:text-red-300"
          >
            ← Back to Challenges
          </Link>
        </div>

        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              {challenge.title}
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="bg-red-600 text-white">
                {challenge.status}
              </Badge>
              <Badge
                variant="outline"
                className="text-gray-300 border-gray-600"
              >
                {challenge.difficulty}
              </Badge>
              {challenge.category && (
                <Badge
                  variant="outline"
                  className="text-gray-300 border-gray-600"
                >
                  {challenge.category}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Description
              </h3>
              <p className="text-gray-400">{challenge.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Goal</h3>
              <p className="text-gray-400">{challenge.goal}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Rules
              </h3>
              <p className="text-gray-400">{challenge.rules}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenge.startDate && (
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Start Date</p>
                    <p className="text-white font-medium">
                      {formatDate(challenge.startDate)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-gray-400 text-sm">End Date</p>
                  <p className="text-white font-medium">
                    {formatDate(challenge.endDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-gray-400 text-sm">Participants</p>
                  <p className="text-white font-medium">
                    {challenge.totalParticipants}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-white font-medium">
                    {challenge.completedParticipants}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-gray-400 text-sm">Average Progress</p>
                  <p className="text-white font-medium">
                    {Math.round(challenge.averageProgress * 100)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Flame className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-gray-400 text-sm">Difficulty</p>
                  <p className="text-white font-medium">
                    {challenge.difficulty}
                  </p>
                </div>
              </div>
            </div>

            {challenge.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {challenge.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-gray-300 border-gray-600"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Metadata
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Created At</p>
                  <p className="text-white">
                    {formatDate(challenge.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Updated At</p>
                  <p className="text-white">
                    {formatDate(challenge.updatedAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">User ID</p>
                  <p className="text-white">{challenge.userId}</p>
                </div>
                <div>
                  <p className="text-gray-400">Circle ID</p>
                  <p className="text-white">{challenge.circleId}</p>
                </div>
                <div>
                  <p className="text-gray-400">Challenge ID</p>
                  <p className="text-white">{challenge.id}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CircleChallengePage;
