'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { WorkoutData } from '@/lib/types/workouts.type';


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

export async function getWorkouts() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    const workouts = await prisma.workout.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
    });

    return { success: true, workouts };
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
