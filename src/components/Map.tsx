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

const Map = () => {
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

  const { stores } = useStoreByOrder();

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
            <Marker position={orderLocation} />

            <MarkerClusterer>
              {(clusterer) => (
                <>
                  {stores.map((store) => (
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
