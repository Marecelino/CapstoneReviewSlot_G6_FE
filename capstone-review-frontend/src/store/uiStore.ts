import { create } from 'zustand';

interface UiState {
  sidebarOpen: boolean;
  globalLoading: boolean;

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: true,
  globalLoading: false,

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  setGlobalLoading: (loading) => set({ globalLoading: loading }),
}));
