'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target } from 'lucide-react';
import { WorkoutDisplayData } from '@/lib/types/workouts.type';

const typeColors: Record<string, string> = {
  Running: '#ef4444',
  Cycling: '#f97316',
  'Strength Training': '#eab308',
  Yoga: '#22c55e',
  Swimming: '#3b82f6',
};

const WorkoutGraph = ({
  workoutData,
}: {
  workoutData: WorkoutDisplayData[];
}) => {
  const activityCounts = workoutData.reduce((acc, workout) => {
    acc[workout.type] = (acc[workout.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const activityTypes = Object.entries(activityCounts).map(([name, value]) => ({
    name,
    value,
    color: typeColors[name] || '#8884d8',
  }));

  return (
    <div className="flex flex-col gap-6">
      <Card className="darkBackground border-0">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-red-400" />
            Workout Duration Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={workoutData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#ffffff" tick={{ fontSize: 12 }} />
              <YAxis stroke="#ffffff" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#272727',
                  border: '1px solid #374151',
                  borderRadius: '6px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="duration"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="darkBackground border-0">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="w-5 h-5 mr-2 text-red-400" />
            Activity Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activityTypes}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {activityTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#272727',
                  border: '1px solid #374151',
                  borderRadius: '6px',
                  color: '#ffffff',
                }}
                labelStyle={{ color: '#ffffff' }}
                itemStyle={{ color: '#ffffff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
export default WorkoutGraph;
