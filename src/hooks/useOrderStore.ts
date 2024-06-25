import { create } from "zustand";

const useOrderStore = create<OrderState>((set) => ({
  order: {
    order_id: "",
    address: "",
    lat: 0,
    lng: 0,
  },
  setOrder: (order) => set({ order }),
}));

export default useOrderStore;
