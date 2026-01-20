'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createCircleFormSchema } from '@/lib/validators/circle.validators';
import { useCircleStore } from '@/stores/useCircleStore';
// import { getFriends } from '@/actions/circle.actions';
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

  // useEffect(() => {
  //   const fetchFriends = async () => {
  //     const result = await getFriends();
  //     if (result.success && result.friends) {
  //       setFriends(result.friends);
  //     }
  //   };
  //   fetchFriends();
  // }, []);

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMember = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Circle Name *
        </label>
        <Input
          id="name"
          placeholder="Enter circle name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          placeholder="Describe your circle"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="visibility" className="block text-sm font-medium">
          Visibility
        </label>
        <Select
          value={formData.visibility}
          onValueChange={(value: 'PUBLIC' | 'PRIVATE') => setFormData({ ...formData, visibility: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PRIVATE">Private</SelectItem>
            <SelectItem value="PUBLIC">Public</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Invite Friends</label>
        <Input
          placeholder="Search friends by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-3 max-h-48 overflow-y-auto border rounded-md">
          {filteredFriends.length === 0 ? (
            <p className="p-3 text-sm text-muted-foreground">No friends found</p>
          ) : (
            filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    {friend.avatarUrl ? (
                      <img
                        src={friend.avatarUrl}
                        alt={friend.name || 'User'}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-medium">
                        {(friend.name || friend.email)[0].toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{friend.name || 'Unnamed'}</p>
                    <p className="text-xs text-muted-foreground">{friend.email}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant={selectedMembers.includes(friend.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleMember(friend.id)}
                >
                  {selectedMembers.includes(friend.id) ? 'Selected' : 'Invite'}
                </Button>
              </div>
            ))
          )}
        </div>
        {selectedMembers.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {selectedMembers.length} friend(s) selected
          </p>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Circle'}
      </Button>
    </form>
  );
};

export default CreateCircleForm;