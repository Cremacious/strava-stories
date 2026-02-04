import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Circle } from '@/lib/types/circles.type';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ActiveCirclesGrid = ({ myCircles }: { myCircles: Circle[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 bg-[#3F3F3F] rounded-lg">
      {myCircles.slice(0, 4).map((circle) => (
        <Card
          key={circle.id}
          className="bg-[#2e2e2e] border-0 hover:border-red-500"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-white text-lg truncate">
                  {circle.name}
                </CardTitle>
              
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-300 text-sm">{circle.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                {circle.memberCount} members
              </span>
            </div>
              <Link key={circle.id} href={`/circles/${circle.id}`}>
            <Button  className=" w-full">
                View
            </Button>
              </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ActiveCirclesGrid;
