'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  eventFormSchema,
  type EventFormInput,
} from '@/lib/validators/event.validator';
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
import { CreateEventData } from '@/lib/types/event.type';
import { useCircleStore } from '@/stores/useCircleStore';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/shared/BackButton';

type EventStatus = 'DRAFT' | 'PUBLISHED' | 'ONGOING' | 'COMPLETED' | 'CANCELED';

interface CircleEventFormProps {
  circleId: string;
  onSuccess?: () => void;
}

const CircleEventForm = ({ circleId, onSuccess }: CircleEventFormProps) => {
  const router = useRouter();
  const { createCircleEvent } = useCircleStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<EventFormInput>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: '',
      description: '',
      date: '',
      location: '',
      category: '',
      image: '',
      tags: '',
      status: 'DRAFT',
    },
  });

  const onSubmit = async (data: EventFormInput) => {
    const transformedData: CreateEventData = {
      ...data,
      date: new Date(data.date),
      tags: data.tags
        ? data.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
    };

    const result = await createCircleEvent(transformedData, circleId);
    if (result.success) {
      reset();
      router.push(`/circles/${circleId}`);
      onSuccess?.();
    } else {
      console.error('Failed to create event:', result.error);
    }
  };

  return (
    <>
      <BackButton href={`/circles/${circleId}`} text="Back to Circle" />
      <Card className="w-full max-w-2xl mx-auto bg-[#3f3f3f] border-0 mt-4 px-2 md:px-4">
        <CardHeader>
          <CardTitle className="text-white">Create Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Event Name *
              </Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter event name"
                className="bg-[#2e2e2e] text-white placeholder-gray-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Description *
              </Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Describe the event"
                rows={3}
                className="bg-[#2e2e2e] border-0 text-white placeholder-gray-400"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-white">
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                {...register('date')}
                className="bg-[#2e2e2e] border-0 text-white placeholder-gray-400"
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">
                Location (Optional)
              </Label>
              <Input
                id="location"
                {...register('location')}
                placeholder="Event location"
                className="bg-[#2e2e2e] border-0 text-white placeholder-gray-400"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
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
                placeholder="e.g., Running, Yoga, Social"
                className="bg-[#2e2e2e] border-0 text-white placeholder-gray-400"
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* <div className="space-y-2">
            <Label htmlFor="image" className="text-white">
              Image URL (Optional)
            </Label>
            <Input
              id="image"
              {...register('image')}
              placeholder="https://example.com/image.jpg"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div> */}

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-white">
                Tags (Optional)
              </Label>
              <Input
                id="tags"
                {...register('tags')}
                placeholder="Enter tags separated by commas (e.g., fitness, outdoor, team)"
                className="bg-[#2e2e2e] border-0 text-white placeholder-gray-400"
              />
              <p className="text-gray-400 text-xs">
                Separate multiple tags with commas
              </p>
              {errors.tags && (
                <p className="text-red-500 text-sm">{errors.tags.message}</p>
              )}
            </div>

            {/* <div className="space-y-2">
            <Label className="text-white">Status *</Label>
            <Select
              value={watch('status')}
              onValueChange={(value) =>
                setValue('status', value as EventStatus)
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem
                  value="DRAFT"
                  className="text-white hover:bg-gray-700"
                >
                  Draft
                </SelectItem>
                <SelectItem
                  value="PUBLISHED"
                  className="text-white hover:bg-gray-700"
                >
                  Published
                </SelectItem>
                <SelectItem
                  value="ONGOING"
                  className="text-white hover:bg-gray-700"
                >
                  Ongoing
                </SelectItem>
                <SelectItem
                  value="COMPLETED"
                  className="text-white hover:bg-gray-700"
                >
                  Completed
                </SelectItem>
                <SelectItem
                  value="CANCELED"
                  className="text-white hover:bg-gray-700"
                >
                  Canceled
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div> */}

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/circles/${circleId}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Create Event
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CircleEventForm;
