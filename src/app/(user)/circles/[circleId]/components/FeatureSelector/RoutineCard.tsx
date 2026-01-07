import { Routine } from '@/lib/types/routine.type';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const RoutineCard = ({
  routine,
  circleId,
}: {
  routine: Routine;
  circleId: string;
}) => {
  return (
    <Link href={`/circles/${circleId}/routines/${routine.id}`}>
      <Card key={routine.id} className="bg-[#292929] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">{routine.title}</CardTitle>
          <p className="text-gray-400 text-sm">by {routine.createdBy.name}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-300 text-sm">{routine.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-red-400 text-sm font-bold">
              {routine.difficulty}
            </span>
            <span className="text-gray-400 text-sm">
              {routine.steps.length} steps
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
export default RoutineCard;
