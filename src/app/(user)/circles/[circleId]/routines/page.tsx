import { getCircleRoutines } from '@/actions/routine.actions';
import RoutinesDisplay from './RoutinesDisplay';

const CircleRoutinesPage = async ({
  params,
}: {
  params: Promise<{ circleId: string }>;
}) => {
  const { circleId } = await params;
  const routinesResult = await getCircleRoutines(circleId);
  const routines = routinesResult.success ? routinesResult.routines || [] : [];

  return (
    <div>
      <RoutinesDisplay circleId={circleId} routines={routines} />
    </div>
  );
};
export default CircleRoutinesPage;
