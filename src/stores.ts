import { create } from "zustand";
import { AuctionInfoFormData } from "./entities/Auction";

interface SellingPageStore {
  step: number;
  data: AuctionInfoFormData;
  setStep: (step: number) => void;
  setData: (data: AuctionInfoFormData) => void;
}

export const useSellingPageStore = create<SellingPageStore>((set) => ({
  step: 0,
  data: {} as AuctionInfoFormData,
  setStep: (step) => set({ step }),
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
}));
