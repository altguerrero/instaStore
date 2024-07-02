import { Store } from "@/types";
import { getRandomCoordinate } from "./getRandomCoordinate";

/**
 * Genera un conjunto de tiendas aleatorias.
 * @param {number} lat - Latitud base.
 * @param {number} lng - Longitud base.
 * @param {number} [numStores=10] - Número de tiendas a generar.
 * @returns {Store[]} - Array de tiendas generadas.
 */
export const generateRandomStores = (
  lat: number,
  lng: number,
  numStores = 10
): Store[] => {
  const stores: Store[] = [];
  const storeNames = ["Store A", "Store B", "Store C", "Store D", "Store E"];
  const randomBoolean = () => Math.random() >= 0.5;

  const ranges = [2, 4, 6];
  ranges.forEach((range, index) => {
    const randomCoord = getRandomCoordinate({ lat, lng }, range);
    stores.push({
      storeId: `store_${index + 1}`,
      storeName: storeNames[Math.floor(Math.random() * storeNames.length)],
      isOpen: randomBoolean(),
      coordinates: {
        lat: Number(randomCoord.lat.toFixed(6)),
        lng: Number(randomCoord.lng.toFixed(6)),
      },
    });
  });

  for (let i = ranges.length; i < numStores; i++) {
    const range = ranges[Math.floor(Math.random() * ranges.length)];
    const randomCoord = getRandomCoordinate({ lat, lng }, range);

    stores.push({
      storeId: `store_${i + 1}`,
      storeName: storeNames[Math.floor(Math.random() * storeNames.length)],
      isOpen: randomBoolean(),
      coordinates: {
        lat: Number(randomCoord.lat.toFixed(6)),
        lng: Number(randomCoord.lng.toFixed(6)),
      },
    });
  }

  return stores;
};
