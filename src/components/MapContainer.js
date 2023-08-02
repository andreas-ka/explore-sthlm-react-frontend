/* eslint-disable */ 
import React from "react";

// React hooks
import { useMemo, useState } from "react";

// Google maps imports
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

// Css styles
import styles from "../styles/MapContainer.module.css";

// Creates the Mapcontainer and all information in it
const MapContainer = ({ eventLocations }) => {
  const [clickEvent, setClickedEvent] = useState(null);
  // passing in the location prop from EventMap.js
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const center = useMemo(() => ({ lat: 59.331618, lng: 18.058443 }), []);

  // setting same category color as the rest of the website
  const categoryColorMap = {
    Family: "#57A639", // green
    Music: "purple", // purple
    Sport: "#E1CC4F", // yellow ivory
    Culture: "#FF7514", // orange
    Food: "pink", // pink
    Shopping: "#B32428", // red
    Sightseeing: "#3B83BD", // blue
  };

  // set own marker, default is orange as website and fontawsome SVG as marker img
  const customMarker = {
    path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z",
    fillColor: "#ff851c",
    fillOpacity: 2,
    strokeWeight: 1,
    rotation: 0,
    scale: 0.05,
  };

  return (
    <div className={styles.App}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName={styles.Mapcontainer}
          center={center}
          zoom={11}
        >
          {/* map the location location data, and add marker to each adress
          also set the infowindow to display information when marker clicked */}
          {eventLocations.map((locationData, index) => (
            <Marker
              key={index}
              position={{ lat: locationData.lat, lng: locationData.lng }}
              icon={{
                path: customMarker.path,
                fillColor:
                  categoryColorMap[locationData.category] ||
                  customMarker.fillColor,
                fillOpacity: customMarker.fillOpacity,
                strokeWeight: customMarker.strokeWeight,
                rotation: customMarker.rotation,
                scale: customMarker.scale,
              }}
              onClick={() => setClickedEvent(locationData)}
            />
          ))}
          {clickEvent && (
            <InfoWindow
              position={{ lat: clickEvent.lat, lng: clickEvent.lng }}
              onCloseClick={() => setClickedEvent(null)}
            >
              <div className="font-weight-bold">
                Category: {clickEvent.category}
                <br />
                Title: {clickEvent.title}
                <br />
                {clickEvent.start_date} - {clickEvent.end_date}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default MapContainer;
