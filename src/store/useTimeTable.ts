import { type IndexData } from '@/assets-types/Index';
import { create } from 'zustand';
import type DataStore from '@/store/stores';

interface TimeTableStore extends DataStore<IndexData['timeTable']> {
  data: IndexData['timeTable'] | null;
  setData: (data: IndexData['timeTable']) => void;
}

const useTimeTable = create<TimeTableStore>(set => ({
  data: null,
  setData: data => set(() => ({ data })),
}));

export default useTimeTable;
