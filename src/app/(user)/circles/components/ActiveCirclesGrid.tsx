import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Circle } from '@/lib/types/circles.type';
import Link from 'next/link';

const ActiveCirclesGrid = ({ myCircles }: { myCircles: Circle[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {myCircles.slice(0, 4).map((circle) => (
        <Link key={circle.id} href={`/circles/${circle.id}`}>
          <Card className="cardBackground border-0 hover:border-red-500 cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-white text-lg truncate">
                    {circle.name}
                  </CardTitle>
                  <p className="text-gray-400 text-sm">{circle.category}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-300 text-sm">{circle.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {circle.memberCount} members
                </span>
                <span className="text-gray-400">{circle.lastActivity}</span>
              </div>
              {circle.upcomingChallenge && (
                <div className="darkBackground rounded p-2">
                  <p className="text-red-400 text-sm font-medium">
                    Upcoming: {circle.upcomingChallenge}
                  </p>
                </div>
              )}
              <div className="flex flex-wrap gap-1">
                {circle.achievements.slice(0, 2).map((achievement, index) => (
                  <span
                    key={index}
                    className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ActiveCirclesGrid;
