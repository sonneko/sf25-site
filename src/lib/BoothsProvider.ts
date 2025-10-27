import 'server-only';
import type { Booth } from '../types/booth';
import { boothSchema } from '../types/booth';

let booths: Booth[] | null = null;

async function getBooths(): Promise<Booth[]> {
  // if (booths !== null) return booths;

  if (process.title !== 'browser') {
    // Node.js environment
    const { readFileSync } = await import('fs');

    const ids = readFileSync(
      process.cwd() + '/assets/booths/allIds.txt',
      'utf8'
    ).split('\n');
    const files: string[] = [];
    ids.forEach(id => {
      if (id !== '') {
        files.push(
          readFileSync(process.cwd() + '/assets/booths/' + id + '.json', 'utf8')
        );
      }
    });
    booths = [];
    files.forEach(file => {
      const booth = boothSchema.parse(JSON.parse(file));
      (booths as Booth[]).push(booth);
    });
    return booths;
  } else {
    throw new Error('BoothsProviderはブラウザ上で利用できません。');
  }
}

export async function getBoothsById(id: string): Promise<Booth | undefined> {
  return (await getBooths()).find(booth => booth.booth_id === id);
}

export async function getAllBooths(): Promise<Booth[]> {
  return getBooths();
}

export async function getAllBoothsIDs(): Promise<string[]> {
  return (await getBooths()).map(booth => booth.booth_id);
}
