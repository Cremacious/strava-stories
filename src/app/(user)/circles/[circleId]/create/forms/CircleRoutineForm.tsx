'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  routineFormSchema,
  type RoutineFormInput,
} from '@/lib/validators/routine.validators';
import { z } from 'zod';
import { useCircleStore } from '@/stores/useCircleStore';

type FormInput = z.input<typeof routineFormSchema>;

interface CircleRoutineFormProps {
  circleId: string;
  onSuccess?: () => void;
}

export default function CircleRoutineForm({
  circleId,
  onSuccess,
}: CircleRoutineFormProps) {
  const { addRoutineToCircle } = useCircleStore();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [warmUps, setWarmUps] = useState<
    Array<{ activity: string; duration: number; instructions: string }>
  >([]);
  const [exercises, setExercises] = useState<
    Array<{
      name: string;
      sets: number;
      reps: number;
      rest: number;
      instructions: string;
      equipment: string;
    }>
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>({
    resolver: zodResolver(routineFormSchema),
    defaultValues: {
      title: '',
      description: '',
      difficulty: 'BEGINNER',
      estimatedDuration: '',
      requiredEquipment: '',
      category: '',
      fitnessGoals: '',
      tags: '',
      warmUps: [],
      exercises: [],
    },
  });

  const addWarmUp = () =>
    setWarmUps([...warmUps, { activity: '', duration: 0, instructions: '' }]);
  const removeWarmUp = (index: number) =>
    setWarmUps(warmUps.filter((_, i) => i !== index));
  const updateWarmUp = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...warmUps];
    updated[index] = { ...updated[index], [field]: value };
    setWarmUps(updated);
  };

  const addExercise = () =>
    setExercises([
      ...exercises,
      { name: '', sets: 0, reps: 0, rest: 0, instructions: '', equipment: '' },
    ]);
  const removeExercise = (index: number) =>
    setExercises(exercises.filter((_, i) => i !== index));
  const updateExercise = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const onSubmit = async (data: RoutineFormInput) => {
    setIsLoading(true);
    setSubmitError(null);
    const transformedData = {
      ...data,
      estimatedDuration: data.estimatedDuration
        ? parseInt(data.estimatedDuration, 10) || undefined
        : undefined,
      fitnessGoals: data.fitnessGoals
        ? data.fitnessGoals
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined,
      tags: data.tags
        ? data.tags
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined,
      warmUps,
      exercises,
    };

    try {
      const result = await addRoutineToCircle(transformedData, circleId);
      if (!result.success) {
        setSubmitError(result.error || 'Failed to add routine');
        return;
      }

      reset();
      setWarmUps([]);
      setExercises([]);
      onSuccess?.();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'An error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg">
      <h1 className="text-2xl font-bold text-white mb-6">
        Create Workout Routine
      </h1>

      {submitError && (
        <div className="mb-4 p-4 bg-red-900 border border-red-700 text-red-100 rounded">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2 font-semibold">
            Title *
          </label>
          <Input
            {...register('title')}
            placeholder="Routine Title"
            className="bg-gray-700 border-gray-600 text-white"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-semibold">
            Description
          </label>
          <Textarea
            {...register('description')}
            placeholder="Describe your routine"
            className="bg-gray-700 border-gray-600 text-white"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-semibold">
            Difficulty
          </label>
          <select
            {...register('difficulty')}
            className="w-full bg-gray-700 border-gray-600 text-white rounded p-2"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-semibold">
            Estimated Duration (minutes)
          </label>
          <Input
            {...register('estimatedDuration')}
            type="number"
            placeholder="e.g., 30"
            className="bg-gray-700 border-gray-600 text-white"
            min="0"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-semibold">
            Required Equipment
          </label>
          <Input
            {...register('requiredEquipment')}
            placeholder="e.g., Dumbbells, Mat"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-semibold">
            Category
          </label>
          <Input
            {...register('category')}
            placeholder="e.g., Strength, Cardio"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-semibold">
            Fitness Goals (comma-separated)
          </label>
          <Input
            {...register('fitnessGoals')}
            placeholder="e.g., Build muscle, Lose weight"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-semibold">
            Tags (comma-separated)
          </label>
          <Input
            {...register('tags')}
            placeholder="e.g., HIIT, Core, Upper Body"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-semibold">
            Warm-Up Steps (Optional)
          </label>
          {warmUps.map((warmUp, index) => (
            <div
              key={index}
              className="border border-gray-700 p-4 mb-2 rounded bg-gray-800"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Input
                  placeholder="Activity (e.g., Jumping Jacks)"
                  value={warmUp.activity}
                  onChange={(e) =>
                    updateWarmUp(index, 'activity', e.target.value)
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={warmUp.duration}
                  onChange={(e) =>
                    updateWarmUp(index, 'duration', Number(e.target.value))
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                  min="0"
                />
                <Textarea
                  placeholder="Instructions"
                  value={warmUp.instructions}
                  onChange={(e) =>
                    updateWarmUp(index, 'instructions', e.target.value)
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={2}
                />
              </div>
              <Button
                type="button"
                onClick={() => removeWarmUp(index)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white"
              >
                Remove Warm-Up
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addWarmUp}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white"
          >
            Add Warm-Up Step
          </Button>
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-semibold">
            Main Exercises (Optional)
          </label>
          {exercises.map((exercise, index) => (
            <div
              key={index}
              className="border border-gray-700 p-4 mb-2 rounded bg-gray-800"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Input
                  placeholder="Exercise Name (e.g., Push-ups)"
                  value={exercise.name}
                  onChange={(e) =>
                    updateExercise(index, 'name', e.target.value)
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Input
                  type="number"
                  placeholder="Sets"
                  value={exercise.sets}
                  onChange={(e) =>
                    updateExercise(index, 'sets', Number(e.target.value))
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                  min="0"
                />
                <Input
                  type="number"
                  placeholder="Reps per Set"
                  value={exercise.reps}
                  onChange={(e) =>
                    updateExercise(index, 'reps', Number(e.target.value))
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                  min="0"
                />
                <Input
                  type="number"
                  placeholder="Rest (seconds)"
                  value={exercise.rest}
                  onChange={(e) =>
                    updateExercise(index, 'rest', Number(e.target.value))
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                  min="0"
                />
                <Textarea
                  placeholder="Instructions"
                  value={exercise.instructions}
                  onChange={(e) =>
                    updateExercise(index, 'instructions', e.target.value)
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={2}
                />
                <Input
                  placeholder="Equipment (e.g., Dumbbells)"
                  value={exercise.equipment}
                  onChange={(e) =>
                    updateExercise(index, 'equipment', e.target.value)
                  }
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <Button
                type="button"
                onClick={() => removeExercise(index)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white"
              >
                Remove Exercise
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addExercise}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white"
          >
            Add Exercise
          </Button>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-900 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Routine...' : 'Create Routine'}
        </Button>
      </form>
    </div>
  );
}
