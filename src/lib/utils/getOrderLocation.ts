import { useOrderStore } from "@/hooks";

/**
 * Obtiene la ubicación de la orden actual.
 * @returns {LatLngLiteral} - Latitud y longitud de la orden.
 */
export const getOrderLocation = () => {
  const { order } = useOrderStore.getState();
  return { lat: order.lat, lng: order.lng };
};
