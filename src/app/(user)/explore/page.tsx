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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Users, TrendingUp, Globe } from 'lucide-react';
import TimelineFeed from '@/components/shared/TimelineFeed';
import { getUserProfile } from '@/actions/user.actions';


const placeholderCircles = [
  {
    id: '1',
    name: 'Morning Runners Club',
    description: 'Join fellow early birds for sunrise runs and coffee chats',
    coverImage: '/placeholder-circle.jpg',
    visibility: 'PUBLIC',
    _count: { members: 45 },
    isRecommended: true,
    recommendationReason: "Based on your friends' interests",
  },
  {
    id: '2',
    name: 'Yoga & Mindfulness',
    description: 'Find your zen with daily yoga sessions and meditation',
    coverImage: '/placeholder-circle.jpg',
    visibility: 'PUBLIC',
    _count: { members: 32 },
    isRecommended: true,
    recommendationReason: 'Popular in your area',
  },
  {
    id: '3',
    name: 'CrossFit Warriors',
    description: 'High-intensity training for those who dare',
    coverImage: '/placeholder-circle.jpg',
    visibility: 'PRIVATE',
    _count: { members: 28 },
    isRecommended: false,
  },
];

const placeholderPosts = [

];

const ExplorePage = async () => {

  const user = await getUserProfile();
  const currentLocation =
    user.success && user.user
      ? `${user.user.city || 'Unknown City'}, ${
          user.user.state || 'Unknown State'
        }, ${user.user.country || 'Unknown Country'}`
      : 'Loading location...';


  const { success: circlesSuccess, circles: allCircles } =
    await getAllCircles();
  const recommendedCircles = placeholderCircles.filter((c) => c.isRecommended);
  const searchResults = placeholderCircles; 

  return (
    <div className="min-h-full p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
 
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Explore
            </h1>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">
              Discover new circles and connect with athletes in your area
            </p>
          </div>
        </div>

  
    

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
                {circle.coverImage && (
                  <div className="relative h-32 w-full">
                    <Image
                      src={circle.coverImage}
                      alt={circle.name}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  </div>
                )}
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
                    {circle.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {circle._count.members} members
                    </span>
                    {circle.isRecommended && (
                      <span className="text-green-400 text-xs">
                        {circle.recommendationReason}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    asChild
                    className="w-full group-hover:bg-red-600 transition-colors"
                  >
                    <Link href={`/circles/${circle.id}`}>View Circle</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Local Posts Feed */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-red-400" />
            <h2 className="text-xl font-semibold text-white">
              Posts from Your Area
            </h2>
          </div>
          {/* <TimelineFeed posts={placeholderPosts} /> */}
        </div>

        {/* All Circles Section (for search results) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-red-400" />
            <h2 className="text-xl font-semibold text-white">All Circles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {searchResults.map((circle) => (
              <Card
                key={circle.id}
                className="cardBackground border-0 hover:border-red-500 transition-colors group"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-base group-hover:text-red-400 transition-colors">
                    {circle.name}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-xs">
                    {circle._count.members} members
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link href={`/circles/${circle.id}`}>View</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
