import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { useOrderStore } from "@/hooks";
import { Coordinates, LatLngLiteral, Store } from "@/types";

/**
 * Combina clases de forma condicional usando `clsx` y `tailwind-merge`.
 * @param {...ClassValue[]} inputs - Las clases a combinar.
 * @returns {string} - La cadena de clases combinadas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Esquema de validación para la orden.
 * @returns {z.ZodObject} - El esquema de validación para la orden.
 */
export const orderSchema = z.object({
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

/**
 * Esquema de validación para los filtros.
 * @type {z.ZodObject}
 */
export const filterSchema = z.object({
  isOpen: z.boolean().optional(),
  distance: z.enum(["2km", "4km", "6km"]).optional(),
});

/**
 * Genera coordenadas aleatorias dentro de un rango dado.
 * @param {Coordinates} baseCoord - La coordenada base.
 * @param {number} range - El rango en kilómetros.
 * @returns {Coordinates} - Las coordenadas generadas aleatoriamente.
 */
const getRandomCoordinate = (
  baseCoord: Coordinates,
  range: number
): Coordinates => {
  const earthRadiusKm = 6371;
  const delta = (Math.random() * range) / earthRadiusKm;

  const randomAngle = Math.random() * 2 * Math.PI;
  const deltaLat = delta * Math.cos(randomAngle);
  const deltaLng =
    (delta * Math.sin(randomAngle)) / Math.cos((baseCoord.lat * Math.PI) / 180);

  return {
    lat: baseCoord.lat + deltaLat * (180 / Math.PI),
    lng: baseCoord.lng + deltaLng * (180 / Math.PI),
  };
};

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

/**
 * Obtiene las direcciones entre dos puntos.
 * @param {LatLngLiteral} origin - Punto de origen.
 * @param {LatLngLiteral} destination - Punto de destino.
 * @returns {Promise<google.maps.DirectionsResult | null>} - Resultado de las direcciones.
 */
export const getDirections = (
  origin: LatLngLiteral,
  destination: LatLngLiteral
): Promise<google.maps.DirectionsResult | null> => {
  return new Promise((resolve, reject) => {
    if (!origin || !destination) {
      reject(new Error("Origin and destination are required"));
      return;
    }

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          resolve(result);
        } else {
          reject(new Error(`Failed to get directions: ${status}`));
        }
      }
    );
  });
};

/**
 * Calcula la distancia entre dos puntos utilizando la fórmula del haversine.
 * @param {number} lat1 - Latitud del primer punto.
 * @param {number} lng1 - Longitud del primer punto.
 * @param {number} lat2 - Latitud del segundo punto.
 * @param {number} lng2 - Longitud del segundo punto.
 * @returns {number} - Distancia en kilómetros.
 */
const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const toRad = (x: number) => (x * Math.PI) / 180;

  const Earthradius = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Earthradius * c;
};

/**
 * Aplica filtros a un conjunto de tiendas.
 * @param {Store[]} stores - Tiendas a filtrar.
 * @param {z.infer<typeof filterSchema>} filters - Filtros a aplicar.
 * @param {LatLngLiteral} orderLocation - Ubicación de la orden.
 * @returns {Store[]} - Tiendas filtradas.
 */
export const applyFilters = (
  stores: Store[],
  filters: z.infer<typeof filterSchema>,
  orderLocation: LatLngLiteral
): Store[] => {
  return stores.filter((store) => {
    if (filters.isOpen !== undefined) {
      if (filters.isOpen && !store.isOpen) {
        return false;
      }
    }
    if (filters.distance) {
      const distanceInKm = parseInt(filters.distance.replace("km", ""));
      const storeDistance = calculateDistance(
        orderLocation.lat,
        orderLocation.lng,
        store.coordinates.lat,
        store.coordinates.lng
      );
      if (storeDistance > distanceInKm) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Obtiene la ubicación de la orden actual.
 * @returns {LatLngLiteral} - Latitud y longitud de la orden.
 */
export const getOrderLocation = () => {
  const { order } = useOrderStore.getState();
  return { lat: order.lat, lng: order.lng };
};
