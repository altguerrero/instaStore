export const MAP_ZOOM_LEVEL = 12;

export const CIRCLE_RADIUS = {
  FAR: 6000,
  MODERATE: 4000,
  NEARBY: 2000,
};

export const defaultCircleOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

export const farStoresCircleOptions = {
  ...defaultCircleOptions,
  zIndex: 1,
  fillOpacity: 0.1,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

export const moderatelyCloseStoresCircleOptions = {
  ...defaultCircleOptions,
  zIndex: 2,
  fillOpacity: 0.1,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};

export const nearbyStoresCircleOptions = {
  ...defaultCircleOptions,
  zIndex: 3,
  fillOpacity: 0.25,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
