import { renderHook, act } from "@testing-library/react";
import useSearchPlaces from "@/hooks/useSearchPlaces";
import { UseFormSetValue } from "react-hook-form";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { z } from "zod";
import { orderSchema } from "@/lib/utils";

jest.mock("use-places-autocomplete", () => ({
  __esModule: true,
  default: jest.fn(),
  getGeocode: jest.fn(),
  getLatLng: jest.fn(),
}));

const formSchema = orderSchema;

describe("useSearchPlaces", () => {
  const mockSetValue: UseFormSetValue<z.infer<typeof formSchema>> = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePlacesAutocomplete as jest.Mock).mockReturnValue({
      ready: true,
      value: "",
      suggestions: { status: "OK", data: [] },
      setValue: jest.fn(),
      clearSuggestions: jest.fn(),
    });
    (getGeocode as jest.Mock).mockResolvedValue([
      { geometry: { location: { lat: 10, lng: 20 } } },
    ]);
    (getLatLng as jest.Mock).mockResolvedValue({ lat: 10, lng: 20 });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSearchPlaces(mockSetValue));

    expect(result.current.ready).toBe(true);
    expect(result.current.value).toBe("");
    expect(result.current.status).toBe("OK");
    expect(result.current.data).toEqual([]);
    expect(result.current.inputTouched).toBe(false);
  });

  it("should handle input change", () => {
    const { result } = renderHook(() => useSearchPlaces(mockSetValue));
    const inputVal = "New Address";

    act(() => {
      result.current.handleInput(inputVal);
    });

    expect(result.current.inputTouched).toBe(true);
    expect(usePlacesAutocomplete().setValue).toHaveBeenCalledWith(inputVal);
  });

  it("should handle select address", async () => {
    const { result } = renderHook(() => useSearchPlaces(mockSetValue));
    const address = "123 Main St";

    await act(async () => {
      await result.current.handleSelect(address);
    });

    expect(usePlacesAutocomplete().setValue).toHaveBeenCalledWith(
      address,
      false
    );
    expect(usePlacesAutocomplete().clearSuggestions).toHaveBeenCalled();
    expect(getGeocode).toHaveBeenCalledWith({ address });
    expect(getLatLng).toHaveBeenCalledWith({
      geometry: { location: { lat: 10, lng: 20 } },
    });
    expect(mockSetValue).toHaveBeenCalledWith("address", address);
    expect(mockSetValue).toHaveBeenCalledWith("lat", 10);
    expect(mockSetValue).toHaveBeenCalledWith("lng", 20);
  });
});
