'use client';
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
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useWorkoutStore } from '@/stores/useWorkoutStore';
import { WorkoutData } from '@/actions/workout.actions';

const AddWorkoutButton = () => {
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

  const [isAddWorkoutOpen, setIsAddWorkoutOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    title: '',
    description: '',
    type: '',
    duration: '',
    distance: '',
    calories: '',
    date: '',
  });

  const { addWorkout, isLoading, error, clearError } = useWorkoutStore();

  const handleAddWorkout = async () => {
    if (!newWorkout.title || !newWorkout.type || !newWorkout.date) {
      alert('Please fill in title, type, and date');
      return;
    }

    const workoutData: WorkoutData = {
      title: newWorkout.title,
      description: newWorkout.description || undefined,
      type: newWorkout.type,
      duration: newWorkout.duration
        ? parseInt(newWorkout.duration) * 60
        : undefined, // convert minutes to seconds
      distance: newWorkout.distance
        ? parseFloat(newWorkout.distance) * 1000
        : undefined, // convert km to meters
      calories: newWorkout.calories ? parseInt(newWorkout.calories) : undefined,
      date: new Date(newWorkout.date),
    };

    await addWorkout(workoutData);

    if (!error) {
      setIsAddWorkoutOpen(false);
      setNewWorkout({
        title: '',
        description: '',
        type: '',
        duration: '',
        distance: '',
        calories: '',
        date: '',
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsAddWorkoutOpen(open);
    if (!open) {
      clearError();
    }
  };

  return (
    <>
      <Dialog open={isAddWorkoutOpen} onOpenChange={handleOpenChange}>
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
              <label className="block text-sm font-medium mb-1">Title *</label>
              <Input
                placeholder="Morning Run"
                value={newWorkout.title}
                onChange={(e) =>
                  setNewWorkout({ ...newWorkout, title: e.target.value })
                }
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Workout Type *
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
                <label className="block text-sm font-medium mb-1">Date *</label>
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
                Description (optional)
              </label>
              <Textarea
                placeholder="How did the workout feel?"
                value={newWorkout.description}
                onChange={(e) =>
                  setNewWorkout({ ...newWorkout, description: e.target.value })
                }
                className="bg-gray-700 border-gray-600"
                rows={3}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              onClick={handleAddWorkout}
              className="w-full bg-red-500 hover:bg-red-600"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Workout'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddWorkoutButton;
