import z from 'zod';

export const lostItemSchema = z.object({
  name: z.string(),
  imagePath: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
});
export type LostItem = z.infer<typeof lostItemSchema>;
