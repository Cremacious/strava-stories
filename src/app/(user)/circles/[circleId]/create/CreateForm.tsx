'use client';

import CircleRoutineForm from './forms/CircleRoutineForm';
import CircleWorkoutForm from './forms/CircleWorkoutForm';
import CircleStoryForm from './forms/CircleStoryForm';
import CircleEventForm from './forms/CircleEventForm';
import CirclePollForm from './forms/CirclePollForm';

export default function CreateForm({ type, circleId }: { type?: string; circleId: string }) {
  switch (type) {
    case 'workout':
      return <CircleWorkoutForm />;
    case 'routine':
      return <CircleRoutineForm circleId={circleId} />;
    case 'story':
      return <CircleStoryForm />;
    case 'event':
      return <CircleEventForm />;
    case 'poll':
      return <CirclePollForm />;
    default:
      return <div className="text-white">Select a valid feature type.</div>;
  }
}
