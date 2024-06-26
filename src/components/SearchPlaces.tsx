import React, { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Command, CommandInput, CommandList, CommandItem } from "./ui/command";
import { z } from "zod";
import { cn, orderSchema } from "@/lib/utils";
import { useSearchPlaces } from "@/hooks";

const formSchema = orderSchema;

interface SearchPlacesProps {
  register: UseFormRegister<z.infer<typeof formSchema>>;
  setValue: UseFormSetValue<z.infer<typeof formSchema>>;
}

const SearchPlaces: React.FC<SearchPlacesProps> = ({ register, setValue }) => {
  const {
    ready,
    value,
    status,
    data,
    handleInput,
    handleSelect,
    inputTouched,
  } = useSearchPlaces(setValue);

  const [isFocused, setIsFocused] = useState(false);

  return (
    <Command
      className={cn("w-full border rounded-lg", {
        "border-primary border-2": isFocused,
      })}
    >
      <CommandInput
        {...register("address")}
        onValueChange={handleInput}
        disabled={!ready}
        placeholder="Search for a location"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <CommandList>
        {status === "OK" && data.length > 0
          ? data.map(({ place_id, description }) => (
              <CommandItem
                key={place_id}
                value={description}
                onSelect={() => handleSelect(description)}
              >
                {description}
              </CommandItem>
            ))
          : inputTouched && <CommandItem>No place found.</CommandItem>}
      </CommandList>
    </Command>
  );
};

export default SearchPlaces;
