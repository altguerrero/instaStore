import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useOrderStore, useStoreByOrder } from "@/hooks";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const useMap = () => {
  const { order } = useOrderStore();
  const { directions, selectedStoreId } = useStoreByOrder();
  const [orderLocation, setOrderLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [selectedDirection, setSelectedDirection] =
    useState<google.maps.DirectionsResult | null>(null);
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

  useEffect(() => {
    if (selectedStoreId) {
      const selectedDirection = directions.find(
        (direction) => direction.storeId === selectedStoreId
      )?.directions;
      setSelectedDirection(selectedDirection || null);
    } else {
      setSelectedDirection(null);
    }
  }, [directions, selectedStoreId]);

  return {
    orderLocation,
    options,
    center,
    onLoad,
    selectedDirection,
  };
};

export default useMap;
