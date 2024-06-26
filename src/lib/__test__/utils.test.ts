import { describe, it, expect, jest } from "@jest/globals";
import {
  cn,
  orderSchema,
  filterSchema,
  generateRandomStores,
  getDirections,
  applyFilters,
  getOrderLocation,
} from "../utils";
import { useOrderStore } from "@/hooks";
import { OrderState, LatLngLiteral, Store } from "@/types";
const mockGoogleMapsAPI = () => {
  globalThis.google = {
    maps: {
      DirectionsService: class {
        route(
          _request: google.maps.DirectionsRequest,
          callback: (
            result: google.maps.DirectionsResult,
            status: google.maps.DirectionsStatus
          ) => void
        ) {
          const result = {
            routes: [
              {
                legs: [
                  {
                    distance: { text: "1 km", value: 1000 },
                    duration: { text: "10 mins", value: 600 },
                    end_address: "1234 Store Street, Store City, Store Country",
                  },
                ],
              },
            ],
          } as google.maps.DirectionsResult;
          callback(result, "OK" as google.maps.DirectionsStatus.OK);
        }
      },
      TravelMode: {
        DRIVING: "DRIVING",
      },
    },
  } as unknown as typeof globalThis.google;
};

mockGoogleMapsAPI();

describe("utils.ts tests", () => {
  describe("cn function", () => {
    it("should combine class names correctly", () => {
      const result = cn("class1", "class2", { class3: true, class4: false });
      expect(result).toBe("class1 class2 class3");
    });
  });

  describe("orderSchema", () => {
    it("should validate a correct order", () => {
      const validOrder = {
        order_id: "ORD123",
        address: "123 Main St",
        lat: 10,
        lng: 20,
      };
      const result = orderSchema.safeParse(validOrder);
      expect(result.success).toBe(true);
    });

    it("should invalidate an incorrect order", () => {
      const invalidOrder = {
        order_id: "ORD",
        address: "123",
        lat: NaN,
        lng: NaN,
      };
      const result = orderSchema.safeParse(invalidOrder);
      expect(result.success).toBe(false);
    });
  });

  describe("filterSchema", () => {
    it("should validate a correct filter", () => {
      const validFilter = { isOpen: true, distance: "2km" };
      const result = filterSchema.safeParse(validFilter);
      expect(result.success).toBe(true);
    });

    it("should invalidate an incorrect filter", () => {
      const invalidFilter = { isOpen: "yes", distance: "10km" };
      const result = filterSchema.safeParse(invalidFilter);
      expect(result.success).toBe(false);
    });
  });

  describe("generateRandomStores function", () => {
    it("should generate the correct number of stores", () => {
      const stores = generateRandomStores(10, 20, 5);
      expect(stores.length).toBe(5);
    });

    it("should generate stores with valid coordinates", () => {
      const stores = generateRandomStores(10, 20, 5);
      stores.forEach((store) => {
        expect(store.coordinates.lat).toBeGreaterThan(0);
        expect(store.coordinates.lng).toBeGreaterThan(0);
      });
    });
  });

  describe("getDirections function", () => {
    it("should return directions result", async () => {
      const origin: LatLngLiteral = { lat: 10, lng: 20 };
      const destination: LatLngLiteral = { lat: 30, lng: 40 };
      const result = await getDirections(origin, destination);
      expect(result).not.toBeNull();
      expect(result?.routes[0].legs[0].distance?.text).toBe("1 km");
      expect(result?.routes[0].legs[0].duration?.text).toBe("10 mins");
    });
  });

  describe("applyFilters function", () => {
    it("should filter stores correctly by isOpen", () => {
      const stores: Store[] = [
        {
          storeId: "1",
          storeName: "Store 1",
          isOpen: true,
          coordinates: { lat: 10, lng: 20 },
        },
        {
          storeId: "2",
          storeName: "Store 2",
          isOpen: false,
          coordinates: { lat: 30, lng: 40 },
        },
      ];
      const filters = { isOpen: true };
      const filteredStores = applyFilters(stores, filters, {
        lat: 10,
        lng: 20,
      });
      expect(filteredStores.length).toBe(1);
      expect(filteredStores[0].storeId).toBe("1");
    });

    it("should filter stores correctly by distance", () => {
      const stores: Store[] = [
        {
          storeId: "1",
          storeName: "Store 1",
          isOpen: true,
          coordinates: { lat: 10, lng: 20 },
        },
        {
          storeId: "2",
          storeName: "Store 2",
          isOpen: true,
          coordinates: { lat: 10.02, lng: 20.02 },
        },
      ];
      const filters = { distance: "2km" as "2km" | "4km" | "6km" };
      const filteredStores = applyFilters(stores, filters, {
        lat: 10,
        lng: 20,
      });
      expect(filteredStores.length).toBe(1);
      expect(filteredStores[0].storeId).toBe("1");
    });

    it("should filter out stores that are too far", () => {
      const stores: Store[] = [
        {
          storeId: "1",
          storeName: "Store 1",
          isOpen: true,
          coordinates: { lat: 10, lng: 20 },
        },
        {
          storeId: "2",
          storeName: "Store 2",
          isOpen: true,
          coordinates: { lat: 10.05, lng: 20.05 },
        },
      ];
      const filters = { distance: "2km" as "2km" | "4km" | "6km" };
      const filteredStores = applyFilters(stores, filters, {
        lat: 10,
        lng: 20,
      });
      expect(filteredStores.length).toBe(1);
      expect(filteredStores[0].storeId).toBe("1");
    });
  });

  describe("getOrderLocation function", () => {
    it("should return the correct order location", () => {
      const mockOrderStore: OrderState = {
        order: { order_id: "ORD123", address: "123 Main St", lat: 10, lng: 20 },
        setOrder: jest.fn(),
      };
      jest.spyOn(useOrderStore, "getState").mockReturnValue(mockOrderStore);
      const location = getOrderLocation();
      expect(location.lat).toBe(10);
      expect(location.lng).toBe(20);
      jest.restoreAllMocks();
    });
  });
});
