import React from "react";
import { z } from "zod";

export const TagSchema = z.enum(["after", "before", "interview"]).describe("記事のタグ");
export type Tag = z.infer<typeof TagSchema>;

export const BlogSchema = z.object({
    id: z.string().describe("記事のID"),
    title: z.string().describe("記事のタイトル"),
    author: z.string().describe("記事の著者"),
    date: z.string().describe("記事の日付"),
    content: z.string().describe("記事の内容(mdそのまま)"),
    tags: TagSchema,
    parsedContent: z.any(),
});
export type Blog = z.infer<typeof BlogSchema> & {
    parsedContent: React.ReactNode;
};
