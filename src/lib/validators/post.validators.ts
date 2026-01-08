import { z } from 'zod';

export const createPostSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  privacy: z.enum(['PUBLIC', 'FRIENDS']), // Remove .optional() to make it required
  feeling: z
    .enum(['HAPPY', 'SAD', 'EXCITED', 'ANGRY', 'TIRED', 'MOTIVATED'])
    .optional(),
  images: z.array(z.instanceof(File)).optional(),
  tags: z
    .array(z.object({ type: z.enum(['USER', 'LOCATION']), value: z.string() }))
    .optional(),
});
