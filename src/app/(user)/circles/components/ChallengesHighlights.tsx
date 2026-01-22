import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FeaturedChallenges } from '@/lib/types/circles.type';
import { Target } from 'lucide-react';

const ChallengesHighlights = ({
  featuredChallenges,
}: {
  featuredChallenges: FeaturedChallenges;
}) => {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Target className="w-5 h-5 mr-2 text-red-400" />
          Active Challenges
        </CardTitle>
      </CardHeader>
      <CardContent>
        {featuredChallenges.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-3">
              <Target className="w-6 h-6 text-gray-600" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">
              No Active Challenges
            </h4>
            <p className="text-gray-400 text-center text-sm">
              Join a circle to participate in fitness challenges and track your
              progress
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredChallenges.map((challenge) => (
              <div key={challenge.id} className="darkBackground rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-semibold">
                    {challenge.title}
                  </h3>
                  <span className="text-red-400 text-sm">{challenge.type}</span>
                </div>
                <p className="text-gray-100 text-sm mb-3">{challenge.circle}</p>
                <div className="flex justify-between items-center text-sm text-gray-100 mb-2">
                  <span>{challenge.participants} participants</span>
                  <span>Ends {challenge.endDate}</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
                <p className="text-gray-100 text-xs mt-1">
                  {challenge.progress}% complete
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default ChallengesHighlights;
