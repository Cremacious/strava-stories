import { z } from 'zod';

export const createCircleFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  visibility: z.enum(['PUBLIC', 'PRIVATE']).default('PRIVATE'),
  invitedMembers: z.array(z.string()).optional(),
});
