import { LatLngLiteral, Store } from "@/types";
import { calculateDistance, filterSchema } from "./";
import { z } from "zod";

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
