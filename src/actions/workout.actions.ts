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

export async function addWorkoutToCircle(data: WorkoutData, circleId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const circle = await prisma.circle.findUnique({
      where: { id: circleId },
      select: { ownerId: true },
    });

    if (!circle) {
      return { success: false, error: 'Circle not found' };
    }

    const membership = await prisma.circleMember.findFirst({
      where: {
        circleId: circleId,
        userId: user.id,
      },
    });

    if (!membership && circle.ownerId !== user.id) {
      return { success: false, error: 'User is not a member of this circle' };
    }

    const workout = await prisma.workout.create({
      data: {
        userId: user.id,
        circleId: circleId,
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
    console.error('Error adding workout to circle:', error);
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

export async function getCircleWorkouts(circleId: string) {
  try {
    const workouts = await prisma.workout.findMany({
      where: { circleId },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, workouts };
  } catch (error) {
    console.error('Error fetching circle workouts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getStravaWorkoutById(id: string) {
  try {
    const stravaWorkout = await prisma.stravaWorkout.findUnique({
      where: { id: BigInt(id) },
    });
    if (!stravaWorkout) {
      return { success: false, error: 'Strava workout not found' };
    }
    return { success: true, stravaWorkout };
  } catch (error) {
    console.error('Error fetching Strava workout by ID:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getWorkoutById(workoutId: string) {
  try {
    // Try regular workout first
    const workout = await prisma.workout.findUnique({
      where: { id: workoutId },
    });
    if (workout) {
      return { success: true, workout, isStrava: false };
    }

    // Try Strava workout
    const stravaResult = await getStravaWorkoutById(workoutId);
    if (stravaResult.success) {
      return {
        success: true,
        workout: stravaResult.stravaWorkout,
        isStrava: true,
      };
    }

    return { success: false, error: 'Workout not found' };
  } catch (error) {
    console.error('Error fetching workout by ID:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getStravaWorkouts() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    const stravaWorkouts = await prisma.stravaWorkout.findMany({
      where: { userId: user.id },
      orderBy: { startDate: 'desc' },
    });

    return { success: true, stravaWorkouts };
  } catch (error) {
    console.error('Error fetching Strava workouts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
