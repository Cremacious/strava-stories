'use client';

import { useState } from 'react';
import {
  Plus,
  Activity,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  Zap,
  Target,
  RefreshCw,
} from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

const activityTypes = [
  { name: 'Running', value: 35, color: '#ef4444' },
  { name: 'Cycling', value: 30, color: '#f97316' },
  { name: 'Strength Training', value: 20, color: '#eab308' },
  { name: 'Yoga', value: 10, color: '#22c55e' },
  { name: 'Swimming', value: 5, color: '#3b82f6' },
];

const workoutTypes = [
  'Running',
  'Cycling',
  'Strength Training',
  'Yoga',
  'Swimming',
  'Hiking',
  'CrossFit',
  'Pilates',
  'Boxing',
  'Other',
];

const WorkoutsPage = () => {
  const [isAddWorkoutOpen, setIsAddWorkoutOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    type: '',
    duration: '',
    distance: '',
    calories: '',
    date: '',
    notes: '',
    location: '',
  });

  const handleAddWorkout = () => {
    console.log('Adding workout:', newWorkout);
    setIsAddWorkoutOpen(false);
    setNewWorkout({
      type: '',
      duration: '',
      distance: '',
      calories: '',
      date: '',
      notes: '',
      location: '',
    });
  };

  const handleStravaSync = () => {
    console.log('Syncing with Strava...');
  };

  const totalWorkouts = workoutData.length;
  const totalDuration = workoutData.reduce(
    (sum, workout) => sum + workout.duration,
    0
  );
  const totalDistance = workoutData.reduce(
    (sum, workout) => sum + workout.distance,
    0
  );
  const totalCalories = workoutData.reduce(
    (sum, workout) => sum + workout.calories,
    0
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Workouts
          </h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Track your fitness journey and sync with Strava
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            onClick={handleStravaSync}
            variant="outline"
            size="sm"
            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />

            <span className="">Sync With Strava</span>
          </Button>
          <Dialog open={isAddWorkoutOpen} onOpenChange={setIsAddWorkoutOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Workout
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Workout</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Workout Type
                  </label>
                  <Select
                    value={newWorkout.type}
                    onValueChange={(value) =>
                      setNewWorkout({ ...newWorkout, type: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select workout type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {workoutTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Duration (min)
                    </label>
                    <Input
                      type="number"
                      placeholder="45"
                      value={newWorkout.duration}
                      onChange={(e) =>
                        setNewWorkout({
                          ...newWorkout,
                          duration: e.target.value,
                        })
                      }
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Distance (km)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="8.5"
                      value={newWorkout.distance}
                      onChange={(e) =>
                        setNewWorkout({
                          ...newWorkout,
                          distance: e.target.value,
                        })
                      }
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Calories
                    </label>
                    <Input
                      type="number"
                      placeholder="320"
                      value={newWorkout.calories}
                      onChange={(e) =>
                        setNewWorkout({
                          ...newWorkout,
                          calories: e.target.value,
                        })
                      }
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={newWorkout.date}
                      onChange={(e) =>
                        setNewWorkout({ ...newWorkout, date: e.target.value })
                      }
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location (optional)
                  </label>
                  <Input
                    placeholder="Gym, Park, Home..."
                    value={newWorkout.location}
                    onChange={(e) =>
                      setNewWorkout({ ...newWorkout, location: e.target.value })
                    }
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Notes (optional)
                  </label>
                  <Textarea
                    placeholder="How did the workout feel?"
                    value={newWorkout.notes}
                    onChange={(e) =>
                      setNewWorkout({ ...newWorkout, notes: e.target.value })
                    }
                    className="bg-gray-700 border-gray-600"
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleAddWorkout}
                  className="w-full bg-red-500 hover:bg-red-600"
                >
                  Add Workout
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Workouts
            </CardTitle>
            <Activity className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalWorkouts}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Duration
            </CardTitle>
            <Clock className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {totalDuration} min
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Distance
            </CardTitle>
            <MapPin className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {totalDistance.toFixed(1)} km
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Calories
            </CardTitle>
            <Zap className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalCalories}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="bg-gray-800 border-gray-700">
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
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
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

        <Card className="bg-gray-800 border-gray-700">
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
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '6px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-red-400" />
            Recent Workouts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workoutData
              .slice(-5)
              .reverse()
              .map((workout, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-700 rounded-lg gap-3"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shrink-0">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white truncate">
                        {workout.type}
                      </p>
                      <p className="text-sm text-gray-400">{workout.date}</p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col sm:items-end gap-2 sm:gap-0">
                    <p className="text-white font-medium">
                      {workout.duration} min
                    </p>
                    <p className="text-sm text-gray-400">
                      {workout.distance > 0 ? `${workout.distance} km • ` : ''}
                      {workout.calories} cal
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutsPage;
