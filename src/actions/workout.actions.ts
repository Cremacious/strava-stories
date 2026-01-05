'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export interface WorkoutData {
  title: string;
  description?: string;
  type: string;
  duration?: number; // in seconds
  distance?: number; // in meters
  calories?: number;
  date: Date;
}

export async function addWorkout(data: WorkoutData) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    const workout = await prisma.workout.create({
      data: {
        userId: user.id,
        title: data.title,
        description: data.description,
        type: data.type,
        duration: data.duration,
        distance: data.distance,
        calories: data.calories,
        date: data.date,
      },
    });

    return { success: true, workout };
  } catch (error) {
    console.error('Error adding workout:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
