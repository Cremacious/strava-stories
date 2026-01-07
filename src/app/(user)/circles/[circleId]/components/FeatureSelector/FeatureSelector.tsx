'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { circleDetailSample } from '@/lib/sample/circle-detail.sample';
import { Heart, MapPin, MessageSquare, Plus, Trophy } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AddWorkoutToCircleButton from '../AddWorkoutToCircleButton';
import WorkoutCard from './WorkoutCard';
import { useCircleStore } from '@/stores/useCircleStore';
import { useQuery } from '@tanstack/react-query';
import { CircleWorkout } from '@/lib/types/circles.type';

const FeatureSelector = ({ circleId }: { circleId: string }) => {
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

  const { fetchWorkouts } = useCircleStore();
  const {
    data: workouts = [],
    isLoading,
    error,
  } = useQuery<CircleWorkout[]>({
    queryKey: ['circleWorkouts', circleId],
    queryFn: async () => {
      const result = await fetchWorkouts(circleId);
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch workouts');
      }
      return result.workouts || [];
    },
    staleTime: 5 * 60 * 1000,
  });

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
          </div>
          {isLoading ? (
            <p className="text-white text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">
              Error: {error.message || 'Failed to load workouts'}
            </p>
          ) : (
            workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))
          )}
        </div>
      )}

      {/* Routines Tab */}
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {circle.routines.map((routine) => (
              <Card key={routine.id} className="bg-[#292929] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">{routine.name}</CardTitle>
                  <p className="text-gray-400 text-sm">
                    by {routine.createdBy}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-300 text-sm">{routine.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-400 text-sm font-bold">
                      {routine.difficulty}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {routine.downloads} downloads
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-red-500 hover:bg-red-600 h-8">
                      Download
                    </Button>
                    <button className="flex-1 hover:bg-gray-600 h-8 flex items-center justify-center rounded">
                      <Heart className="w-4 h-4" /> {routine.likes}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Adventure Stories Tab */}
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

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Challenges</h2>
          {circle.challenges.map((challenge) => (
            <Card key={challenge.id} className="bg-[#292929] border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white">
                      {challenge.title}
                    </CardTitle>
                    <p className="text-gray-400 text-sm mt-1">
                      {challenge.description}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-lg text-sm font-bold ${
                      challenge.isActive
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-600/20 text-gray-400'
                    }`}
                  >
                    {challenge.isActive ? 'Active' : 'Completed'}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-700 p-2 rounded">
                    <p className="text-gray-400 text-xs">Participants</p>
                    <p className="text-white font-bold">
                      {challenge.participants}
                    </p>
                  </div>
                  <div className="bg-gray-700 p-2 rounded">
                    <p className="text-gray-400 text-xs">Type</p>
                    <p className="text-white font-bold">{challenge.type}</p>
                  </div>
                  <div className="bg-red-500/20 p-2 rounded">
                    <p className="text-red-400 text-xs">XP Reward</p>
                    <p className="text-red-400 font-bold">
                      +{challenge.xpReward}
                    </p>
                  </div>
                </div>
                {challenge.winners && challenge.winners.length > 0 && (
                  <div className="bg-gray-700/50 p-3 rounded border border-red-500/30">
                    <p className="text-gray-400 text-sm mb-1 flex items-center">
                      <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                      Past Winners
                    </p>
                    <p className="text-white text-sm">
                      {challenge.winners.join(', ')}
                    </p>
                  </div>
                )}
                {challenge.isActive && (
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    Join Challenge
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Events Tab */}
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
          {circle.upcomingEvents.map((event) => (
            <Card key={event.id} className="bg-[#292929] border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white">{event.title}</CardTitle>
                    <p className="text-gray-400 text-sm mt-1">
                      {event.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-bold">
                      {event.type.replace('_', ' ').toUpperCase()}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-gray-700 p-2 rounded">
                    <p className="text-gray-400 text-xs">Date</p>
                    <p className="text-white font-bold text-sm">{event.date}</p>
                  </div>
                  <div className="bg-gray-700 p-2 rounded">
                    <p className="text-gray-400 text-xs">Time</p>
                    <p className="text-white font-bold text-sm">{event.time}</p>
                  </div>
                  <div className="bg-gray-700 p-2 rounded">
                    <p className="text-gray-400 text-xs">Location</p>
                    <p className="text-white font-bold text-sm">
                      {event.location}
                    </p>
                  </div>
                  <div className="bg-gray-700 p-2 rounded">
                    <p className="text-gray-400 text-xs">Attendees</p>
                    <p className="text-white font-bold text-sm">
                      {event.attendees}/{event.maxAttendees || '∞'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Organized by {event.organizer}
                </p>
                <Button className="w-full bg-red-500 hover:bg-red-600">
                  RSVP
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Polls Tab */}
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
          {circle.recentPolls.map((poll) => (
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
                  const percentage = (option.votes / poll.totalVotes) * 100;
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
