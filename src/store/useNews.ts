import { type IndexData } from '@/assets-types/Index';
import { create } from 'zustand';

interface DataStore<T> {
    getAll(): T 
}

interface NewsStore extends DataStore<IndexData["news"]> {
  readonly news: IndexData['news'] | null;
  getAll: () => IndexData['news'];
  getUntileN: (limit: number) => IndexData['news'];
};
const useNewsStore = create<NewsStore>((set) => {
    news: null,
    
})

interface BlogStore extends DataStore<IndexData["blogs"]> {
  readonly blogs: IndexData['blogs'] | null;
  getAll: () => IndexData['blogs'];
  getById: () => IndexData['blogs'];
};

interface TimeTableStore extends DataStore<IndexData["timeTable"]> {
  readonly timeTable: IndexData['timeTable'] | null;
  getAll: () => IndexData['timeTable'];
  getById: () => IndexData['timeTable'];
};

interface LostItemStore extends DataStore<IndexData["lostItems"]> {
  readonly lostItems: IndexData['lostItems'] | null;
  getAll: () => IndexData['lostItems'];
  getById: () => IndexData['lostItems'];
};


const useStore = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}));

export default useStore;
