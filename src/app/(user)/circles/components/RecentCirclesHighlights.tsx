import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Star } from 'lucide-react';
import { RecentHighlights } from '@/lib/types/circles.type';

const RecentCirclesHighlights = ({
  recentHighlights,
}: {
  recentHighlights: RecentHighlights;
}) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Star className="w-5 h-5 mr-2 text-red-400" />
          Recent Highlights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentHighlights.map((highlight) => (
            <div
              key={highlight.id}
              className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg"
            >
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">{highlight.user}</p>
                <p className="text-gray-300 text-sm">{highlight.achievement}</p>
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default RecentCirclesHighlights;
