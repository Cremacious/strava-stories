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
import { Target } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkoutStore } from '@/stores/useWorkoutStore';
import { goalFormSchema } from '@/lib/validators/workout.validators';

const CreateGoal = () => {
  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    period: '',
    type: '',
    targetValue: '',
    specificType: '',
  });

  const router = useRouter();
  const { createGoal, isLoading, error, clearError } = useWorkoutStore();

  const goalPeriods = [
    { value: 'THIRTY_DAYS', label: '30 Days' },
    { value: 'SIXTY_DAYS', label: '60 Days' },
    { value: 'NINETY_DAYS', label: '90 Days' },
    { value: 'SIX_MONTHS', label: '6 Months' },
    { value: 'TWELVE_MONTHS', label: '12 Months' },
  ];

  const goalTypes = [
    { value: 'TOTAL_WORKOUTS', label: 'Total Workouts' },
    { value: 'TOTAL_DURATION', label: 'Total Duration (minutes)' },
    { value: 'TOTAL_DISTANCE', label: 'Total Distance (km)' },
    { value: 'TOTAL_CALORIES', label: 'Total Calories' },
    { value: 'SPECIFIC_TYPE_WORKOUTS', label: 'Specific Type Workouts' },
    { value: 'AVERAGE_DISTANCE', label: 'Average Distance per Workout (km)' },
    {
      value: 'AVERAGE_DURATION',
      label: 'Average Duration per Workout (minutes)',
    },
    { value: 'WORKOUTS_PER_WEEK', label: 'Workouts per Week' },
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

  const handleCreateGoal = async () => {
    const result = goalFormSchema.safeParse(newGoal);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        title: fieldErrors.title?.[0] || '',
        description: '',
        period: fieldErrors.period?.[0] || '',
        type: fieldErrors.type?.[0] || '',
        targetValue: fieldErrors.targetValue?.[0] || '',
        specificType: fieldErrors.specificType?.[0] || '',
      });
      return;
    }

    setErrors({});

    const goalData = {
      title: result.data.title,
      description: result.data.description || undefined,
      period: result.data.period,
      type: result.data.type,
      targetValue: parseFloat(result.data.targetValue),
      specificType: result.data.specificType || undefined,
    };

    await createGoal(goalData);

    if (!error) {
      setIsCreateGoalOpen(false);
      router.refresh();
      setNewGoal({
        title: '',
        description: '',
        period: '',
        type: '',
        targetValue: '',
        specificType: '',
      });
      setErrors({});
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsCreateGoalOpen(open);
    if (!open) {
      clearError();
      setErrors({});
    }
  };

  return (
    <>
      <Dialog open={isCreateGoalOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button
            className=" w-full sm:w-auto"
            size="sm"
          >
            <Target className="w-4 h-4 mr-2" />
            Create Goal
          </Button>
        </DialogTrigger>
        <DialogContent className="darkBackground2 border-0 text-white max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-red-500">
                Title *
              </label>
              <Input
                placeholder="e.g., Run 100km in 30 days"
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, title: e.target.value })
                }
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-red-500">
                Period *
              </label>
              <Select
                value={newGoal.period}
                onValueChange={(value) =>
                  setNewGoal({ ...newGoal, period: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select goal period" />
                </SelectTrigger>
                <SelectContent className="bg-[#272727] border-0 text-white">
                  {goalPeriods.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.period && (
                <p className="text-sm text-red-500 mt-1">{errors.period}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-red-500">
                Goal Type *
              </label>
              <Select
                value={newGoal.type}
                onValueChange={(value) =>
                  setNewGoal({ ...newGoal, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select goal type" />
                </SelectTrigger>
                <SelectContent className="bg-[#272727] border-0 text-white">
                  {goalTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500 mt-1">{errors.type}</p>
              )}
            </div>
            {newGoal.type === 'SPECIFIC_TYPE_WORKOUTS' && (
              <div>
                <label className="block text-sm font-medium mb-1 text-red-500">
                  Specific Workout Type *
                </label>
                <Select
                  value={newGoal.specificType}
                  onValueChange={(value) =>
                    setNewGoal({ ...newGoal, specificType: value })
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
                {errors.specificType && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.specificType}
                  </p>
                )}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1 text-red-500">
                Target Value *
              </label>
              <Input
                type="number"
                step="0.1"
                placeholder="e.g., 100"
                value={newGoal.targetValue}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, targetValue: e.target.value })
                }
              />
              {errors.targetValue && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.targetValue}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-red-500">
                Description (optional)
              </label>
              <Textarea
                placeholder="Describe your goal..."
                value={newGoal.description}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, description: e.target.value })
                }
                rows={3}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex flex-row space-x-2 mt-4 justify-center">
              <Button
                variant="secondary"
                onClick={() => setIsCreateGoalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateGoal}
                className="w-3/4"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Goal'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateGoal;
