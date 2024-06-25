import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useOrderStore } from "@/hooks";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const useMap = () => {
  const { order } = useOrderStore();
  const [orderLocation, setOrderLocation] = useState<LatLngLiteral | null>(
    null
  );
  const mapRef = useRef<google.maps.Map | null>(null);

  const options: MapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false,
    }),
    []
  );

  const center = useMemo(
    () => ({
      lat: order.lat,
      lng: order.lng,
    }),
    [order.lat, order.lng]
  );

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      if (center.lat && center.lng) {
        map.panTo(center);
      }
    },
    [center]
  );

  useEffect(() => {
    setOrderLocation({ lat: order.lat, lng: order.lng });
  }, [order]);

  return {
    orderLocation,
    options,
    center,
    onLoad,
  };
};

export default useMap;
