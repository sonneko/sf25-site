import { type IndexData } from '@/assets-types/Index';
import { create } from 'zustand';
import type DataStore from '@/store/stores';

interface LostItemsStore extends DataStore<IndexData["lostItems"]> {
  data: IndexData['lostItems'] | null;
  setData: (data: IndexData['lostItems']) => void;
};

const useLostItems =  create<LostItemsStore>((set) => ({
    data: null,
    setData: (data) => set(() => ({ data }))
}));

export default useLostItems;