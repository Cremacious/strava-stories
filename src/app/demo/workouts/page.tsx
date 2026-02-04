import WorkoutGraph from '../../(user)/workouts/components/WorkoutGraph';
import AddWorkoutButton from '../../(user)/workouts/components/AddWorkoutButton';
import RecentWorkouts from '../../(user)/workouts/components/RecentWorkouts';
import SyncStrava from '@/components/shared/SyncStrava';
import CreateGoal from '../../(user)/workouts/components/CreateGoal';
import UserGoals from '../../(user)/workouts/components/UserGoals';

const mockWorkouts = [
  {
    id: 'demo-workout-1',
    isStrava: false,
    date: '2024-02-03T10:00:00.000Z',
    duration: 3600, 
    distance: 10.5, 
    calories: 650,
    type: 'Running',
  },
  {
    id: 'demo-workout-2',
    isStrava: true,
    date: '2024-02-02T14:30:00.000Z',
    duration: 2700, 
    distance: 15.2,
    calories: 0, 
    type: 'Cycling',
  },
  {
    id: 'demo-workout-3',
    isStrava: false,
    date: '2024-02-01T08:15:00.000Z',
    duration: 2400, 
    distance: 0, 
    calories: 200,
    type: 'Yoga',
  },
  {
    id: 'demo-workout-4',
    isStrava: true,
    date: '2024-01-31T16:45:00.000Z',
    duration: 1800, 
    distance: 8.3,
    calories: 0,
    type: 'Running',
  },
  {
    id: 'demo-workout-5',
    isStrava: false,
    date: '2024-01-30T12:00:00.000Z',
    duration: 3000, 
    distance: 12.1,
    calories: 720,
    type: 'Swimming',
  },
];


const mockGoals = [
  {
    id: 'demo-goal-1',
    userId: 'demo-user-123',
    title: 'Monthly Running Distance',
    description: 'Run 200km this month',
    period: 'THIRTY_DAYS',
    type: 'TOTAL_DISTANCE',
    targetValue: 200,
    specificType: 'Running',
    currentValue: 145.5, 
    createdAt: new Date('2024-01-15T00:00:00.000Z'),
    updatedAt: new Date('2024-01-15T00:00:00.000Z'),
  },
  {
    id: 'demo-goal-2',
    userId: 'demo-user-123',
    title: 'Weekly Workout Frequency',
    description: 'Complete 5 workouts per week',
    period: 'THIRTY_DAYS',
    type: 'WORKOUTS_PER_WEEK',
    targetValue: 5,
    specificType: null,
    currentValue: 3, 
    createdAt: new Date('2024-01-10T00:00:00.000Z'),
    updatedAt: new Date('2024-01-10T00:00:00.000Z'),
  },
];

const DemoWorkoutsPage = () => {

  const sortedWorkouts = mockWorkouts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );


  const displayData = sortedWorkouts.map((workout) => ({
    ...workout,
    date: workout.date,
    duration: workout.duration,
    distance: workout.distance,
    calories: workout.calories,
  }));

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <CreateGoal />
          <SyncStrava userId="demo-user-123" />
          <AddWorkoutButton />
        </div>
      </div>

      <UserGoals goals={mockGoals} />

      <WorkoutGraph workoutData={displayData} />

      <RecentWorkouts workoutData={displayData} />
    </div>
  );
};

export default DemoWorkoutsPage;
