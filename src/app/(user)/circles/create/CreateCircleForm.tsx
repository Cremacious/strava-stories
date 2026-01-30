// ...existing code...
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { createCircleFormSchema } from '@/lib/validators/circle.validators';
import { useCircleStore } from '@/stores/useCircleStore';
import { Friend } from '@/lib/types/friends.type';

const CreateCircleForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    visibility: 'PRIVATE' as 'PUBLIC' | 'PRIVATE',
  });
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { createCircle, isLoading, error, clearError } = useCircleStore();


  const filteredFriends = friends.filter(
    (friend) =>
      friend.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleMember = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const result = createCircleFormSchema.safeParse({
      name: formData.name,
      description: formData.description || undefined,
      visibility: formData.visibility,
      invitedMembers: selectedMembers.length > 0 ? selectedMembers : undefined,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0] || '',
        description: fieldErrors.description?.[0] || '',
        invitedMembers: fieldErrors.invitedMembers?.[0] || '',
      });
      return;
    }

    setErrors({});
    const createResult = await createCircle(result.data);
    if (createResult.success && createResult.circle) {
      router.push(`/circles/${createResult.circle.id}`);
    }
  };

  return (
    <Card className=" darkBackground border-0 m-2">
      <CardTitle className="text-white text-center pt-6 text-2xl font-bold">Create a New Circle</CardTitle>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Circle Name *
            </label>
            <Input
              id="name"
              placeholder="Enter circle name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-[#2e2e2e] border-none text-white placeholder-gray-400"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white"
            >
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Describe your circle"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="bg-[#2e2e2e] border-none text-white placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="visibility"
              className="block text-sm font-medium text-white"
            >
              Visibility
            </label>
            <Select
              value={formData.visibility}
              onValueChange={(value: 'PUBLIC' | 'PRIVATE') =>
                setFormData({ ...formData, visibility: value })
              }
            >
              <SelectTrigger className="bg-[#2e2e2e] border-none text-white">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent className="bg-[#2e2e2e] border-none">
                <SelectItem
                  value="PRIVATE"
                  className="text-white hover:bg-gray-700"
                >
                  Private
                </SelectItem>
                <SelectItem
                  value="PUBLIC"
                  className="text-white hover:bg-gray-700"
                >
                  Public
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Invite Friends
            </label>
            <Input
              placeholder="Search friends by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#2e2e2e] border-none text-white placeholder-gray-400"
            />
            <div className="mt-3 max-h-48 overflow-y-auto border border-gray-600 rounded-md bg-gray-800">
              {filteredFriends.length === 0 ? (
                <p className="p-3 text-sm text-gray-400">No friends found</p>
              ) : (
                filteredFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-3 border-b border-gray-700 last:border-b-0 hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                        {friend.avatarUrl ? (
                          <img
                            src={friend.avatarUrl}
                            alt={friend.name || 'User'}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-medium text-white">
                            {(friend.name || friend.email)[0].toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {friend.name || 'Unnamed'}
                        </p>
                        <p className="text-xs text-gray-400">{friend.email}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant={
                        selectedMembers.includes(friend.id)
                          ? 'default'
                          : 'outline'
                      }
                      size="sm"
                      onClick={() => toggleMember(friend.id)}
                      className={
                        selectedMembers.includes(friend.id)
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'border-red-500 text-red-400 hover:bg-red-500 hover:text-white'
                      }
                    >
                      {selectedMembers.includes(friend.id)
                        ? 'Selected'
                        : 'Invite'}
                    </Button>
                  </div>
                ))
              )}
            </div>
            {selectedMembers.length > 0 && (
              <p className="text-sm text-gray-400">
                {selectedMembers.length} friend(s) selected
              </p>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className='flex flex-row gap-4 justify-end'>
            <Button className='w-1/4' variant={'outline'}>
              Cancel
            </Button>
            <Button type="submit" className="w-1/2 " disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Circle'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCircleForm;
