import React, { useState, useEffect, useRef } from "react";
import {
  DirectionsRenderer,
  DirectionsRendererProps,
} from "@react-google-maps/api";
import { v4 as uuid } from "uuid";

const DirectionsRendererComponent = ({
  rendererProp,
  refs,
}: {
  rendererProp: DirectionsRendererProps;
  refs: DirectionsRendererItemsRef;
}) => {
  const [id] = useState(uuid());

  const onLoad: (directionsRenderer: google.maps.DirectionsRenderer) => void = (
    directionsRenderer
  ) => {
    refs.current.push({ renderer: directionsRenderer, id });
  };

  useEffect(() => {
    return () => {
      refs.current.forEach((ref) => {
        if (ref.id === id) {
          ref.renderer.setMap(null);
        }
      });
    };
  }, [id, refs]);

  return <DirectionsRenderer {...rendererProp} onLoad={onLoad} />;
};

const RoutesRenderers: React.FC<{
  rendererProps: DirectionsRendererProps[];
}> = ({ rendererProps }) => {
  const refs: DirectionsRendererItemsRef = useRef([]);

  return (
    <>
      {rendererProps.map((rendererProp, i) => (
        <DirectionsRendererComponent
          rendererProp={rendererProp}
          key={i}
          refs={refs}
        />
      ))}
    </>
  );
};

export default RoutesRenderers;
