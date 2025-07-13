import z from 'zod';

export const newsSchema = z.object({
    title: z.string(),
    content: z.string(),
    timestamp: z.string().datetime(),
});
export type News = z.infer<typeof newsSchema>;
