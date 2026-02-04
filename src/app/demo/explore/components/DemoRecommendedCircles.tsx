import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Users, TrendingUp, UserCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { RecommendedCircle } from '@/actions/circle.actions';

interface DemoRecommendedCirclesProps {
  recommendedCircles: RecommendedCircle[];
}

const DemoRecommendedCircles = ({
  recommendedCircles,
}: DemoRecommendedCirclesProps) => {
  if (!recommendedCircles || recommendedCircles.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-red-400" />
          <h2 className="text-xl font-semibold text-white">
            Recommended for You
          </h2>
        </div>
        <div className="text-center py-12 px-6">
          <UserCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">
            No Recommendations Yet
          </h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
            Connect with more friends to discover circles they&apos;re part of.
            Recommendations are based on circles your friends have joined.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-red-400" />
        <h2 className="text-xl font-semibold text-white">
          Recommended for You
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedCircles.map((circle) => (
          <Card
            key={circle.id}
            className="cardBackground border-0 hover:border-red-500 transition-colors group"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-white text-lg group-hover:text-red-400 transition-colors">
                  {circle.name}
                </CardTitle>
                <Badge
                  variant={
                    circle.visibility === 'PUBLIC' ? 'default' : 'secondary'
                  }
                  className="text-xs"
                >
                  {circle.visibility.toLowerCase()}
                </Badge>
              </div>
              <CardDescription className="text-gray-300 text-sm">
                {circle.description || 'No description'}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {circle.memberCount} members
                </span>
              </div>
              <div className="text-green-400 text-xs">
                {circle.recommendationReason}
              </div>
            </CardContent>
            {/* Removed the View Circle button for demo */}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DemoRecommendedCircles;
