import { renderHook, act } from "@testing-library/react";
import useStoreDirections from "@/hooks/useStoreDirections";
import { useOrderStore, useStoreByOrder } from "@/hooks";
import { getDirections } from "@/lib/utils";
import { Store } from "@/types";

jest.mock("@/hooks/useOrderStore");
jest.mock("@/hooks/useStoreByOrder");
jest.mock("@/lib/utils");

describe("useStoreDirections", () => {
  const mockOrder = { order: { lat: 10, lng: 20 } };
  const mockStoreByOrder = {
    filteredStores: [],
    generateStores: jest.fn(),
    directions: [] as { storeId: string; directions: { routes: never[] } }[],
    setDirections: jest.fn(),
    setSelectedStoreId: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useOrderStore as unknown as jest.Mock).mockReturnValue(mockOrder);
    (useStoreByOrder as unknown as jest.Mock).mockReturnValue(mockStoreByOrder);
  });

  it("should initialize and generate stores", () => {
    renderHook(() => useStoreDirections());
    expect(mockStoreByOrder.generateStores).toHaveBeenCalledWith(
      mockOrder.order.lat,
      mockOrder.order.lng,
      25
    );
  });

  it("should handle toggle collapse", async () => {
    const { result } = renderHook(() => useStoreDirections());
    const mockStore: Store = {
      storeId: "store1",
      coordinates: { lat: 30, lng: 40 },
      storeName: "Store 1",
      isOpen: true,
    };

    await act(async () => {
      result.current.handleToggleCollapse(mockStore);
    });

    expect(result.current.openStoreId).toBe("store1");
    expect(mockStoreByOrder.setSelectedStoreId).toHaveBeenCalledWith("store1");
  });

  it("should get store directions", () => {
    const mockDirections = { storeId: "store1", directions: { routes: [] } };
    mockStoreByOrder.directions = [mockDirections];

    const { result } = renderHook(() => useStoreDirections());

    const directions = result.current.getStoreDirections("store1");
    expect(directions).toEqual(mockDirections.directions);
  });

  it("should set loading state and fetch directions", async () => {
    const mockGetDirections = getDirections as jest.Mock;
    const mockDirectionsResult = { routes: [] };
    mockGetDirections.mockResolvedValue(mockDirectionsResult);

    const { result } = renderHook(() => useStoreDirections());

    await act(async () => {
      await result.current.fetchAndSetDirections(
        "store1",
        { lat: 10, lng: 20 },
        { lat: 30, lng: 40 }
      );
    });

    expect(result.current.loading).toBe(null);
    expect(mockStoreByOrder.setDirections).toHaveBeenCalledWith(
      "store1",
      mockDirectionsResult
    );
  });
});
