import { Coordinates } from "@/types";

/**
 * Genera coordenadas aleatorias dentro de un rango dado.
 * @param {Coordinates} baseCoord - La coordenada base.
 * @param {number} range - El rango en kilómetros.
 * @returns {Coordinates} - Las coordenadas generadas aleatoriamente.
 */
export const getRandomCoordinate = (
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
