import create from 'zustand';

export interface searchFiealdType {
  searchFields: string;
  setFeilds: (name: string) => void;
  productData: any[][];
  setProductData: (items: any) => void;
}

export const useSearchStore = create<searchFiealdType>((set, get) => ({
  searchFields: '',
  setFeilds: (searchFields) =>
    set((state) => ({
      ...state,
      searchFields,
    })),
  productData: [],
  setProductData: (productData) => set((state) => ({ ...state, productData })),
}));
