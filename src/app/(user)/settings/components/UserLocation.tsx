'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/useUserStore';
import { useEffect, useState } from 'react';

const UserLocation = ({ userId, city: initialCity, state: initialState, country: initialCountry }: { userId: string; city?: string; state?: string; country?: string }) => {
  const { user, fetchUser, updateUserLocation } = useUserStore();
  const [city, setCity] = useState(initialCity || '');
  const [state, setState] = useState(initialState || '');
  const [country, setCountry] = useState(initialCountry || '');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setCity(user.city || '');
      setState(user.state || '');
      setCountry(user.country || '');
    }
  }, [user, fetchUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const result = await updateUserLocation(userId, { city, state, country });

    if (result.success) {
      setMessage('Location updated successfully!');
    } else {
      setMessage(result.error || 'Failed to update location');
    }

    setIsLoading(false);
  };

  return (
    <Card className="backgroundDark border-0">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Change Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="city" className="text-gray-400">
              City
            </Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="state" className="text-gray-400">
              State/Province
            </Label>
            <Input
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter state or province"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="country" className="text-gray-400">
              Country
            </Label>
            <Input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country"
              className="mt-1"
            />
          </div>
          {message && (
            <p
              className={`text-sm ${
                message.includes('success') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </p>
          )}
          <Button type="submit" variant="outline" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Location'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserLocation;
