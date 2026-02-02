import WorkoutGraph from './components/WorkoutGraph';
import AddWorkoutButton from './components/AddWorkoutButton';
import RecentWorkouts from './components/RecentWorkouts';
import {
  getWorkouts,
  getStravaWorkouts,
  getGoals,
} from '@/actions/workout.actions';
import SyncStrava from '@/components/shared/SyncStrava';
import { getUserProfile } from '@/actions/user.actions';
import CreateGoal from './components/CreateGoal';
import UserGoals from './components/UserGoals';

const WorkoutsPage = async () => {
  const result = await getWorkouts();
  const stravaResult = await getStravaWorkouts();
  const goalsResult = await getGoals();

  if (!result.success || !stravaResult.success || !goalsResult.success) {
    return <div>Error loading workouts</div>;
  }

  const { workouts } = result;
  const { stravaWorkouts } = stravaResult;
  const { goals = [] } = goalsResult;

  const userWorkouts = workouts || [];
  const userStravaWorkouts = stravaWorkouts || [];

  const allWorkouts = [
    ...userWorkouts.map((workout) => ({
      ...workout,
      isStrava: false,
      id: workout.id,
      date: workout.date,
      duration: workout.duration ?? 0,
      distance: workout.distance ?? 0,
      calories: workout.calories ?? 0,
      type: workout.type,
    })),
    ...userStravaWorkouts.map((workout) => ({
      ...workout,
      isStrava: true,
      id: workout.id.toString(),
      date: workout.startDate,
      duration: workout.movingTime ?? 0,
      distance: (workout.distance ?? 0) / 1000,
      calories: 0,
      type: workout.type,
    })),
  ];

  const sortedWorkouts = allWorkouts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const displayData = sortedWorkouts.map((workout) => ({
    ...workout,
    date: workout.date.toISOString(),
    duration: workout.duration,
    distance: workout.distance,
    calories: workout.calories,
  }));

  const { user } = await getUserProfile();
  const userId = user?.id;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <CreateGoal />
          <SyncStrava userId={userId} />
          <AddWorkoutButton />
        </div>
      </div>

      <UserGoals goals={goals} />

      <WorkoutGraph workoutData={displayData} />

      <RecentWorkouts workoutData={displayData} />
    </div>
  );
};

export default WorkoutsPage;
