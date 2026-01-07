import { z } from 'zod';

export const createPollSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  options: z
    .array(z.string().min(1, 'Option cannot be empty'))
    .min(2, 'At least 2 options are required')
    .max(10, 'Maximum 10 options allowed'), 
  resultsVisibility: z.enum(['LIVE', 'HIDDEN', 'AFTER_VOTE'], {
    message: 'Invalid results visibility',
  }),
  closedAt: z.date().nullable(),
});
