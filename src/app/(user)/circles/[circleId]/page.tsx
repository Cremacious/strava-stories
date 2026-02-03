import { Users } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import FeatureSelector from './components/FeatureSelector/FeatureSelector';
// import TopMembers from './components/TopMembers';
import CircleTimelineFeed from './components/CircleTimelineFeed';
import { getCircleById } from '@/actions/circle.actions';
import { getCircleRoutines } from '@/actions/routine.actions';
import { getCircleWorkouts } from '@/actions/workout.actions';
import { getCircleChallenges } from '@/actions/challenge.actions';
import { getCirclePolls } from '@/actions/poll.actions';
import { getCircleEvents } from '@/actions/event.actions';
import { getUserProfile } from '@/actions/user.actions';
import { getCirclePosts } from '@/actions/post.actions';
import JoinCircleButton from './components/JoinCircleButton';
import PendingCircleRequests from './components/PendingCircleRequests';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CirclePage = async ({
  params,
}: {
  params: Promise<{ circleId: string }>;
}) => {
  const { circleId } = await params;
  const { user } = await getUserProfile();
  const result = await getCircleById(circleId);

  if (!result.success) {
    return (
      <div className="p-4 text-white">
        <h1 className="text-2xl font-bold mb-4">Circle Not Found</h1>
        <p>The circle you are looking for does not exist or is unavailable.</p>
      </div>
    );
  }

  const circle = result.circle!;
  const isOwner = circle.ownerId === user?.id;
  const routinesResult = await getCircleRoutines(circleId);
  const routines = routinesResult.success ? routinesResult.routines || [] : [];
  const workoutsResult = await getCircleWorkouts(circleId);
  const workouts = workoutsResult.success ? workoutsResult.workouts || [] : [];
  const challengesResult = await getCircleChallenges(circleId);
  const challenges = challengesResult.success
    ? challengesResult.challenges || []
    : [];
  const pollsResult = await getCirclePolls(circleId);
  const polls = pollsResult.success ? pollsResult.polls || [] : [];
  const eventsResult = await getCircleEvents(circleId);
  const events = eventsResult.success ? eventsResult.events || [] : [];
  const postsResult = await getCirclePosts(circleId);
  const posts = postsResult.success ? postsResult.posts || [] : [];

  return (
    <div className=" text-white min-h-full p-4">
      <div className="bg-linear-to-r from-red-600 to-red-700 rounded-lg p-6 mb-6 text-white">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
            <Users className="w-12 h-12 text-red-400" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              {circle.name}
            </h1>
            <p className="text-red-100 mb-3">{circle.description}</p>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              <div>
                <p className="text-sm text-red-100">Members</p>
                <p className="text-xl font-bold">{circle.memberCount}</p>
              </div>
              {/* <div>
                <p className="text-sm text-red-100">Total Workouts</p>
                <p className="text-xl font-bold">
                  {circle.stats.totalWorkouts}
                </p>
              </div> */}
              {/* <div>
                <p className="text-sm text-red-100">Category</p>
                <p className="text-xl font-bold">{circle.category}</p>
              </div> */}
            </div>
          </div>

          {isOwner ? (
            <Link href={`/circles/${circleId}/settings`}>
            <Button variant={'outline'}>Settings</Button>
          </Link>
          ) : (
            <JoinCircleButton
              isMember={circle.isMember}
              membershipStatus={circle.membershipStatus}
              circleId={circleId}
            />
          )}
        </div>
      </div>

      <PendingCircleRequests circleId={circleId} isOwner={isOwner} />

      {circle.isMember ? (
        <div className="space-y-8">
          <FeatureSelector
            circleId={circleId}
            workouts={workouts}
            routines={routines}
            challenges={challenges}
            polls={polls}
            events={events}
          />

          <CircleTimelineFeed
            initialPosts={posts}
            userImage={user?.avatarUrl}
            circleId={circleId}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-96">
          <div className="cardBackground border border-red-500/20 rounded-xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Join This Circle
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Become a member to access exclusive workouts, challenges, and
              connect with fellow fitness enthusiasts in this community.
            </p>
            <div className="text-sm text-gray-400">
              Click the &quot;Join Circle&quot; button above to request
              membership
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CirclePage;
