import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const orderSchema = () =>
  z.object({
    order_id: z
      .string()
      .min(5, { message: "Order ID must be at least 5 characters long." })
      .max(10, { message: "Order ID must be at most 10 characters long." }),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters long." })
      .max(1000, { message: "Address must be at most 100 characters long." }),
    lat: z.number(),
    lng: z.number(),
  });

export const generateRandomStores = (
  lat: number,
  lng: number,
  numStores = 10
): Store[] => {
  const stores: Store[] = [];
  const storeNames = ["Store A", "Store B", "Store C", "Store D", "Store E"];
  const randomBoolean = () => Math.random() >= 0.5;

  function getRandomCoordinate(
    baseCoord: Coordinates,
    range: number
  ): Coordinates {
    const earthRadiusKm = 6371;
    const delta = (Math.random() * range) / earthRadiusKm;

    const randomAngle = Math.random() * 2 * Math.PI;
    const deltaLat = delta * Math.cos(randomAngle);
    const deltaLng =
      (delta * Math.sin(randomAngle)) /
      Math.cos((baseCoord.lat * Math.PI) / 180);

    return {
      lat: baseCoord.lat + deltaLat * (180 / Math.PI),
      lng: baseCoord.lng + deltaLng * (180 / Math.PI),
    };
  }

  // Ensure at least one store in each range
  const ranges = [2, 4, 6];
  ranges.forEach((range, index) => {
    const randomCoord = getRandomCoordinate({ lat, lng }, range);
    stores.push({
      storeId: `store_${index + 1}`,
      storeName: storeNames[Math.floor(Math.random() * storeNames.length)],
      isOpen: randomBoolean(),
      coordinates: {
        lat: randomCoord.lat.toFixed(6),
        lng: randomCoord.lng.toFixed(6),
      },
    });
  });

  // Generate the remaining stores randomly within the given ranges
  for (let i = ranges.length; i < numStores; i++) {
    const range = ranges[Math.floor(Math.random() * ranges.length)];
    const randomCoord = getRandomCoordinate({ lat, lng }, range);

    stores.push({
      storeId: `store_${i + 1}`,
      storeName: storeNames[Math.floor(Math.random() * storeNames.length)],
      isOpen: randomBoolean(),
      coordinates: {
        lat: randomCoord.lat.toFixed(6),
        lng: randomCoord.lng.toFixed(6),
      },
    });
  }

  return stores;
};
