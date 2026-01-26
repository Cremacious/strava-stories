import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Mail, Lock, Trash2 } from 'lucide-react';
import UserLocation from './components/UserLocation';
import { getUserProfile } from '@/actions/user.actions';

const SettingsPage = async () => {
  const user = await getUserProfile();
  if (!user.success || !user.user) {
    return (
      <div className="p-4 text-white">
        <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
        <p>The user profile could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {user.user.email}Settings {user.user.city}
          </h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Picture Section */}
        <Card className="backgroundDark border-0">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-white text-2xl">JD</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">
                  Upload a new profile picture. Recommended size: 400x400px.
                </p>
                <Button variant="outline" className="mt-2">
                  Change Picture
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Update Email Section */}
        <Card className="backgroundDark border-0">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Update Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-email" className="text-gray-400">
                Current Email
              </Label>
              <Input
                id="current-email"
                type="email"
                value="user@example.com"
                readOnly
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="new-email" className="text-gray-400">
                New Email
              </Label>
              <Input
                id="new-email"
                type="email"
                placeholder="Enter new email"
                className="mt-1"
              />
            </div>
            <Button variant="outline">Update Email</Button>
          </CardContent>
        </Card>

        {/* Change Password Section */}
        <Card className="backgroundDark border-0">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password" className="text-gray-400">
                Current Password
              </Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter current password"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="new-password" className="text-gray-400">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="text-gray-400">
                Confirm New Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                className="mt-1"
              />
            </div>
            <Button variant="outline">Change Password</Button>
          </CardContent>
        </Card>

        {/* Change Location Section */}
        <UserLocation
          userId={user.user?.id}
          city={user.user?.city}
          state={user.user?.state}
          country={user.user?.country}
        />
      </div>

      {/* Delete Account Section */}
      <Card className="backgroundDark border-0 border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400 text-sm">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="confirm-delete" className="rounded" />
            <Label htmlFor="confirm-delete" className="text-gray-400 text-sm">
              I understand that this action is irreversible
            </Label>
          </div>
          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
