import { getAllCircles, getRecommendedCircles } from '@/actions/circle.actions';
import { getAreaPosts } from '@/actions/post.actions';

import { MapPin, Globe } from 'lucide-react';
import TimelineFeed from '@/components/shared/TimelineFeed';
import { getUserProfile } from '@/actions/user.actions';
import RecommendedCircles from './components/RecommendedCircles';

const ExplorePage = async () => {
  const user = await getUserProfile();


  const recommendedResult = await getRecommendedCircles();
  const recommendedCircles = recommendedResult.success
    ? recommendedResult.circles
    : [];

  const areaPostsResult = await getAreaPosts();
  const areaPosts = areaPostsResult.success ? areaPostsResult.posts : [];

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

        <RecommendedCircles recommendedCircles={recommendedCircles} />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-red-400" />
            <h2 className="text-xl font-semibold text-white">
              Posts from Your Area
            </h2>
          </div>
          {areaPosts.length > 0 ? (
            <TimelineFeed posts={areaPosts} />
          ) : (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No Posts in Your Area
              </h3>
              <p className="text-gray-400">
                Be the first to share something! Set a post to
                &quot;Public&quot; to appear here.
              </p>
            </div>
          )}
        </div>


        {/* <div className="space-y-4">
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
        </div> */}
      </div>
    </div>
  );
};

export default ExplorePage;
