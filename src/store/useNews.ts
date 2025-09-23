import { type IndexData } from '@/assets-types/Index';
import { create } from 'zustand';
import type DataStore from '@/store/stores';

interface NewsStore extends DataStore<IndexData["news"]> {
  data: IndexData['news'] | null;
  setData: (data: IndexData['news']) => void;
};

const useNews =  create<NewsStore>((set) => ({
    data: null,
    setData: (data) => set(() => ({ data }))
}));

export default useNews;
