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
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Target, Activity } from 'lucide-react';
import { WorkoutDisplayData } from '@/lib/types/workouts.type';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

 
  const availableYears = Array.from(
    new Set(workoutData.map((workout) => new Date(workout.date).getFullYear())),
  ).sort((a, b) => b - a); 

  if (workoutData.length === 0) {
    return (
      <Card className="darkBackground border-0">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Activity className="h-16 w-16 text-white mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No Workouts Yet
          </h3>
          <p className="text-white text-center mb-6 max-w-md">
            Start tracking your fitness journey! Add your first workout to see
            beautiful charts and graphs of your progress.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 text-sm text-white">
              <TrendingUp className="h-4 w-4 text-red-400" />
              <span>Track duration trends</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white">
              <Target className="h-4 w-4 text-red-400" />
              <span>Analyze activity types</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const activityCounts = workoutData.reduce(
    (acc, workout) => {
      acc[workout.type] = (acc[workout.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const activityTypes = Object.entries(activityCounts).map(([name, value]) => ({
    name,
    value,
    color: typeColors[name] || '#8884d8',
  }));


  const workoutsByDate = workoutData.reduce(
    (acc, workout) => {
      const dateKey = new Date(workout.date).toDateString();
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.entries(workoutsByDate)
    .map(([dateStr, count]) => ({
      date: new Date(dateStr),
      count,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .filter((item) => item.date.getFullYear() === selectedYear);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-white">Workouts Graph</h2>
      </div>
      <Card className="darkBackground border-0">
        <CardContent>
          <div className="flex justify-end mb-4">
            <Select
              value={selectedYear.toString()}
              onValueChange={(value) => setSelectedYear(parseInt(value))}
            >
              <SelectTrigger className="w-32 bg-[#2e2e2e] text-white border-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#272727] border-0 text-white">
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#ffffff"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => formatDate(value)}
              />
              <YAxis stroke="#ffffff" tick={{ fontSize: 12 }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length && label) {
                    return (
                      <div className="bg-[#272727] border border-[#374151] rounded p-2 text-white">
                        <p>{formatDate(label as string | Date)}</p>
                        <p>Workouts: {payload[0].value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="darkBackground border-0">
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
