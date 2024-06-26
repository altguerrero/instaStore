import { renderHook, act } from "@testing-library/react";
import useStoreByOrder from "@/hooks/useStoreByOrder";
import {
  applyFilters,
  generateRandomStores,
  getOrderLocation,
} from "@/lib/utils";

jest.mock("@/lib/utils", () => ({
  applyFilters: jest.fn(),
  filterSchema: jest.requireActual("zod").object({}),
  generateRandomStores: jest.fn(),
  getOrderLocation: jest.fn(),
}));

describe("useStoreByOrder", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (generateRandomStores as jest.Mock).mockReturnValue([]);
    (applyFilters as jest.Mock).mockReturnValue([]);
    (getOrderLocation as jest.Mock).mockReturnValue({ lat: 0, lng: 0 });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useStoreByOrder());

    expect(result.current.stores).toEqual([]);
    expect(result.current.filteredStores).toEqual([]);
    expect(result.current.filters).toEqual({});
    expect(result.current.directions).toEqual([]);
    expect(result.current.selectedStoreId).toBeNull();
  });

  it("should generate stores and apply filters", () => {
    const { result } = renderHook(() => useStoreByOrder());
    const mockStores = [{ id: "1" }, { id: "2" }];

    (generateRandomStores as jest.Mock).mockReturnValue(mockStores);
    (applyFilters as jest.Mock).mockReturnValue(mockStores);

    act(() => {
      result.current.generateStores(10, 20, 5);
    });

    expect(result.current.stores).toEqual(mockStores);
    expect(result.current.filteredStores).toEqual(mockStores);
    expect(generateRandomStores).toHaveBeenCalledWith(10, 20, 5);
    expect(applyFilters).toHaveBeenCalledWith(
      mockStores,
      result.current.filters,
      { lat: 10, lng: 20 }
    );
  });

  it("should set filters and update filtered stores", () => {
    const { result } = renderHook(() => useStoreByOrder());
    const mockFilters = { isOpen: true };
    const mockFilteredStores = [{ id: "1" }];

    (applyFilters as jest.Mock).mockReturnValue(mockFilteredStores);

    act(() => {
      result.current.setFilters(mockFilters);
    });

    expect(result.current.filters).toEqual(mockFilters);
    expect(result.current.filteredStores).toEqual(mockFilteredStores);
    expect(applyFilters).toHaveBeenCalledWith(
      result.current.stores,
      mockFilters,
      { lat: 0, lng: 0 }
    );
  });

  it("should set directions for a store", () => {
    const { result } = renderHook(() => useStoreByOrder());
    const mockDirections = {
      routes: [],
    } as unknown as google.maps.DirectionsResult;

    act(() => {
      result.current.setDirections("1", mockDirections);
    });

    expect(result.current.directions).toEqual([
      { storeId: "1", directions: mockDirections },
    ]);
  });

  it("should set the selected store id", () => {
    const { result } = renderHook(() => useStoreByOrder());

    act(() => {
      result.current.setSelectedStoreId("1");
    });

    expect(result.current.selectedStoreId).toEqual("1");

    act(() => {
      result.current.setSelectedStoreId(null);
    });

    expect(result.current.selectedStoreId).toBeNull();
  });
});
