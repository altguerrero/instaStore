import { create } from "zustand";
import { z } from "zod";
import {
  applyFilters,
  filterSchema,
  generateRandomStores,
  getOrderLocation,
} from "@/lib/utils";

const useStoreByOrder = create<StoreByOrder>((set, get) => ({
  stores: [],
  filteredStores: [],
  filters: {},
  directions: [],
  selectedStoreId: null,
  generateStores: (lat: number, lng: number, numStores: number) => {
    const newStores = generateRandomStores(lat, lng, numStores);
    const { filters } = get();
    const orderLocation = { lat, lng };
    set({
      stores: newStores,
      filteredStores: applyFilters(newStores, filters, orderLocation),
    });
  },
  setFilters: (filters: z.infer<typeof filterSchema>) => {
    const { stores } = get();
    const orderLocation = getOrderLocation();
    set({
      filters,
      filteredStores: applyFilters(stores, filters, orderLocation),
    });
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
