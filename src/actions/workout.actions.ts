'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { WorkoutData } from '@/lib/types/workouts.type';
import { GoalPeriod, GoalType } from '../generated/prisma/enums';

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
    const workout = await prisma.workout.findUnique({
      where: { id: workoutId },
    });
    if (workout) {
      return { success: true, workout, isStrava: false };
    }

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

export async function createGoal(data: {
  title: string;
  description?: string;
  period: string;
  type: string;
  targetValue: number;
  specificType?: string;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    const goal = await prisma.goal.create({
      data: {
        userId: user.id,
        title: data.title,
        description: data.description ?? null,
        period: data.period as GoalPeriod,
        type: data.type as GoalType,
        targetValue: data.targetValue,
        specificType: data.specificType ?? null,
      },
    });

    return { success: true, goal };
  } catch (error) {
    console.error('Error creating goal:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getGoals() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    const goals = await prisma.goal.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    // Fetch workouts for progress calculation
    const workouts = await prisma.workout.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
    });

    const stravaWorkouts = await prisma.stravaWorkout.findMany({
      where: { userId: user.id },
      orderBy: { startDate: 'desc' },
    });

    // Combine workouts
    const allWorkouts = [
      ...workouts.map((workout) => ({
        ...workout,
        isStrava: false,
        date: workout.date,
        duration: workout.duration ?? 0,
        distance: workout.distance ?? 0,
        calories: workout.calories ?? 0,
        type: workout.type,
      })),
      ...stravaWorkouts.map((workout) => ({
        ...workout,
        isStrava: true,
        date: workout.startDate,
        duration: workout.movingTime ?? 0,
        distance: (workout.distance ?? 0) / 1000, // convert to km
        calories: 0,
        type: workout.type,
      })),
    ];

    // Calculate current value for each goal
    const goalsWithProgress = goals.map((goal) => {
      let currentValue = 0;
      const periodDays: Record<string, number> = {
        THIRTY_DAYS: 30,
        SIXTY_DAYS: 60,
        NINETY_DAYS: 90,
        SIX_MONTHS: 180,
        TWELVE_MONTHS: 365,
      };

      let startDate: Date;
      if (goal.type === 'WORKOUTS_PER_WEEK') {
        // For weekly goals, use last 7 days
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
      } else {
        startDate = new Date();
        startDate.setDate(
          startDate.getDate() - (periodDays[goal.period] || 30),
        );
      }

      const relevantWorkouts = allWorkouts.filter(
        (w) => new Date(w.date) >= startDate,
      );

      switch (goal.type) {
        case 'TOTAL_WORKOUTS':
          currentValue = relevantWorkouts.length;
          break;
        case 'TOTAL_DURATION':
          currentValue =
            relevantWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) /
            60; // convert to minutes
          break;
        case 'TOTAL_DISTANCE':
          currentValue = relevantWorkouts.reduce(
            (sum, w) => sum + (w.distance || 0),
            0,
          );
          break;
        case 'TOTAL_CALORIES':
          currentValue = relevantWorkouts.reduce(
            (sum, w) => sum + (w.calories || 0),
            0,
          );
          break;
        case 'SPECIFIC_TYPE_WORKOUTS':
          currentValue = relevantWorkouts.filter(
            (w) => w.type === goal.specificType,
          ).length;
          break;
        case 'AVERAGE_DISTANCE':
          const totalDist = relevantWorkouts.reduce(
            (sum, w) => sum + (w.distance || 0),
            0,
          );
          currentValue =
            relevantWorkouts.length > 0
              ? totalDist / relevantWorkouts.length
              : 0;
          break;
        case 'AVERAGE_DURATION':
          const totalDur =
            relevantWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0) /
            60;
          currentValue =
            relevantWorkouts.length > 0
              ? totalDur / relevantWorkouts.length
              : 0;
          break;
        case 'WORKOUTS_PER_WEEK':
          currentValue = relevantWorkouts.length;
          break;
        default:
          currentValue = 0;
      }

      return {
        ...goal,
        currentValue,
      };
    });

    return { success: true, goals: goalsWithProgress };
  } catch (error) {
    console.error('Error fetching goals:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
