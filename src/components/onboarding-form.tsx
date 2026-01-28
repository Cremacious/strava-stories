'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { Camera, User, MapPin } from 'lucide-react';
import {
  updateUserProfileImage,
  updateUsername,
  updateUserLocation,
  completeOnboarding,
  getUserSession,
} from '@/actions/user.actions';

export function OnboardingForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState('');

  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const router = useRouter();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleNext = async () => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (step === 1) {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
          const result = await updateUserProfileImage(formData);
          if (!result.success) {
            throw new Error(result.error || 'Failed to upload profile image');
          }
        }
        setSuccess('Profile image uploaded successfully!');
        setTimeout(() => setStep(2), 1000);
      } else if (step === 2) {
        if (!username.trim()) {
          throw new Error('Username is required');
        }
        const session = await getUserSession();
        if (!session.success || !session.user) {
          throw new Error('User not authenticated');
        }
        const result = await updateUsername(session.user.id, username.trim());
        if (!result.success) {
          throw new Error(result.error || 'Failed to set username');
        }
        setSuccess('Username set successfully!');
        setTimeout(() => setStep(3), 1000);
      } else if (step === 3) {
        if (!city.trim() || !state.trim() || !country.trim()) {
          throw new Error('All location fields are required');
        }
        const session = await getUserSession();
        if (!session.success || !session.user) {
          throw new Error('User not authenticated');
        }
        const result = await updateUserLocation(
          session.user.id,
          city.trim(),
          state.trim(),
          country.trim()
        );
        if (!result.success) {
          throw new Error(result.error || 'Failed to set location');
        }

        const completeResult = await completeOnboarding(session.user.id);
        if (!completeResult.success) {
          throw new Error(
            completeResult.error || 'Failed to complete onboarding'
          );
        }

        setSuccess('Onboarding completed successfully!');
        setTimeout(() => router.push('/home'), 1000);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardContent className="pt-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to Strava Stories
            </h1>
            <p className="text-gray-400">
              Let&apos;s set up your profile ({step}/3)
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Profile Picture
                </h2>
                <p className="text-gray-400 text-sm">
                  Add a profile picture to personalize your account
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div
                  className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-400" />
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  {selectedFile ? 'Change Picture' : 'Upload Picture'}
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2 flex items-center justify-center gap-2">
                  <User className="w-5 h-5" />
                  Username
                </h2>
                <p className="text-gray-400 text-sm">
                  Choose a username that represents you
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-[#2e2e2e] border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2 flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location
                </h2>
                <p className="text-gray-400 text-sm">
                  Tell us where you&apos;re from
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-gray-300">
                    City
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-[#2e2e2e] border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-gray-300">
                    State/Province
                  </Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="Enter your state or province"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="bg-[#2e2e2e] border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-gray-300">
                    Country
                  </Label>
                  <Input
                    id="country"
                    type="text"
                    placeholder="Enter your country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="bg-[#2e2e2e] border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          {success && (
            <p className="text-sm text-green-400 text-center">{success}</p>
          )}

          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1"
                disabled={isLoading}
              >
                Back
              </Button>
            )}

            {step < 3 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
                className="flex-1"
                disabled={isLoading}
              >
                Skip
              </Button>
            )}

            <Button
              type="button"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={handleNext}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : step === 3 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
