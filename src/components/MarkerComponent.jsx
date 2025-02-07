import { useEffect } from "react";
import leaflet from "leaflet";
import useLocalStorage from "../hooks/useLocalStorage";

export default function MarkerComponent({ map }) {
  const [nearbyMarkers, setNearbyMarkers] = useLocalStorage(
    "NEARBY_MARKERS",
    []
  );

  useEffect(() => {
    if (!map) return;

    // Load stored markers
    nearbyMarkers.forEach(({ latitude, longitude, info }) => {
      leaflet
        .marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`<b>${info || "No Information"}</b>`);
    });

    // Click event to add markers
    map.addEventListener("click", (e) => {
      const { lat: latitude, lng: longitude } = e.latlng;
      const info = prompt("Enter marker information:", "New Location");

      if (info) {
        leaflet
          .marker([latitude, longitude])
          .addTo(map)
          .bindPopup(`<b>${info}</b>`);

        setNearbyMarkers((prevMarkers) => [
          ...prevMarkers,
          { latitude, longitude, info },
        ]);
      }
    });
  }, [map]);

  return null;
}
