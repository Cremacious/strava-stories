import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Target,
  Calendar,
  TrendingUp,
  Clock,
  MapPin,
  Zap,
  Activity,
} from 'lucide-react';

interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  period: string;
  type: string;
  targetValue: number;
  specificType: string | null;
  currentValue: number;
  createdAt: Date;
  updatedAt: Date;
}

interface UserGoalsProps {
  goals: Goal[];
}

const UserGoals = ({ goals }: UserGoalsProps) => {
  const getPeriodLabel = (period: string) => {
    const labels: Record<string, string> = {
      THIRTY_DAYS: '30 Days',
      SIXTY_DAYS: '60 Days',
      NINETY_DAYS: '90 Days',
      SIX_MONTHS: '6 Months',
      TWELVE_MONTHS: '12 Months',
    };
    return labels[period] || period;
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      TOTAL_WORKOUTS: 'Total Workouts',
      TOTAL_DURATION: 'Total Duration (minutes)',
      TOTAL_DISTANCE: 'Total Distance (km)',
      TOTAL_CALORIES: 'Total Calories',
      SPECIFIC_TYPE_WORKOUTS: 'Specific Type Workouts',
      AVERAGE_DISTANCE: 'Average Distance per Workout (km)',
      AVERAGE_DURATION: 'Average Duration per Workout (minutes)',
      WORKOUTS_PER_WEEK: 'Workouts per Week',
    };
    return labels[type] || type;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'TOTAL_WORKOUTS':
        return <Target className="h-5 w-5 text-red-400" />;
      case 'TOTAL_DURATION':
        return <Clock className="h-5 w-5 text-red-400" />;
      case 'TOTAL_DISTANCE':
        return <MapPin className="h-5 w-5 text-red-400" />;
      case 'TOTAL_CALORIES':
        return <Zap className="h-5 w-5 text-red-400" />;
      case 'SPECIFIC_TYPE_WORKOUTS':
        return <TrendingUp className="h-5 w-5 text-red-400" />;
      case 'AVERAGE_DISTANCE':
        return <MapPin className="h-5 w-5 text-red-400" />;
      case 'AVERAGE_DURATION':
        return <Clock className="h-5 w-5 text-red-400" />;
      case 'WORKOUTS_PER_WEEK':
        return <Calendar className="h-5 w-5 text-red-400" />;
      default:
        return <Target className="h-5 w-5 text-red-400" />;
    }
  };

  if (!goals || goals.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Your Goals</h2>
          <div className="text-sm text-gray-400">0 goals</div>
        </div>

        <div className="text-center py-12 px-6">
     

          <h3 className="text-xl font-semibold text-white mb-3">
            Ready to Set Your First Goal?
          </h3>

          <p className="text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
            Transform your fitness journey by setting achievable goals. Track
            your progress, stay motivated, and celebrate your achievements along
            the way.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <Activity className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-sm text-white font-medium">
                Total Workouts
              </div>
              <div className="text-xs text-gray-400">Count your sessions</div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <MapPin className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-sm text-white font-medium">
                Distance Goals
              </div>
              <div className="text-xs text-gray-400">Track your mileage</div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <Clock className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-sm text-white font-medium">Time Targets</div>
              <div className="text-xs text-gray-400">Build endurance</div>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Click &quot;Create Goal&quot; above to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Your Goals</h2>
        <div className="text-sm text-gray-400">
          {goals.length} goal{goals.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className="backgroundDark border-0 hover:bg-[#1a1a1a] transition-colors"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(goal.type)}
                  <CardTitle className="text-lg text-white">
                    {goal.title}
                  </CardTitle>
                </div>
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                  {getPeriodLabel(goal.period)}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Type:</span>
                <span className="text-sm text-white font-medium">
                  {getTypeLabel(goal.type)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Target:</span>
                <span className="text-sm text-white font-medium">
                  {goal.targetValue}{' '}
                  {goal.type.includes('DISTANCE')
                    ? 'km'
                    : goal.type.includes('DURATION')
                      ? 'min'
                      : goal.type.includes('CALORIES')
                        ? 'cal'
                        : ''}
                </span>
              </div>

              {goal.specificType && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Workout Type:</span>
                  <span className="text-sm text-white font-medium">
                    {goal.specificType}
                  </span>
                </div>
              )}

              {goal.description && (
                <div className="pt-2 border-t border-gray-700">
                  <p className="text-sm text-gray-300">{goal.description}</p>
                </div>
              )}

              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>
                    {goal.currentValue.toFixed(1)} /{' '}
                    {goal.targetValue.toFixed(1)} (
                    {Math.min(
                      (goal.currentValue / goal.targetValue) * 100,
                      100,
                    ).toFixed(0)}
                    %)
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((goal.currentValue / goal.targetValue) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="text-xs text-gray-500 pt-2">
                Created {new Date(goal.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserGoals;
