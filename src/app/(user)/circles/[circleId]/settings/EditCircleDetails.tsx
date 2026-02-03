'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCircleStore } from '@/stores/useCircleStore';
import { uploadCloudinaryImage } from '@/lib/client-cloudinary-utils';

interface FormData {
  name: string;
  description: string;
}

const EditCircleDetails = ({ circleId }: { circleId: string }) => {
  const { updateCircleDetails, isLoading, error } = useCircleStore();
  const [file, setFile] = useState<File | null>(null);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    let coverImage: string | undefined;

    if (file) {
      const imageUrl = await uploadCloudinaryImage(file);
      if (!imageUrl) {
        return;
      }
      coverImage = imageUrl;
    }

    const result = await updateCircleDetails(circleId, {
      name: data.name || undefined,
      description: data.description || undefined,
      coverImage,
    });

    if (result.success) {
      reset();
      setFile(null);
    }
  };

  return (
    <Card className="mb-8 bg-[#3F3F3F] border-0">
      <CardHeader>
        <CardTitle className="text-white">Circle Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-white mb-2 font-semibold">
              Circle Name
            </label>
            <Input
              {...register('name')}
              placeholder="Enter circle name"
              className="bg-[#2e2e2e] border-none placeholder:text-gray-400 text-white"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">
              Description
            </label>
            <Textarea
              {...register('description')}
              placeholder="Enter circle description"
              className="bg-[#2e2e2e] border-none placeholder:text-gray-400 text-white"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-semibold">
              Cover Image
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="bg-[#2e2e2e] border-none text-white file:bg-gray-600 file:text-white file:border-none file:rounded file:px-3 file:py-1"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="mt-4">
            {isLoading ? 'Updating...' : 'Update Circle'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditCircleDetails;
