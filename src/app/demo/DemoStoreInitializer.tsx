'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';

export default function DemoStoreInitializer() {
  const { setUser } = useUserStore();

  useEffect(() => {
    setUser({
      id: 'demo-user-123',
      username: 'DemoUser',
      email: 'demo@stravastories.com',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Fitness enthusiast sharing my journey through running and cycling. Always pushing my limits and loving every step!',
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      onboardingCompleted: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }, [setUser]);

  return null;
}
