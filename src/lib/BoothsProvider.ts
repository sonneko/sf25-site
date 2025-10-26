import { readFileSync } from 'fs';
import type { Booth } from '../types/booth';
import { boothSchema, Boothtag as BoothTag } from '../types/booth';

let booths: Booth[] | null = null;

function getBooths(): Booth[] {
  if (booths !== null) return booths;

  const ids = readFileSync(
    process.cwd() + '/assets/booths/allIds.txt',
    'utf8'
  ).split(',');
  const files = ids.map(id =>
    readFileSync(process.cwd() + '/assets/booths/' + id + '.json', 'utf8')
  );
  booths = [];
  files.forEach(file => {
    const parsed = JSON.parse(file);
    if (parsed['not-complete']) return;
    const booth = boothSchema.parse(JSON.parse(file));
    (booths as Booth[]).push(booth);
  });
  return booths;
}

export function getBoothsById(id: string): Booth | undefined {
  return getBooths().find(booth => booth.booth_id === id);
}

export function getAllBooths(): Booth[] {
  return getBooths();
}

export function getAllBoothsIDs(): string[] {
  return getBooths().map(booth => booth.booth_id);
}

export function convertBoothTagInfo(tagId: BoothTag): string {
  if (tagId === "attraction") {
    return "アトラクション";
  } else if (tagId === "exhibition") {
    return "展示";
  } else if (tagId === "food") {
    return "食べ物";
  } else if (tagId === "game/experience") {
    return "ゲーム・体験";
  } else if (tagId === "magazine") {
    return "部誌販売/配布";
  } else if (tagId === "movie") {
    return "映像";
  } else if (tagId === "performance") {
    return "パフォーマンス";
  } else if (tagId === "store") {
    return "販売";
  } else {
    return "";
  }
}
