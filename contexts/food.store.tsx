import create from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval'; // can use anything: IndexedDB, Ionic Storage, etc.
import IOrders, { IOrderReview } from '../types/order';

// Custom storage object
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

export function generateUUID() {
  var d = new Date().getTime(); //Timestamp
  var d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export const useStore = create(
  persist(
    (set, _get) => ({
      fishes: 0,
      addAFish: (fish: any) => set({ fishes: fish }),
      completeOrderId: '',
      setCompleteOrderID: (items: string) => set({ completeOrderId: items }),
    }),
    {
      name: 'food-storage', // unique name
      getStorage: () => storage,
    },
  ),
);
interface PushData {
  variantsId: string;
  uuid: string;
  name: string;
  salePrice: number;
  quantity: number;
  image: any;
  basesPrice: number;
  status: string;
  comment?: string;
  unitType: string;
  unitValue: string;
  options: any[];
  productId: string;
}

interface IBranch {
  address: string;
  background: any;
  banner: any;
  dayClose: any;
  description: string;
  email: string;
  id: string;
  logo: string;
  name: string;
  website?: string;
  phone: any;
  tags: any[];
  timetable: any;
  type: string;
}

interface IParticipantBuyer {
  advancePayment: boolean;
  branch: IBranch;
  id: string;
  channel: string;
  menu: any;
  waiter: any;
  payments: any[];
  services: any[];
  vat: boolean;
}

interface StoreFoods {
  foods: PushData[];
  addFoods: (foods: PushData[]) => void;
  editFoods: (foods: PushData[]) => void;
  createOrderId: string;
  setCreateOrderID: (createOrderId: string) => void;
  groupId: string;
  setGroupId: (groupId: string) => void;
  visibleShow: boolean;
  setVisibleShow: (visibleShow: boolean) => void;
  changeLanguages: string;
  setChangeLanguages: (changeLanguages: string) => void;
  participant?: IParticipantBuyer;
  setParticipant: (participant: IParticipantBuyer) => void;
  getSale?: IOrders[];
  setSale: (getSale: IOrders[]) => void;
  getOrderReviewsByLimit?: IOrderReview[];
  setOrderReviewsByLimit: (getOrderReviews: IOrderReview[]) => void;
}

export const useStoreFoods = create<StoreFoods>(
  persist(
    (set, get) => ({
      foods: [],
      participant: undefined,
      addFoods: (items) => set({ foods: [...get().foods, ...items] }),
      editFoods: (items) => set({ foods: [...items] }),
      createOrderId: '',
      setCreateOrderID: (items) => set({ createOrderId: items }),
      groupId: '',
      setGroupId: (item) => set({ groupId: item }),
      visibleShow: false,
      setVisibleShow: (items) => set({ visibleShow: items }),
      changeLanguages: '',
      setChangeLanguages: (item) => set({ changeLanguages: item }),
      setParticipant: (data) => set({ participant: data }),
      setSale: (data) => set({ getSale: data }),
      setOrderReviewsByLimit: (data) => set({ getOrderReviewsByLimit: data }),
    }),
    {
      name: 'food-storage-array', // unique name
      getStorage: () => storage,
    },
  ),
);
