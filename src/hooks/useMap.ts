import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useOrderStore, useStoreByOrder } from "@/hooks";
import { getDirections } from "@/lib/utils";

const useMap = () => {
  const { order } = useOrderStore();
  const { directions, selectedStoreId } = useStoreByOrder();
  const [orderLocation, setOrderLocation] = useState<LatLngLiteral | null>(
    null
  );
  const [selectedRoute, setSelectedRoute] =
    useState<google.maps.DirectionsResult | null>(null);
  const [activeDirection, setActiveDirection] =
    useState<google.maps.DirectionsResult | null>(null);
  const [routeToSet, setRouteToSet] =
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

  const handleMarkerClick = async (store: Store) => {
    const origin = {
      lat: Number(orderLocation?.lat),
      lng: Number(orderLocation?.lng),
    };
    const destination = {
      lat: store.coordinates.lat,
      lng: store.coordinates.lng,
    };

    const result = await getDirections(origin, destination);
    if (result) {
      setActiveDirection(result);
    }
  };

  const handleGetRoute = (direction: google.maps.DirectionsResult) => {
    setSelectedRoute(null);
    setRouteToSet(direction);
  };

  useEffect(() => {
    if (routeToSet) {
      setSelectedRoute(routeToSet);
    }
  }, [routeToSet]);

  useEffect(() => {
    if (selectedStoreId) {
      const storeDirection = directions.find(
        (direction) => direction.storeId === selectedStoreId
      )?.directions;

      setSelectedRoute(null);
      setRouteToSet(storeDirection || null);
    } else {
      setSelectedRoute(null);
    }
  }, [directions, selectedStoreId]);

  useEffect(() => {
    setOrderLocation({ lat: order.lat, lng: order.lng });
  }, [order]);

  return {
    orderLocation,
    options,
    center,
    onLoad,
    selectedRoute,
    activeDirection,
    handleMarkerClick,
    handleGetRoute,
  };
};

export default useMap;
