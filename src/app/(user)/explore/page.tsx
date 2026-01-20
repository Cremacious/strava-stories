import { getAllCircles } from '@/actions/circle.actions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';

const ExplorePage = async () => {
  const { success, circles, error } = await getAllCircles();

  if (!success) {
    return <div>Error loading circles: {error}</div>;
  }

  return (
    <div className="min-h-full p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Explore Circles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {circles.map((circle) => (
            <Card
              key={circle.id}
              className="cardBackground border-0 hover:border-red-500 transition-colors"
            >
              {circle.coverImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={circle.coverImage}
                    alt={circle.name}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-white">{circle.name}</CardTitle>
                <CardDescription className="text-gray-300">
                  {circle.description || 'No description available'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    {circle._count.members} members
                  </span>
                  <Badge
                    variant={
                      circle.visibility === 'PUBLIC' ? 'default' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {circle.visibility.toLowerCase()}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/circles/${circle.id}`}>View Circle</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ExplorePage;
