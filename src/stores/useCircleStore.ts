import { create } from 'zustand';
import {
  createCircle,
  joinCircle,
  leaveCircle,
  sendCircleRequest,
  approveCircleRequest,
  rejectCircleRequest,
} from '@/actions/circle.actions';
import { addWorkoutToCircle } from '@/actions/workout.actions';
import { WorkoutData } from '@/lib/types/workouts.type';
import { addRoutineToCircle } from '@/actions/routine.actions';
import { createCircleChallengeAction } from '@/actions/challenge.actions';
import { CreateChallengeData } from '@/lib/types/challenge.type';
import { createCirclePoll } from '@/actions/poll.actions';
import { createCircleEventAction } from '@/actions/event.actions';

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
  visibility?: 'PUBLIC' | 'PRIVATE';
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
    data: CreateCircleData,
  ) => Promise<{ success: boolean; circle?: Circle }>;
  joinCircle: (
    circleId: string,
  ) => Promise<{ success: boolean; error?: string }>;
  leaveCircle: (
    circleId: string,
  ) => Promise<{ success: boolean; error?: string }>;
  addWorkoutToCircle: (
    workoutData: WorkoutData,
    circleId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<{ success: boolean; workout?: any; error?: string }>;

  addRoutineToCircle: (
    routineData: RoutineData,
    circleId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<{ success: boolean; routine?: any; error?: string }>;
  addChallengeToCircle: (
    challengeData: CreateChallengeData, // Updated to use proper type
    circleId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<{ success: boolean; challenge?: any; error?: string }>;

  createCirclePoll: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pollData: any,
    circleId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<{ success: boolean; poll?: any; error?: string }>;
  createCircleEvent: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventData: any,
    circleId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<{ success: boolean; event?: any; error?: string }>;
  approveCircleRequest: (
    circleId: string,
    userId: string,
  ) => Promise<{ success: boolean; error?: string }>;
  rejectCircleRequest: (
    circleId: string,
    userId: string,
  ) => Promise<{ success: boolean; error?: string }>;
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
  joinCircle: async (circleId: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await joinCircle(circleId);
      if (!result.success) {
        set({
          error: result.error || 'Failed to join circle',
          isLoading: false,
        });
        return result;
      }
      set({ isLoading: false });
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },
  leaveCircle: async (circleId: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await leaveCircle(circleId);
      if (!result.success) {
        set({
          error: result.error || 'Failed to leave circle',
          isLoading: false,
        });
        return result;
      }
      set({ isLoading: false });
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
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
  addChallengeToCircle: async (
    challengeData: CreateChallengeData,
    circleId: string,
  ) => {
    set({ isLoading: true, error: null });
    try {
      const result = await createCircleChallengeAction(challengeData, circleId);
      if (!result.success) {
        set({
          isLoading: false,
          error: result.error || 'Failed to add challenge',
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createCirclePoll: async (pollData: any, circleId: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await createCirclePoll(pollData, circleId);
      if (!result.success) {
        set({
          isLoading: false,
          error: result.error || 'Failed to create poll',
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createCircleEvent: async (eventData: any, circleId: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await createCircleEventAction(eventData, circleId);
      if (!result.success) {
        set({
          isLoading: false,
          error: result.error || 'Failed to create event',
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
  approveCircleRequest: async (circleId: string, userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await approveCircleRequest(circleId, userId);
      if (!result.success) {
        set({
          error: result.error || 'Failed to approve request',
          isLoading: false,
        });
        return result;
      }
      set({ isLoading: false });
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },
  rejectCircleRequest: async (circleId: string, userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await rejectCircleRequest(circleId, userId);
      if (!result.success) {
        set({
          error: result.error || 'Failed to reject request',
          isLoading: false,
        });
        return result;
      }
      set({ isLoading: false });
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },
}));
