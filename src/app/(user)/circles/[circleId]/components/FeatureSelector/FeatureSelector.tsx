'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { circleDetailSample } from '@/lib/sample/circle-detail.sample';
import { Calendar, Heart, MapPin, MessageSquare, Plus, Trophy, Vote } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AddWorkoutToCircleButton from '../AddWorkoutToCircleButton';
import WorkoutCard from '../../../../../../components/shared/cards/WorkoutCard';
import { Routine } from '@/lib/types/routine.type';
import { CircleWorkout } from '@/lib/types/circles.type';
import RoutineCard from './RoutineCard';
import { Challenge } from '@/lib/types/challenge.type';
import ChallengeCard from './ChallengeCard';
import { Poll } from '@/lib/types/poll.type';
import { Event } from '@/lib/types/event.type';
import EventCard from './EventCard';
import Link from 'next/link';

const FeatureSelector = ({
  circleId,
  routines,
  workouts,
  challenges,
  polls,
  events,
}: {
  circleId: string;
  routines: Routine[];
  workouts: CircleWorkout[];
  challenges: Challenge[];
  polls: Poll[];
  events: Event[];
}) => {
  const [activeTab, setActiveTab] = useState<
    'feed' | 'routines' | 'stories' | 'challenges' | 'events' | 'polls'
  >('feed');

  const router = useRouter();

  const tabs = [
    { id: 'feed', label: 'Workouts' },
    { id: 'routines', label: 'Routines' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'events', label: 'Events' },
    { id: 'polls', label: 'Polls' },
  ];

  return (
    <div className="cardBackground md:p-2 rounded-2xl">
      <div className="flex flex-wrap gap-2 mb-6 darkBackground p-3 rounded-lg border border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium hover:cursor-pointer ${
              activeTab === tab.id
                ? 'bg-red-600 text-white'
                : 'darkBackground2 border-red-500 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'feed' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Recent Workout Logs
            </h2>
            <AddWorkoutToCircleButton circleId={circleId} />
            <Button asChild>
              <Link href={`/circles/${circleId}/workouts`}>View All</Link>
            </Button>
          </div>
          {workouts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-red-500/80 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No workouts yet
              </h3>
              <p className="text-gray-300 max-w-md">
                Start logging your workouts to track your progress and inspire
                others in the community.
              </p>
            </div>
          ) : (
            workouts.map((workout) => (
              <WorkoutCard
                circleId={circleId}
                key={workout.id}
                workout={workout}
              />
            ))
          )}
        </div>
      )}

      {activeTab === 'routines' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Workout Routines Library
            </h2>
            <Button
   
              onClick={() =>
                router.push(`/circles/${circleId}/create?type=routine`)
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Routine
            </Button>
            <Button

              onClick={() => router.push(`/circles/${circleId}/routines`)}
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routines.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-red-500/80 rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No routines yet
                </h3>
                <p className="text-gray-300 max-w-md">
                  Share your favorite workout routines with the community to
                  help others achieve their fitness goals.
                </p>
              </div>
            ) : (
              routines.map((routine) => (
                <RoutineCard
                  key={routine.id}
                  routine={routine}
                  circleId={circleId}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* {activeTab === 'stories' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Adventure Stories</h2>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() =>
                router.push(`/circles/${circleId}/create?type=story`)
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Share Story
            </Button>
          </div>
          {circle.stories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No adventure stories yet
              </h3>
              <p className="text-gray-400 max-w-md">
                Share your outdoor adventures, running routes, and fitness
                journeys to inspire fellow athletes.
              </p>
            </div>
          ) : (
            circle.stories.map((story) => (
              <Card
                key={story.id}
                className="bg-[#292929] border-0 overflow-hidden"
              >
                <div className="bg-gray-700 h-48 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Story Image</span>
                </div>
                <CardHeader>
                  <CardTitle className="text-white">{story.title}</CardTitle>
                  <div className="flex items-center justify-between text-sm text-gray-400 mt-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{story.location}</span>
                    </div>
                    {story.distance && <span>{story.distance}km</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-300">{story.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>by {story.memberName}</span>
                    <span>{story.timestamp}</span>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400">
                      <Heart className="w-4 h-4" />
                      <span>{story.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400">
                      <MessageSquare className="w-4 h-4" />
                      <span>{story.comments}</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )} */}

      {activeTab === 'challenges' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Challenges</h2>
          <Button
            onClick={() =>
              router.push(`/circles/${circleId}/create?type=challenge`)
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Challenge
          </Button>
          <Button
            onClick={() => router.push(`/circles/${circleId}/challenges`)}
          >
            View All
          </Button>
          {challenges.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-red-500/80 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No challenges yet
              </h3>
              <p className="text-gray-300 max-w-md">
                Create fitness challenges to motivate members and track
                collective progress toward shared goals.
              </p>
            </div>
          ) : (
            challenges.map((challenge) => (
              <ChallengeCard
                circleId={circleId}
                key={challenge.id}
                challenge={challenge}
              />
            ))
          )}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
            <Button

              onClick={() =>
                router.push(`/circles/${circleId}/create?type=event`)
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
            <Button
    
              onClick={() => router.push(`/circles/${circleId}/events`)}
            >
              View All
            </Button>
          </div>
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-red-500/80 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No events yet
              </h3>
              <p className="text-gray-300 max-w-md">
                Organize group workouts, races, or social gatherings to bring
                your fitness community together.
              </p>
            </div>
          ) : (
            events.map((event) => (
              <EventCard circleId={circleId} key={event.id} event={event} />
            ))
          )}
        </div>
      )}

      {activeTab === 'polls' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Circle Polls</h2>
            <Button
     
              onClick={() =>
                router.push(`/circles/${circleId}/create?type=poll`)
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Poll
            </Button>
          </div>
          {polls.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-red-500/80 rounded-full flex items-center justify-center mb-4">
              <Vote className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No polls yet
              </h3>
              <p className="text-gray-300 max-w-md">
                Create polls to gather opinions from your fitness community and
                make group decisions together.
              </p>
            </div>
          ) : (
            polls.map((poll) => (
              <Card key={poll.id} className="bg-[#292929] border-0">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white">
                        {poll.question}
                      </CardTitle>
                      <p className="text-gray-400 text-sm mt-1">
                        by {poll.createdBy}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {poll.options.map((option, index) => {
                    const percentage =
                      poll.totalVotes > 0
                        ? (option.votes / poll.totalVotes) * 100
                        : 0;
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-sm">
                            {option.text}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {option.votes} votes
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                  <p className="text-gray-400 text-xs mt-4">
                    Total votes: {poll.totalVotes} | Ends: {poll.endsAt}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default FeatureSelector;
