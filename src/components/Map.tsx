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

const Map = () => {
  const { orderLocation, options, center, onLoad } = useMap();
  const { stores } = useStoreByOrder();

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
                    <Marker
                      key={store.storeId}
                      position={{
                        lat: Number(store.coordinates.lat),
                        lng: Number(store.coordinates.lng),
                      }}
                      clusterer={clusterer}
                    />
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
      </GoogleMap>
    </div>
  );
};

export default Map;
