import EventDisplay from '../events/EventDisplay';
import { getCircleEvents } from '@/actions/event.actions';

const CircleEventsPage = async ({
  params,
}: {
  params: Promise<{ circleId: string }>;
}) => {
  const { circleId } = await params;
  const eventResults = await getCircleEvents(circleId);
  const events = eventResults.success ? eventResults.events : [];

  if (!events) {
    return <div>No events found.</div>;
  }

  return (
    <div>
      <EventDisplay circleId={circleId} events={events} />
    </div>
  );
};
export default CircleEventsPage;
