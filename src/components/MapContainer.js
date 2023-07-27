import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import styles from "../styles/MapContainer.module.css";

const MapContainer = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const center = useMemo(() => ({ lat: 59.331618, lng: 18.058443 }), []);

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
          <Marker position={{ lat: 59.331618, lng: 18.058443 }} />
        </GoogleMap>
      )}
    </div>
  );
};

export default MapContainer;