import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { orderSchema } from "@/lib/utils";

const formSchema = orderSchema();

const useSearchPlaces = (
  setValue: UseFormSetValue<z.infer<typeof formSchema>>
) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue: setSearchValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const [inputTouched, setInputTouched] = useState(false);

  const handleInput = (val: string) => {
    setSearchValue(val);
    if (!inputTouched) setInputTouched(true);
  };

  const handleSelect = async (address: string) => {
    setSearchValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      setValue("address", address);
      setValue("lat", lat);
      setValue("lng", lng);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return {
    ready,
    value,
    status,
    data,
    handleInput,
    handleSelect,
    inputTouched,
  };
};

export default useSearchPlaces;
