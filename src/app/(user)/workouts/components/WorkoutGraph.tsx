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

const activityTypes = [
  { name: 'Running', value: 35, color: '#ef4444' },
  { name: 'Cycling', value: 30, color: '#f97316' },
  { name: 'Strength Training', value: 20, color: '#eab308' },
  { name: 'Yoga', value: 10, color: '#22c55e' },
  { name: 'Swimming', value: 5, color: '#3b82f6' },
];

const workoutData = [
  {
    date: '2024-12-01',
    duration: 45,
    distance: 8.5,
    calories: 320,
    type: 'Running',
  },
  {
    date: '2024-12-02',
    duration: 60,
    distance: 0,
    calories: 280,
    type: 'Cycling',
  },
  {
    date: '2024-12-03',
    duration: 30,
    distance: 0,
    calories: 180,
    type: 'Strength Training',
  },
  {
    date: '2024-12-04',
    duration: 50,
    distance: 10.2,
    calories: 380,
    type: 'Running',
  },
  {
    date: '2024-12-05',
    duration: 45,
    distance: 0,
    calories: 250,
    type: 'Yoga',
  },
  {
    date: '2024-12-06',
    duration: 75,
    distance: 15.8,
    calories: 450,
    type: 'Cycling',
  },
  {
    date: '2024-12-07',
    duration: 40,
    distance: 6.2,
    calories: 290,
    type: 'Running',
  },
];

const WorkoutGraph = () => {
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
