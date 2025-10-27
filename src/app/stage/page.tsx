import { Timetable } from '@/components/TimeTable/TimeTable';
import type { Booth } from '../../types/booth';
import type { EventData } from '../../components/TimeTable/types';
import { getAllBooths } from '../../lib/BoothsProvider';

const musicTimeInfo: {
  [key in Booth['booth_id']]: {
    startTime: [number, number];
    endTime: [number, number];
    color: EventData['color'];
  };
} = {
  'club-29_a': { startTime: [9, 0], endTime: [10, 0], color: 'blue' },
  'club-31_a': { startTime: [10, 0], endTime: [10, 40], color: 'orange' },
  'volu-19': { startTime: [10, 40], endTime: [11, 0], color: 'purple' },
  'volu-21': { startTime: [11, 0], endTime: [11, 40], color: 'red' },
  'club-29_b': { startTime: [11, 40], endTime: [13, 40], color: 'teal' },
  'club-31_b': { startTime: [14, 0], endTime: [14, 30], color: 'blue' },
  'club-30': { startTime: [14, 30], endTime: [15, 0], color: 'orange' },
  'club-29_c': { startTime: [15, 0], endTime: [15, 30], color: 'purple' },
};

const gym1TimeInfo: {
  [key in Booth['booth_id']]: {
    startTime: [number, number];
    endTime: [number, number];
    color: EventData['color'];
  };
} = {
  // "grade-1a": { startTime: [9, 15], endTime: [10, 15] },
  // "grade-2a": { startTime: [10, 15], endTime: [11, 15] },
  // "volu-19": { startTime: [10, 40], endTime: [11, 0] },
  // "volu-21": { startTime: [11, 0], endTime: [11, 40] },
  // "club-29_b": { startTime: [11, 40], endTime: [13, 40] },
  // "club-31_b": { startTime: [14, 0], endTime: [14, 30] },
  // "club-30": { startTime: [14, 30], endTime: [15, 0] },
  // "club-29_c": { startTime: [15, 0], endTime: [15, 30] },
};

export default async function StagePage() {
  const events: EventData[] = [
    ...(await Promise.all(
      Object.entries(musicTimeInfo).map(
        async ([id, { startTime, endTime, color }]) => ({
          startTime,
          endTime,
          id,
          name: (await getAllBooths()).find(
            item => item.booth_id === id.split('_')[0]
          )?.booth_name as string,
          color,
          stage: 'music' as const,
        })
      )
    )),

    ...(await Promise.all(
      Object.entries(gym1TimeInfo).map(
        async ([id, { startTime, endTime, color }]) => ({
          startTime,
          endTime,
          id,
          name: (await getAllBooths()).find(
            item => item.booth_id === id.split('_')[0]
          )?.booth_name as string,
          color,
          stage: 'gym1' as const,
        })
      )
    )),
  ];
  return (
    <main style={{ padding: '20px' }}>
      <h1>イベントタイムテーブル</h1>
      <Timetable
        events={events}
        tableStartTime={[9, 0]}
        tableEndTime={[15, 30]}
        pixelPer30Minutes={60}
      />
    </main>
  );
}
