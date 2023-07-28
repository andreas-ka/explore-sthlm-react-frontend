import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import styles from "../styles/MapContainer.module.css";

const MapContainer = ({ eventLocations }) => {
  // passing in the location prop from EventMap.js
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const center = useMemo(() => ({ lat: 59.331618, lng: 18.058443 }), []);
  console.log(eventLocations)

  return (
    <div className={styles.App}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName={styles.Mapcontainer}
          center={center}
          zoom={10}
        >
          { /* Mapping the location location data, and add marker to each adress */ }
          {eventLocations.map((locationData, index) => (
            <Marker
              key={index}
              position={{ lat: locationData.lat, lng: locationData.lng }}
            />
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default MapContainer;