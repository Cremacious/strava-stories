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
import { WorkoutData } from '@/lib/types/workouts.type';
import { workoutFormSchema } from '@/lib/validators/workout.validators';

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

  const [errors, setErrors] = useState<Record<string, string>>({});
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
    const result = workoutFormSchema.safeParse(newWorkout);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        title: fieldErrors.title?.[0] || '',
        description: '',
        type: fieldErrors.type?.[0] || '',
        duration: fieldErrors.duration?.[0] || '',
        distance: fieldErrors.distance?.[0] || '',
        calories: fieldErrors.calories?.[0] || '',
        date: fieldErrors.date?.[0] || '',
      });
      return;
    }

    setErrors({});

    const workoutData: WorkoutData = {
      title: result.data.title,
      description: result.data.description || undefined,
      type: result.data.type,
      duration: result.data.duration
        ? parseInt(result.data.duration) * 60
        : undefined,
      distance: result.data.distance
        ? parseFloat(result.data.distance) * 1000
        : undefined,
      calories: result.data.calories
        ? parseInt(result.data.calories)
        : undefined,
      date: new Date(result.data.date),
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
      setErrors({});
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsAddWorkoutOpen(open);
    if (!open) {
      clearError();
      setErrors({});
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
        <DialogContent className="darkBackground2 border-0 text-white max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Workout</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-red-500">
                Title *
              </label>
              <Input
                placeholder="Morning Run"
                value={newWorkout.title}
                onChange={(e) =>
                  setNewWorkout({ ...newWorkout, title: e.target.value })
                }
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-red-500">
                Workout Type *
              </label>
              <Select
                value={newWorkout.type}
                onValueChange={(value) =>
                  setNewWorkout({ ...newWorkout, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select workout type" />
                </SelectTrigger>
                <SelectContent className="bg-[#272727] border-0 text-white">
                  {workoutTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500 mt-1">{errors.type}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-red-500">
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
                />
                {errors.duration && (
                  <p className="text-sm text-red-500 mt-1">{errors.duration}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-red-500">
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
                />
                {errors.distance && (
                  <p className="text-sm text-red-500 mt-1">{errors.distance}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-red-500">
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
                />
                {errors.calories && (
                  <p className="text-sm text-red-500 mt-1">{errors.calories}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-red-500">
                  Date *
                </label>
                <Input
                  type="date"
                  value={newWorkout.date}
                  onChange={(e) =>
                    setNewWorkout({ ...newWorkout, date: e.target.value })
                  }
                />
                {errors.date && (
                  <p className="text-sm text-red-500 mt-1">{errors.date}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-red-500">
                Description (optional)
              </label>
              <Textarea
                placeholder="How did the workout feel?"
                value={newWorkout.description}
                onChange={(e) =>
                  setNewWorkout({ ...newWorkout, description: e.target.value })
                }
                rows={3}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex flex-row space-x-2 mt-4 justify-center">
              <Button
                variant="secondary"
                onClick={() => setIsAddWorkoutOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddWorkout}
                className="w-3/4"
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Workout'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddWorkoutButton;
