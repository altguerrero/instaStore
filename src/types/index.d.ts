const storeSchema = orderSchema();

declare interface Store {
  storeId: string;
  storeName: string;
  isOpen: boolean;
  coordinates: {
    lat: string;
    lng: string;
  };
}

declare interface Coordinates {
  lat: number;
  lng: number;
}

type OrderFormData = z.infer<typeof storeSchema>;

declare interface OrderState {
  order: OrderFormData;
  setOrder: (order: OrderFormData) => void;
}

declare interface StoreByOrder {
  stores: Store[];
  generateStores: (lat: number, lng: number, numStores: number) => void;
}
