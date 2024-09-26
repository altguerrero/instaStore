import { LatLngLiteral } from "@/types";

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
