'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  challengeFormSchema,
  type ChallengeFormInput,
} from '@/lib/validators/challenge.validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useCircleStore } from '@/stores/useCircleStore';
import { CreateChallengeData } from '@/lib/types/challenge.type';

type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

interface CircleChallengeFormProps {
  circleId: string;
  onSuccess?: () => void;
}

const CircleChallengeForm = ({
  circleId,
  onSuccess,
}: CircleChallengeFormProps) => {
  const { isLoading, error, addChallengeToCircle, clearError } =
    useCircleStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ChallengeFormInput>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: {
      title: '',
      description: '',
      goal: '',
      rules: '',
      category: '',
      tags: '',
      difficulty: 'BEGINNER',
    },
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const onSubmit = async (data: ChallengeFormInput) => {
    clearError();
    const transformedData: CreateChallengeData = {
      ...data,
      endDate: data.endDate!,
      tags: data.tags
        ? data.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
    };

    try {
      const result = await addChallengeToCircle(transformedData, circleId);
      if (result.success) {
        reset();
        onSuccess?.();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Create Challenge</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Challenge Title *
            </Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Enter challenge title"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description *
            </Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe the challenge"
              rows={3}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal" className="text-white">
              Challenge Goal *
            </Label>
            <Input
              id="goal"
              {...register('goal')}
              placeholder="e.g., Run 100 miles in 30 days"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            {errors.goal && (
              <p className="text-red-500 text-sm">{errors.goal.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rules" className="text-white">
              Rules & Guidelines *
            </Label>
            <Textarea
              id="rules"
              {...register('rules')}
              placeholder="Define the rules and guidelines for this challenge"
              rows={4}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            {errors.rules && (
              <p className="text-red-500 text-sm">{errors.rules.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Start Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-white hover:bg-gray-600',
                      !startDate && 'text-gray-400'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : 'Pick a start date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-600">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => setValue('startDate', date)}
                    initialFocus
                    className="text-white"
                  />
                </PopoverContent>
              </Popover>
              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-white">End Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-white hover:bg-gray-600',
                      !endDate && 'text-gray-400'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP') : 'Pick an end date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-600">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => setValue('endDate', date)}
                    initialFocus
                    className="text-white"
                  />
                </PopoverContent>
              </Popover>
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Difficulty *</Label>
              <Select
                value={watch('difficulty')}
                onValueChange={(value) =>
                  setValue('difficulty', value as Difficulty)
                }
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem
                    value="BEGINNER"
                    className="text-white hover:bg-gray-700"
                  >
                    Beginner
                  </SelectItem>
                  <SelectItem
                    value="INTERMEDIATE"
                    className="text-white hover:bg-gray-700"
                  >
                    Intermediate
                  </SelectItem>
                  <SelectItem
                    value="ADVANCED"
                    className="text-white hover:bg-gray-700"
                  >
                    Advanced
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.difficulty && (
                <p className="text-red-500 text-sm">
                  {errors.difficulty.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">
                Category (Optional)
              </Label>
              <Input
                id="category"
                {...register('category')}
                placeholder="e.g., Running, Strength, Cardio"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-white">
              Tags (Optional)
            </Label>
            <Input
              id="tags"
              {...register('tags')}
              placeholder="Enter tags separated by commas (e.g., fitness, endurance, team)"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            <p className="text-gray-400 text-xs">
              Separate multiple tags with commas
            </p>
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags.message}</p>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoading ? 'Creating...' : 'Create Challenge'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CircleChallengeForm;
