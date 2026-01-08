import { z } from 'zod';

export const eventFormSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  location: z.string().optional(),
  category: z.string().optional(),
  image: z.string().optional(),
  tags: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ONGOING', 'COMPLETED', 'CANCELED']),
});

export type EventFormInput = z.infer<typeof eventFormSchema>;

