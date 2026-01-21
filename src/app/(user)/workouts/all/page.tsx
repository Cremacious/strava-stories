import { getWorkouts, getStravaWorkouts } from '@/actions/workout.actions';
import AllWorkoutsDisplay from './AllWorkoutsDisplay';

const AllWorkoutsPage = async () => {
  const result = await getWorkouts();
  const stravaResult = await getStravaWorkouts();

  if (!result.success || !stravaResult.success) {
    return <div>Error loading workouts</div>;
  }

  const { workouts } = result;
  const { stravaWorkouts } = stravaResult;

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

  return (
    <div>
      <AllWorkoutsDisplay workoutData={displayData} />
    </div>
  );
};
export default AllWorkoutsPage;
