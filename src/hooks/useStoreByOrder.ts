import { generateRandomStores } from "@/lib/utils";
import { create } from "zustand";

const useStoreByOrder  = create<StoreByOrder>((set) => ({
  stores: [],
  generateStores: (lat: number, lng: number, numStores: number) => {
    const newStores = generateRandomStores(lat, lng, numStores);
    set({ stores: newStores });
  },
}));

export default useStoreByOrder ;
