'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleMember } from '@/lib/types/circles.type';
import { useCircleStore } from '@/stores/useCircleStore';
import { useUserStore } from '@/stores/useUserStore';

const EditCircleMembers = ({
  circleId,
  members,
  ownerId,
}: {
  circleId: string;
  members: CircleMember[];
  ownerId: string;
}) => {
  const { updateCircleMember, isLoading } = useCircleStore();
  const { user } = useUserStore();
  const [updatingMember, setUpdatingMember] = useState<string | null>(null);

  const isOwner = user?.id === ownerId;

  const handleRoleChange = async (memberId: string, newRole: string) => {
    setUpdatingMember(memberId);
    await updateCircleMember(circleId, memberId, { role: newRole });
    setUpdatingMember(null);
  };

  const handleRemoveMember = async (memberId: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      setUpdatingMember(memberId);
      await updateCircleMember(circleId, memberId, { action: 'remove' });
      setUpdatingMember(null);
    }
  };

  return (
    <Card className="mb-8 bg-[#3F3F3F] border-0">
      <CardHeader>
        <CardTitle className="text-white">
          Manage Members ({members.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 bg-[#2e2e2e] rounded"
            >
              <div className="flex items-center gap-3">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-white font-semibold">{member.name}</p>
                  <p className="text-gray-400 text-sm">
                    Role: {member.role === 'admin' ? 'Admin' : 'Member'}
                  </p>
                </div>
              </div>
              {isOwner && (
                <div className="flex gap-2">
                  <select
                    value={member.role}
                    onChange={(e) =>
                      handleRoleChange(member.id, e.target.value)
                    }
                    disabled={updatingMember === member.id || isLoading}
                    className="bg-[#1e1e1e] border-gray-600 text-white rounded px-3 py-1 text-sm"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveMember(member.id)}
                    disabled={updatingMember === member.id || isLoading}
                  >
                    {updatingMember === member.id ? 'Removing...' : 'Remove'}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditCircleMembers;
