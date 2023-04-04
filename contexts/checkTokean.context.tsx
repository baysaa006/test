import create from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

export interface tokeanFiealdType {
  tokeanData: any[][];
  setTokeanData: (items: any) => void;
}

// export const useTokeanStore = create<tokeanFiealdType>((set, get) => ({
//   tokeanData: [],
//   setTokeanData: (tokeanData) => set((state) => ({ ...state, tokeanData })),
// }));

export const useTokeanStore = create<tokeanFiealdType>(
  persist(
    (set, get) => ({
      tokeanData: [],
      setTokeanData: (tokeanData) => set((state) => ({ ...state, tokeanData })),
    }),
    {
      name: 'tokean-storage-array', // unique name
      getStorage: () => storage,
    },
  ),
);
