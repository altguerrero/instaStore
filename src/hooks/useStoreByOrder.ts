import { generateRandomStores } from "@/lib/utils";
import { create } from "zustand";

const useStoreByOrder = create<StoreByOrder>((set) => ({
  stores: [],
  directions: [],
  selectedStoreId: null,
  generateStores: (lat: number, lng: number, numStores: number) => {
    const newStores = generateRandomStores(lat, lng, numStores);
    set({ stores: newStores });
  },
  setDirections: (
    storeId: string,
    directions: google.maps.DirectionsResult
  ) => {
    set((state) => {
      const newDirections = state.directions.filter(
        (direction) => direction.storeId !== storeId
      );
      newDirections.push({ storeId, directions });
      return { directions: newDirections };
    });
  },
  setSelectedStoreId: (storeId: string | null) => {
    set({ selectedStoreId: storeId });
  },
}));

export default useStoreByOrder;
