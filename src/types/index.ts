import { filterSchema, orderSchema } from "@/lib/utils";
import { z } from "zod";

const storeSchema = orderSchema;

export type LatLngLiteral = google.maps.LatLngLiteral;
export type MapOptions = google.maps.MapOptions;
export type Coordinates = LatLngLiteral;
export type DirectionsRendererItemsRef = React.MutableRefObject<
  {
    renderer: google.maps.DirectionsRenderer;
    id: string;
  }[]
>;

export interface Store {
  storeId: string;
  storeName: string;
  isOpen: boolean;
  coordinates: Coordinates;
}

type OrderFormData = z.infer<typeof storeSchema>;

export interface OrderState {
  order: OrderFormData;
  setOrder: (order: OrderFormData) => void;
}

export interface Directions {
  storeId: string;
  directions: google.maps.DirectionsResult | null;
}

export interface StoreByOrder {
  stores: Store[];
  filteredStores: Store[];
  filters: z.infer<typeof filterSchema>;
  directions: Directions[];
  selectedStoreId: string | null;
  generateStores: (lat: number, lng: number, numStores: number) => void;
  setFilters: (filters: z.infer<typeof filterSchema>) => void;
  setDirections: (
    storeId: string,
    directions: google.maps.DirectionsResult
  ) => void;
  setSelectedStoreId: (storeId: string | null) => void;
}
