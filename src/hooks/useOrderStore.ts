import create from "zustand";
import { z } from "zod";
import { orderSchema } from "@/lib/utils";

const storeSchema = orderSchema();

type OrderFormData = z.infer<typeof storeSchema>;

interface OrderState {
  order: OrderFormData;
  setOrder: (order: OrderFormData) => void;
}

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
