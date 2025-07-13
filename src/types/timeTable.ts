import z from 'zod';

export const timeTableSchema = z.object({
    // TODO: タイムテーブルオブジェクトの型を定義する
});
export type TimeTable = z.infer<typeof timeTableSchema>;
