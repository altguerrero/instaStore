import { useState, useEffect, useCallback } from "react";
import { useOrderStore, useStoreByOrder } from "@/hooks";
import { getDirections } from "@/lib/utils";

const useStoreDirections = () => {
  const { order } = useOrderStore();
  const {
    stores,
    generateStores,
    directions,
    setDirections,
    setSelectedStoreId,
  } = useStoreByOrder();
  const [openStoreId, setOpenStoreId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    if (order.lat && order.lng) generateStores(order.lat, order.lng, 25);
  }, [order.lat, order.lng, generateStores]);

  const fetchAndSetDirections = useCallback(
    async (
      storeId: string,
      origin: google.maps.LatLngLiteral,
      destination: google.maps.LatLngLiteral
    ) => {
      setLoading(storeId);
      try {
        const result = await getDirections(origin, destination);
        if (result) {
          setDirections(storeId, result);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(null);
      }
    },
    [setDirections]
  );

  const handleToggleCollapse = useCallback(
    (store: Store) => {
      const storeId = store.storeId;
      const origin = { lat: order.lat, lng: order.lng };
      const destination = {
        lat: store.coordinates.lat,
        lng: store.coordinates.lng,
      };

      if (openStoreId !== storeId) {
        fetchAndSetDirections(storeId, origin, destination);
        setSelectedStoreId(storeId);
      } else {
        setSelectedStoreId(null);
      }

      setOpenStoreId((prev) => (prev === storeId ? null : storeId));
    },
    [
      fetchAndSetDirections,
      openStoreId,
      order.lat,
      order.lng,
      setSelectedStoreId,
    ]
  );

  const getStoreDirections = useCallback(
    (storeId: string) => {
      return directions.find((direction) => direction.storeId === storeId)
        ?.directions;
    },
    [directions]
  );

  return {
    stores,
    loading,
    openStoreId,
    handleToggleCollapse,
    getStoreDirections,
    fetchAndSetDirections,
  };
};

export default useStoreDirections;
