import { renderHook } from "@testing-library/react";
import useMap from "@/hooks/useMap";
import { useOrderStore, useStoreByOrder } from "@/hooks";
import { getDirections } from "@/lib/utils";

jest.mock("@/hooks/useOrderStore");
jest.mock("@/hooks/useStoreByOrder");
jest.mock("@/lib/utils");

const mockOrder = {
  order_id: "1",
  address: "123 Main St",
  lat: 10,
  lng: 20,
};

const mockDirectionsResult = {
  routes: [
    {
      legs: [
        {
          distance: { text: "1 km", value: 1000 },
          duration: { text: "10 mins", value: 600 },
          end_address: "456 Store St",
          start_address: "123 Main St",
          steps: [],
          via_waypoints: [],
        },
      ],
    },
  ],
} as any;

describe("useMap", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useOrderStore as unknown as jest.Mock).mockReturnValue({
      order: mockOrder,
    });
    (useStoreByOrder as unknown as jest.Mock).mockReturnValue({
      directions: [],
      selectedStoreId: null,
    });
    (getDirections as jest.Mock).mockResolvedValue(mockDirectionsResult);
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useMap());

    expect(result.current.orderLocation).toEqual({ lat: 10, lng: 20 });
    expect(result.current.options).toEqual({
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
    });
    expect(result.current.center).toEqual({ lat: 10, lng: 20 });
    expect(result.current.selectedRoute).toBeNull();
    expect(result.current.activeDirection).toBeNull();
  });
});
