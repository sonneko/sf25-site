import type { Schema } from 'zod';
import z from 'zod';
import ConstantsManager from './ConstantsManager';
import type { News } from '../types/news';
import type { LostItem } from '../types/lostItem';
import type { TimeTable } from '../types/timeTable';

export type ResourceName = 'news' | 'timetable' | 'lostitems';
type GetDynamicResourceReturnType<T extends ResourceName> = Promise<
  T extends 'news'
    ? News[] | Error
    : T extends 'timetable'
      ? TimeTable | Error
      : T extends 'lostitems'
        ? LostItem[] | Error
        : never
>;
/**
 * 動的アセットにアクセスしてデータを得る。
 */
export async function getDynamicResource(
  resourceName: ResourceName,
  schema: Schema
): GetDynamicResourceReturnType<typeof resourceName> {
  const baseUrl = ConstantsManager.get('dynamic-assets-url');
  const url = `${baseUrl}/${resourceName}.json`;
  const json = await fetch(url)
    .then(res => res.json())
    .catch(err => {
      return Error(err);
    });
  try {
    return schema.parse(json);
  } catch (_err) {
    return Error('\nfailed to parse the json located at ${url}\n\n');
  }
}
