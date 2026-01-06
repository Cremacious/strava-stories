import { z } from 'zod';

export const createCircleFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  invitedMembers: z.array(z.string()).optional(),
});
