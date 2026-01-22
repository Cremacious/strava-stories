import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Star } from 'lucide-react';
import { RecentHighlights } from '@/lib/types/circles.type';

const RecentCirclesHighlights = ({
  recentHighlights,
}: {
  recentHighlights: RecentHighlights;
}) => {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Star className="w-5 h-5 mr-2 text-red-400" />
          Recent Highlights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentHighlights.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No Highlights Yet
              </h3>
              <p className="text-gray-400 text-sm">
                Recent achievements and milestones will appear here.
              </p>
            </div>
          ) : (
            recentHighlights.map((highlight) => (
              <div
                key={highlight.id}
                className="flex items-start space-x-3 p-3 darkBackground rounded-lg"
              >
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium">{highlight.user}</p>
                  <p className="text-gray-300 text-sm">
                    {highlight.achievement}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-red-400 text-xs font-medium">
                      {highlight.type}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {highlight.time}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentCirclesHighlights;
