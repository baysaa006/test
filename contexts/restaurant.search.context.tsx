import create from 'zustand';
interface FilterType {
  type: string;
  text: string;
}
export interface searchFiealdType {
  searchFields: string;
  setFeilds: (name: string) => void;
  productData: any[][];
  setProductData: (items: any) => void;
  filter: FilterType;
  setFilter: (type: FilterType) => void;
}

export const useRestaurantSearchStore = create<searchFiealdType>((set, get) => ({
  searchFields: '',
  filter: {
    type: '',
    text: '',
  },
  setFilter: (filter) => set((state) => ({ ...state, filter: filter, searchFields: '' })),
  setFeilds: (searchFields) =>
    set((state) => ({
      ...state,
      searchFields,
      filter: {
        type: '',
        text: '',
      },
    })),
  productData: [],
  setProductData: (productData) => set((state) => ({ ...state, productData })),
}));
