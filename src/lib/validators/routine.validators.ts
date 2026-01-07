import { z } from 'zod';

export const routineFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  estimatedDuration: z.string().optional(),
  requiredEquipment: z.string().optional(),
  category: z.string().optional(),
  fitnessGoals: z.string().optional(),
  tags: z.string().optional(),
  warmUps: z
    .array(
      z.object({
        activity: z.string().min(1, 'Activity is required'),
        duration: z.number().min(0, 'Duration must be positive'),
        instructions: z.string().optional(),
      })
    )
    .optional(),
  exercises: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        sets: z.number().min(0, 'Sets must be positive'),
        reps: z.number().min(0, 'Reps must be positive'),
        rest: z.number().min(0, 'Rest must be positive'),
        instructions: z.string().optional(),
        equipment: z.string().optional(),
      })
    )
    .optional(),
});

export type RoutineFormInput = z.infer<typeof routineFormSchema>;
