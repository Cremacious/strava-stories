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
    <div className="min-h-screen my-4 px-2 md:px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-[#3f3f3f] border-0">
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
                className="text-gray-200 border-gray-200"
              >
                {challenge.difficulty}
              </Badge>
              {challenge.category && (
                <Badge
                  variant="outline"
                  className="text-gray-200 border-gray-200"
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
              <p className="text-gray-200">{challenge.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">Goal</h3>
              <p className="text-gray-200">{challenge.goal}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Rules
              </h3>
              <p className="text-gray-200">{challenge.rules}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenge.startDate && (
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white text-sm">Start Date</p>
                    <p className="text-white font-medium">
                      {formatDate(challenge.startDate)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-white text-sm">End Date</p>
                  <p className="text-white font-medium">
                    {formatDate(challenge.endDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-white text-sm">Participants</p>
                  <p className="text-white font-medium">
                    {challenge.totalParticipants}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-white text-sm">Completed</p>
                  <p className="text-white font-medium">
                    {challenge.completedParticipants}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-white text-sm">Average Progress</p>
                  <p className="text-white font-medium">
                    {Math.round(challenge.averageProgress * 100)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Flame className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-white text-sm">Difficulty</p>
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
                      className="text-gray-200 border-gray-300"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

          
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CircleChallengePage;
