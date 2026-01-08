'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { circleDetailSample } from '@/lib/sample/circle-detail.sample';
import { Heart, MapPin, MessageSquare, Plus } from 'lucide-react';
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
  const circle = circleDetailSample;
  const router = useRouter();

  const tabs = [
    { id: 'feed', label: 'Workout Feed', icon: '📊' },
    { id: 'routines', label: 'Routines', icon: '📋' },
    { id: 'stories', label: 'Adventures', icon: '🗻' },
    { id: 'challenges', label: 'Challenges', icon: '🏆' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'polls', label: 'Polls', icon: '🗳️' },
  ];

  return (
    <div className="cardBackground md:p-4 rounded-2xl">
      <div className="flex flex-wrap gap-2 mb-6 darkBackground p-3 rounded-lg border border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
              activeTab === tab.id
                ? 'bg-red-500 text-white'
                : 'darkBackground2 border-red-500 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
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
          {workouts.map((workout) => (
            <WorkoutCard
              circleId={circleId}
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}

      {activeTab === 'routines' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Workout Routines Library
            </h2>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() =>
                router.push(`/circles/${circleId}/create?type=routine`)
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Routine
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() => router.push(`/circles/${circleId}/routines`)}
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                circleId={circleId}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'stories' && (
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
          {circle.stories.map((story) => (
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
          ))}
        </div>
      )}

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
            onClick={() =>
              router.push(`/circles/${circleId}/challenges`)
            }
          >
            View All
          </Button>
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() =>
                router.push(`/circles/${circleId}/create?type=event`)
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {activeTab === 'polls' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Circle Polls</h2>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() =>
                router.push(`/circles/${circleId}/create?type=poll`)
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Poll
            </Button>
          </div>
          {polls.map((poll) => (
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
          ))}
        </div>
      )}
    </div>
  );
};
export default FeatureSelector;
