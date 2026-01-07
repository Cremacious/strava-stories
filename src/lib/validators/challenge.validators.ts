import { z } from 'zod';

export const challengeFormSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(100, 'Title must be less than 100 characters'),
    description: z
      .string()
      .min(1, 'Description is required')
      .max(500, 'Description must be less than 500 characters'),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    goal: z
      .string()
      .min(1, 'Goal is required')
      .max(200, 'Goal must be less than 200 characters'),
    rules: z
      .string()
      .min(1, 'Rules are required')
      .max(1000, 'Rules must be less than 1000 characters'),
    category: z.string().optional(),
    tags: z.string().optional(),
    difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  })
  .refine(
    (data) => {
      if (!data.endDate) return false;
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: 'End date is required',
      path: ['endDate'],
    }
  );

export type ChallengeFormInput = z.input<typeof challengeFormSchema>;
export type ChallengeFormOutput = z.output<typeof challengeFormSchema>;
