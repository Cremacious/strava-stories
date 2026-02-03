import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackButton from '@/components/shared/BackButton';
import { Edit } from 'lucide-react';
import EditCircleDetails from './EditCircleDetails';
import EditCircleMembers from './EditCircleMembers';
import { getCircleMembers, getCircleById } from '@/actions/circle.actions';
import { getUserSession } from '@/actions/user.actions';
import { redirect } from 'next/navigation';

export default async function CircleSettingsPage({
  params,
}: {
  params: Promise<{ circleId: string }>;
}) {
  const { circleId } = await params;

  const userSession = await getUserSession();
  if (!userSession.success || !userSession.user) {
    redirect('/auth/login');
  }

  const [membersResult, circleResult] = await Promise.all([
    getCircleMembers(circleId),
    getCircleById(circleId),
  ]);

  const members = membersResult.success ? membersResult.members : [];
  const circle = circleResult.success ? circleResult.circle : null;

  if (!circle || circle.ownerId !== userSession.user.id) {
    redirect(`/circles/${circleId}`);
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <BackButton href={`/circles/${circleId}`} text="Back to Circle" />
      </div>

      <h1 className="text-3xl font-bold text-white mb-8">Circle Settings</h1>

      <EditCircleDetails circleId={circleId} />
      <EditCircleMembers
        circleId={circleId}
        members={members}
        ownerId={circle.ownerId}
      />

      <Card className="bg-red-900 border-red-700">
        <CardHeader>
          <CardTitle className="text-red-100">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-200 mb-4">
            Permanently delete this circle. This action cannot be undone.
          </p>
          <Button variant="destructive">Delete Circle Permanently</Button>
        </CardContent>
      </Card>
    </div>
  );
}
