/**
 * Calcula la distancia entre dos puntos utilizando la fórmula del haversine.
 * @param {number} lat1 - Latitud del primer punto.
 * @param {number} lng1 - Longitud del primer punto.
 * @param {number} lat2 - Latitud del segundo punto.
 * @param {number} lng2 - Longitud del segundo punto.
 * @returns {number} - Distancia en kilómetros.
 */
export const calculateDistance = (
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
