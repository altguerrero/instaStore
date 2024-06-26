import {
  GoogleMap,
  Marker,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import {
  CIRCLE_RADIUS,
  MAP_ZOOM_LEVEL,
  farStoresCircleOptions,
  moderatelyCloseStoresCircleOptions,
  nearbyStoresCircleOptions,
} from "@/constants";
import { useMap, useStoreByOrder } from "@/hooks";
import { RoutesRenderers, StoreDetailsDialog } from "./";
import { useEffect, useState } from "react";
import { Store } from "@/types";

const Map = () => {
  const { filteredStores } = useStoreByOrder();
  const {
    orderLocation,
    options,
    center,
    onLoad,
    selectedRoute,
    activeDirection,
    handleMarkerClick,
    handleGetRoute,
  } = useMap();

  const [markers, setMarkers] = useState<Store[]>([]);

  useEffect(() => {
    setMarkers(filteredStores);
  }, [filteredStores]);

  const directionsRendererProps = selectedRoute
    ? [
        {
          directions: selectedRoute,
          options: {
            suppressMarkers: false,
            polylineOptions: {
              zIndex: 50,
              strokeColor: "#007bff",
              strokeWeight: 5,
            },
          },
        },
      ]
    : [];

  return (
    <div className="w-full h-full">
      <GoogleMap
        zoom={MAP_ZOOM_LEVEL}
        center={center}
        mapContainerClassName="w-full h-full"
        options={options}
        onLoad={onLoad}
      >
        {orderLocation && (
          <>
            <Marker
              position={orderLocation}
              icon={{
                url: "/icons/location.png",
                scaledSize: new google.maps.Size(40, 40),
              }}
            />

            <MarkerClusterer>
              {(clusterer) => (
                <>
                  {markers.map((store) => (
                    <StoreDetailsDialog
                      key={store.storeId}
                      store={store}
                      direction={activeDirection}
                      onGetRoute={(direction) => handleGetRoute(direction)}
                    >
                      <Marker
                        position={{
                          lat: Number(store.coordinates.lat),
                          lng: Number(store.coordinates.lng),
                        }}
                        clusterer={clusterer}
                        onClick={() => handleMarkerClick(store)}
                        icon={{
                          url: "/icons/shop.png",
                          scaledSize: new google.maps.Size(40, 40),
                        }}
                      />
                    </StoreDetailsDialog>
                  ))}
                </>
              )}
            </MarkerClusterer>

            <Circle
              center={orderLocation}
              radius={CIRCLE_RADIUS.FAR}
              options={farStoresCircleOptions}
            />
            <Circle
              center={orderLocation}
              radius={CIRCLE_RADIUS.MODERATE}
              options={moderatelyCloseStoresCircleOptions}
            />
            <Circle
              center={orderLocation}
              radius={CIRCLE_RADIUS.NEARBY}
              options={nearbyStoresCircleOptions}
            />
          </>
        )}
        <RoutesRenderers rendererProps={directionsRendererProps} />
      </GoogleMap>
    </div>
  );
};

export default Map;
