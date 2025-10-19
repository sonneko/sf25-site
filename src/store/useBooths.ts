import { type BoothData } from '@/assets-types/Booth';
import { create } from 'zustand';
import type DataStore from '@/store/stores';

interface BoothsStore extends DataStore<BoothData> {
  data: BoothData | null;
  setData: (data: BoothData) => void;
}

const useBooths = create<BoothsStore>(set => ({
  data: null,
  setData: data => set(() => ({ data })),
}));

export default useBooths;
