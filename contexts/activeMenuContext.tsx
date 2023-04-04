import create from 'zustand';
interface activeMenuStore {
  menuItemId: number;
  checkKaraokeActive: boolean;
  setActiveMenu: (menuItemId: number) => void;
  setKaraokeActive: (checkKaraokeActive: boolean) => void;
}
export const useActiveMenuStore = create<activeMenuStore>((set, get) => ({
  menuItemId: 0,
  checkKaraokeActive: false,
  setActiveMenu: (menuItemId) => set((state) => ({ ...state, menuItemId })),
  setKaraokeActive: (checkKaraokeActive) => set((state) => ({ ...state, checkKaraokeActive })),
}));
