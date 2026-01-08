import { getCircleWorkouts } from '@/actions/workout.actions';
import WorkoutDisplay from './WorkoutDisplay';

const CircleWorkoutsPage = async ({
  params,
}: {
  params: Promise<{ circleId: string }>;
}) => {
  const { circleId } = await params;
  const workoutsResult = await getCircleWorkouts(circleId);
  const workouts = workoutsResult.success ? workoutsResult.workouts || [] : [];

  return (
    <div>
      <WorkoutDisplay circleId={circleId} workouts={workouts} />
    </div>
  );
};
export default CircleWorkoutsPage;
