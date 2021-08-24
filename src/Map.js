import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

const Map = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    const turf = window.turf;
    mapboxgl.accessToken =
      "pk.eyJ1IjoibGVvc2lsdmFnb21lcyIsImEiOiJja2MwdmxhZjAwejdsMnlsbXFsYTV5ZmVsIn0.MyyvEV2SHjCbCkIUeL_9bA";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/leosilvagomes/cksp5d5ae3qah17o1va6d4yon/draft", // stylesheet location
        center: [0, 0],
        zoom: 0,
      });

      // San Francisco
      const origin = [-122.414, 37.776];

      // Washington DC
      const destination = [-77.032, 38.913];

      const route = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [origin, destination],
            },
          },
        ],
      };

      // Calculate the distance in kilometers between route start/end point.
      const lineDistance = turf.length(route.features[0]);

      const arc = [];

      // Number of steps to use in the arc and animation, more steps means
      // a smoother arc and animation, but too many steps will result in a
      // low frame rate
      const steps = 500;

      // Draw an arc between the `origin` & `destination` of the two points
      for (let i = 0; i < lineDistance; i += lineDistance / steps) {
        const segment = turf.along(route.features[0], i);
        arc.push(segment.geometry.coordinates);
      }

      // Update the route with calculated arc coordinates
      route.features[0].geometry.coordinates = arc;

      map.scrollZoom.disable();

      map.on("load", () => {
        // Add a source and layer displaying a point which will be animated in a circle.
        map.addSource("route", {
          type: "geojson",
          data: route,
        });

        map.addLayer({
          id: "route",
          source: "route",
          type: "line",
          paint: {
            "line-width": 2,
            "line-color": "#007cbf",
          },
        });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={(el) => (mapContainer.current = el)} className="MapWrap" />;
};

export default Map;
