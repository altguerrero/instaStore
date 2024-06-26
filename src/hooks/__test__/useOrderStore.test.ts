import { renderHook, act } from "@testing-library/react";
import useOrderStore from "@/hooks/useOrderStore";

describe("useOrderStore", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useOrderStore());

    expect(result.current.order).toEqual({
      order_id: "",
      address: "",
      lat: 0,
      lng: 0,
    });
  });

  it("should update the order state", () => {
    const { result } = renderHook(() => useOrderStore());

    const newOrder = {
      order_id: "123",
      address: "123 Main St",
      lat: 12.34,
      lng: 56.78,
    };

    act(() => {
      result.current.setOrder(newOrder);
    });

    expect(result.current.order).toEqual(newOrder);
  });
});
