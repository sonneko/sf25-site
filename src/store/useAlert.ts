import { create } from 'zustand';

export type Alert = {
  status: 'info' | 'error' | 'success';
  message: string;
};

interface AlertStore {
  now: Alert | null;
  set: (alert: Alert) => void;
}

const useAlert = create<AlertStore>(set => ({
  now: null,
  set: alert =>
    set(() => {
      setTimeout(() => set(() => ({ now: null })), 5000);
      return { now: alert, foldSignal: false };
    }),
}));

export default useAlert;
