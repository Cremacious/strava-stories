import { create } from 'zustand';
import { createCircle } from '@/actions/circle.actions';
import { addWorkoutToCircle } from '@/actions/workout.actions';
import { WorkoutData } from '@/lib/types/workouts.type';
import { addRoutineToCircle } from '@/actions/routine.actions';

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

interface CreateCircleData {
  name: string;
  description?: string;
  invitedMembers?: string[];
}

interface Circle {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
}

interface CircleStore {
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  createCircle: (
    data: CreateCircleData
  ) => Promise<{ success: boolean; circle?: Circle }>;
  addWorkoutToCircle: (
    workoutData: WorkoutData,
    circleId: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<{ success: boolean; workout?: any; error?: string }>;

  addRoutineToCircle: (
    routineData: RoutineData,
    circleId: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<{ success: boolean; routine?: any; error?: string }>;
}

export const useCircleStore = create<CircleStore>((set) => ({
  isLoading: false,
  error: null,
  clearError: () => set({ error: null }),
  createCircle: async (data: CreateCircleData) => {
    set({ isLoading: true, error: null });
    try {
      const result = await createCircle(data);
      if (!result.success) {
        set({
          error: result.error || 'Failed to create circle',
          isLoading: false,
        });
        return { success: false };
      }
      set({ isLoading: false });
      return { success: true, circle: result.circle };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      return { success: false };
    }
  },
  addWorkoutToCircle: async (workoutData: WorkoutData, circleId: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await addWorkoutToCircle(workoutData, circleId);
      if (!result.success) {
        set({
          isLoading: false,
          error: result.error || 'Failed to add workout',
        });
        return result;
      }
      set({ isLoading: false });
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
  addRoutineToCircle: async (routineData: RoutineData, circleId: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await addRoutineToCircle(routineData, circleId);
      if (!result.success) {
        set({
          isLoading: false,
          error: result.error || 'Failed to add routine',
        });
        return result;
      }
      set({ isLoading: false });
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },
}));
