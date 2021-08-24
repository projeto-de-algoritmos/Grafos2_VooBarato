import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
// import { getLatLong } from "./structures/api";
// import { getCountries } from "./structures/api";

const Map = (countries) => {
  const [map, setMap] = useState(null);
  // const [listPlaces] = useState(countries);
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

      map.scrollZoom.disable();

      const places = [
        [-122.414, 37.776],
        [-77.032, 38.3333333],
        [-53.2, -10.913],
      ];

      // listPlaces.countries.forEach((place) => {
      //   places.push(getLatLong(place));
      // });

      const routes = [];

      places.forEach((place, id) => {
        if (id + 1 === places.length) {
          return;
        } else {
          routes.push({
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: [place, places[id + 1]],
                },
              },
            ],
          });

          const lineDistance = turf.length(routes[id].features[0]);

          const arc = [];

          const steps = 500;

          for (let i = 0; i < lineDistance; i += lineDistance / steps) {
            const segment = turf.along(routes[id].features[0], i);
            arc.push(segment.geometry.coordinates);
          }

          routes[id].features[0].geometry.coordinates = arc;
        }
      });

      map.on("load", () => {
        routes.forEach((route, id) => {
          map.addSource(`route${id}`, {
            type: "geojson",
            data: route,
          });

          map.addLayer({
            id: `route${id}`,
            source: `route${id}`,
            type: "line",
            paint: {
              "line-width": 2,
              "line-color": "#007cbf",
            },
          });
        });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={(el) => (mapContainer.current = el)} className="MapWrap" />;
};

export default Map;
