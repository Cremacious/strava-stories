import { getRoutineById } from '@/actions/routine.actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CircleRoutinePage = async ({
  params,
}: {
  params: Promise<{ routineId: string }>;
}) => {
  const { routineId } = await params;
  const result = await getRoutineById(routineId);

  if (!result.success || !result.routine) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-500">{result.error || 'Routine not found'}</p>
        </div>
      </div>
    );
  }

  const { routine } = result;
  const warmUps = routine.steps.filter((step) => step.type === 'WARM_UP');
  const exercises = routine.steps.filter((step) => step.type === 'EXERCISE');

  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-linear-to-r from-red-600 to-red-700 rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-2">{routine.title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <span>by {routine.createdBy.name || 'Unknown'}</span>
            <Badge variant="secondary">{routine.difficulty}</Badge>
            {routine.estimatedDuration && (
              <span>{Math.round(routine.estimatedDuration / 60)} minutes</span>
            )}
          </div>
        </div>

        {routine.description && (
          <Card className="bg-[#3f3f3f] border-0">
            <CardHeader>
              <CardTitle className="text-white text-lg">Description:</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-100">{routine.description}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1  gap-6">
          <Card className="bg-[#3f3f3f] border-0">
            <CardContent className="space-y-4">
              {routine.requiredEquipment && (
                <div>
                  <h4 className="font-bold text-lg text-white">Equipment:</h4>
                  <p className="text-gray-100">{routine.requiredEquipment}</p>
                </div>
              )}
              {routine.category && (
                <div>
                  <h4 className="font-bold text-white text-lg">Category:</h4>
                  <p className="text-gray-100">{routine.category}</p>
                </div>
              )}
              {routine.fitnessGoals.length > 0 && (
                <div>
                  <h4 className="font-bold text-lg text-white">
                    Fitness Goals:
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {routine.fitnessGoals.map((goal, index) => (
                      <div key={index} className="text-gray-100">
                        {goal}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Steps</span>
                <span className="text-white">{routine.steps.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Likes</span>
                <span className="text-white">{routine.likesCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Rating</span>
                <span className="text-white">
                  {routine.averageRating.toFixed(1)}/5
                </span>
              </div>
            </CardContent>
          </Card> */}
        </div>

        {warmUps.length > 0 && (
          <Card className="bg-[#3f3f3f] border-0">
            <CardHeader>
              <CardTitle className="text-white text-lg">Warm-Up</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {warmUps.map((step, index) => (
                  <div
                    key={step.id}
                    className="border-l-4 border-red-500 pl-4"
                  >
                    <h4 className="font-semibold text-gray-100">
                      {index + 1}. {step.name}
                    </h4>
                    {step.duration && (
                      <p className="text-gray-100">
                        Duration: {Math.round(step.duration / 60)} minutes
                      </p>
                    )}
                    {step.instructions && (
                      <p className="text-gray-100 mt-2">{step.instructions}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {exercises.length > 0 && (
          <Card className="bg-[#3f3f3f] border-0">
            <CardHeader>
              <CardTitle className="text-white text-lg">Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {exercises.map((step, index) => (
                  <div key={step.id} className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-white text-lg">
                      {index + 1}. {step.name}
                    </h4>
                    <div className="flex gap-4 text-gray-100 mt-1">
                      {step.sets && <span>{step.sets} sets</span>}
                      {step.reps && <span>{step.reps} reps</span>}
                      {step.rest && <span>{step.rest}s rest</span>}
                    </div>
                    {step.equipment && (
                      <p className="text-gray-100 mt-1">
                        Equipment: {step.equipment}
                      </p>
                    )}
                    {step.instructions && (
                      <p className="text-gray-100 mt-2">{step.instructions}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CircleRoutinePage;
