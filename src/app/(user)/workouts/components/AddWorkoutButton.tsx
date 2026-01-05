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

  return (
    <>
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
                <label className="block text-sm font-medium mb-1">Date</label>
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
    </>
  );
};
export default AddWorkoutButton;
