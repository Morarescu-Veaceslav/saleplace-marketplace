import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SidebarStore } from './sidebar.types';


export const sidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isCollapsed: false,
      setCollapsed: (value: boolean) => set({ isCollapsed: value }),
    }),
    {
      name: 'sidebar',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
