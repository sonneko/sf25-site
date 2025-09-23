import { type IndexData } from '@/assets-types/Index';
import { create } from 'zustand';
import type DataStore from '@/store/stores';

interface BlogsStore extends DataStore<IndexData["blogs"]> {
  data: IndexData['blogs'] | null;
  setData: (data: IndexData['blogs']) => void;
};

const useBlogs =  create<BlogsStore>((set) => ({
    data: null,
    setData: (data) => set(() => ({ data }))
}));

export default useBlogs;