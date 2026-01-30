'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';

export default function UserStoreInitializer() {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  return null;
}