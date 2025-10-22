import { z } from 'zod';

export const boothTagSchema = z.enum([
  "game/experience",
  "attraction",
  "food",
  "exhibition",
  "performance",
  "movie",
  "store",
  "magazine"
]);
export type Boothtag = z.infer<typeof boothTagSchema>;


export const boothColorSchema = z.enum([
  "red", "blue", "yellow/green", "green", "purple", "orange", "random"
]);
export type BoothColor = z.infer<typeof boothColorSchema>;


export const placeIdSchema = z.enum([
  "gym1", "m1a/m1b", "m2a/m2b/m2c/m2d", "h3a", "h3b", "h3c", "h3d", "ground", "sp3", "h2b/h2c", "m3c", "m3d", "spj4", "science", "katholiek", "theater", "biology", "h2d", "sp2", "h1c/h1d", "tech", "sp5", "h2a", "sp4", "physics", "h3e", "music", "large/sp1", "m3b", "?", "sp6", "gym2", "m1c/m1d", "meeting", "shodo", "m3a"
]);
export type PlaceId = z.infer<typeof placeIdSchema>;


export const boothSchema = z.object({
  booth_id: z.string(),
  booth_name: z.string(),
  short_description: z.string(),
  long_description: z.string(),
  tags: z.array(boothTagSchema),
  color: boothColorSchema,
  has_cm: z.boolean(),
  has_website: z.boolean(),
  group_name: z.string(),
  place_id: placeIdSchema,
  place: z.string(),
  overview: z.string(),
});
export type Booth = z.infer<typeof boothSchema>;
