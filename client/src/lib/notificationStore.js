import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  number: 0,
  setNumber: (number) => set({ number }),
}));