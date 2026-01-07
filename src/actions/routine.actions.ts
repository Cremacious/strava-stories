'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { Difficulty, StepType } from '@/lib/types/routine.type';

interface RoutineData {
  title: string;
  description?: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedDuration?: number;
  requiredEquipment?: string;
  category?: string;
  fitnessGoals?: string[];
  tags?: string[];
  warmUps?: Array<{
    activity: string;
    duration: number;
    instructions?: string;
  }>;
  exercises?: Array<{
    name: string;
    sets: number;
    reps: number;
    rest: number;
    instructions?: string;
    equipment?: string;
  }>;
}

export async function addRoutineToCircle(
  routineData: RoutineData,
  circleId: string
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    const routine = await prisma.workoutRoutine.create({
      data: {
        title: routineData.title,
        description: routineData.description,
        difficulty: routineData.difficulty,
        estimatedDuration: routineData.estimatedDuration
          ? routineData.estimatedDuration * 60
          : null,
        requiredEquipment: routineData.requiredEquipment,
        category: routineData.category,
        fitnessGoals: routineData.fitnessGoals || [],
        tags: routineData.tags || [],
        userId: user.id,
        circleId,
      },
    });

    interface WarmUpStep {
      routineId: string;
      stepNumber: number;
      type: 'WARM_UP';
      name: string;
      duration: number;
      instructions?: string;
    }

    interface ExerciseStep {
      routineId: string;
      stepNumber: number;
      type: 'EXERCISE';
      name: string;
      sets: number;
      reps: number;
      rest: number;
      instructions?: string;
      equipment?: string;
    }

    const stepsData: (WarmUpStep | ExerciseStep)[] = [];

    if (routineData.warmUps) {
      routineData.warmUps.forEach((warmUp, index) => {
        stepsData.push({
          routineId: routine.id,
          stepNumber: index + 1,
          type: 'WARM_UP',
          name: warmUp.activity,
          duration: warmUp.duration * 60,
          instructions: warmUp.instructions,
        });
      });
    }

    if (routineData.exercises) {
      const exerciseStartIndex = stepsData.length;
      routineData.exercises.forEach((exercise, index) => {
        stepsData.push({
          routineId: routine.id,
          stepNumber: exerciseStartIndex + index + 1,
          type: 'EXERCISE',
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          rest: exercise.rest,
          instructions: exercise.instructions,
          equipment: exercise.equipment,
        });
      });
    }

    if (stepsData.length > 0) {
      await prisma.workoutStep.createMany({
        data: stepsData,
      });
    }

    revalidatePath(`/circles/${circleId}`);

    return { success: true, routine };
  } catch (error) {
    console.error('Error adding routine to circle:', error);
    return { success: false, error: 'Failed to add routine to circle' };
  }
}

export async function getCircleRoutines(circleId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    const routines = await prisma.workoutRoutine.findMany({
      where: { circleId },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const routinesWithSteps = await Promise.all(
      routines.map(async (routine) => {
        const steps = await prisma.workoutStep.findMany({
          where: { routineId: routine.id },
          orderBy: { stepNumber: 'asc' },
        });

        return {
          ...routine,
          steps,
        };
      })
    );

    const transformedRoutines = routinesWithSteps.map((routine) => ({
      id: routine.id,
      title: routine.title,
      description: routine.description,
      difficulty: routine.difficulty as Difficulty,
      estimatedDuration: routine.estimatedDuration,
      requiredEquipment: routine.requiredEquipment,
      category: routine.category,
      fitnessGoals: routine.fitnessGoals,
      tags: routine.tags,
      createdAt: routine.createdAt,
      createdBy: {
        id: routine.user.id,
        name: routine.user.name,
        avatarUrl: routine.user.avatarUrl,
      },
      steps: routine.steps.map((step) => ({
        id: step.id,
        stepNumber: step.stepNumber,
        type: step.type as StepType,
        name: step.name,
        duration: step.duration,
        sets: step.sets,
        reps: step.reps,
        rest: step.rest,
        instructions: step.instructions,
        equipment: step.equipment,
      })),
    }));

    return { success: true, routines: transformedRoutines };
  } catch (error) {
    console.error('Error fetching circle routines:', error);
    return { success: false, error: 'Failed to fetch routines' };
  }
}

export async function getRoutineById(routineId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const routine = await prisma.workoutRoutine.findUnique({
      where: { id: routineId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        circle: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
            replies: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!routine) {
      return { success: false, error: 'Routine not found' };
    }

    const steps = await prisma.workoutStep.findMany({
      where: { routineId: routine.id },
      orderBy: { stepNumber: 'asc' },
    });

    const transformedRoutine = {
      id: routine.id,
      title: routine.title,
      description: routine.description,
      difficulty: routine.difficulty as Difficulty,
      estimatedDuration: routine.estimatedDuration,
      requiredEquipment: routine.requiredEquipment,
      category: routine.category,
      fitnessGoals: routine.fitnessGoals,
      tags: routine.tags,
      createdAt: routine.createdAt,
      updatedAt: routine.updatedAt,
      averageRating: routine.averageRating,
      likesCount: routine.likesCount,
      exercisesCount: routine.exercisesCount,
      createdBy: {
        id: routine.user.id,
        name: routine.user.name,
        avatarUrl: routine.user.avatarUrl,
      },
      circle: routine.circle ? {
        id: routine.circle.id,
        name: routine.circle.name,
      } : null,
      steps: steps.map((step) => ({
        id: step.id,
        stepNumber: step.stepNumber,
        type: step.type as StepType,
        name: step.name,
        duration: step.duration,
        sets: step.sets,
        reps: step.reps,
        rest: step.rest,
        instructions: step.instructions,
        equipment: step.equipment,
      })),
      comments: routine.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        user: {
          id: comment.user.id,
          name: comment.user.name,
          avatarUrl: comment.user.avatarUrl,
        },
        replies: comment.replies.map((reply) => ({
          id: reply.id,
          content: reply.content,
          createdAt: reply.createdAt,
          user: {
            id: reply.user.id,
            name: reply.user.name,
            avatarUrl: reply.user.avatarUrl,
          },
        })),
      })),
    };

    return { success: true, routine: transformedRoutine };
  } catch (error) {
    console.error('Error fetching routine by ID:', error);
    return { success: false, error: 'Failed to fetch routine' };
  }
}