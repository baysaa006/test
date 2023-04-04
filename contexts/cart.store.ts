import create from 'zustand';

interface paymentArray {
  description: string;
  link: string;
  logo: string;
  name: string;
}

export interface ICart {
  count: number;
  clear: () => void;
  add: (item: any) => void;
  catchId: string;
  setCategoryID: (name: string) => void;
  subCategoryId: string;
  setSubCategoryId: (subCategoryId: string) => void;
  catchPaymentArray: paymentArray[];
  setCatchPaymentArray: (items: any) => void;
  historyId: string;
  setHistoryOrderID: (items: string) => void;
}

export const useCartStore = create<ICart>((set, get) => ({
  count: 0,
  clear: () => set((state) => ({ count: state.count - 1 })),
  add: (count) => set({ count: count }),
  catchId: '',
  setCategoryID: (catchId) =>
    set((state) => ({
      ...state,
      catchId,
    })),
  historyId: '',
  setHistoryOrderID: (historyId) => set((state) => ({ ...state, historyId })),

  subCategoryId: '',
  setSubCategoryId: (subCategoryId) =>
    set((state) => ({
      ...state,
      subCategoryId,
    })),
  catchPaymentArray: [],
  setCatchPaymentArray: (catchPaymentArray) => set((state) => ({ ...state, catchPaymentArray })),
}));
