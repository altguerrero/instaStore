const storeSchema = orderSchema();

declare type LatLngLiteral = google.maps.LatLngLiteral;
declare type MapOptions = google.maps.MapOptions;
declare type Coordinates = LatLngLiteral;
declare type DirectionsRendererItemsRef = React.MutableRefObject<
  {
    renderer: google.maps.DirectionsRenderer;
    id: string;
  }[]
>;

declare interface Store {
  storeId: string;
  storeName: string;
  isOpen: boolean;
  coordinates: Coordinates;
}

type OrderFormData = z.infer<typeof storeSchema>;

declare interface OrderState {
  order: OrderFormData;
  setOrder: (order: OrderFormData) => void;
}

declare interface Directions {
  storeId: string;
  directions: google.maps.DirectionsResult | null;
}

declare interface StoreByOrder {
  stores: Store[];
  directions: Directions[];
  selectedStoreId: string | null;
  generateStores: (lat: number, lng: number, numStores: number) => void;
  setDirections: (
    storeId: string,
    directions: google.maps.DirectionsResult
  ) => void;
  setSelectedStoreId: (storeId: string | null) => void;
}
