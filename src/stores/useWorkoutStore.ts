import { create } from 'zustand';
import { addWorkout } from '@/actions/workout.actions';
import { WorkoutData } from '@/lib/types/workouts.type';

export interface Workout {
  id: string;
  userId: string;
  title: string;
  description?: string;
  type: string;
  duration?: number;
  distance?: number;
  calories?: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface WorkoutStore {
  workouts: Workout[];
  isLoading: boolean;
  error: string | null;
  addWorkout: (data: WorkoutData) => Promise<void>;
  setWorkouts: (workouts: Workout[]) => void;
  clearError: () => void;
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: [],
  isLoading: false,
  error: null,

  addWorkout: async (data: WorkoutData) => {
    set({ isLoading: true, error: null });

    try {
      const result = await addWorkout(data);

      if (result.success && result.workout) {
     
        set((state) => ({
          workouts: [
            {
              ...result.workout,
              description: result.workout.description ?? undefined,
              duration: result.workout.duration ?? undefined,
              distance: result.workout.distance ?? undefined,
              calories: result.workout.calories ?? undefined,
            },
            ...state.workouts,
          ],
          isLoading: false,
        }));
      } else {
        set({
          error: result.error || 'Failed to add workout',
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
    }
  },

  setWorkouts: (workouts: Workout[]) => set({ workouts }),

  clearError: () => set({ error: null }),
}));
