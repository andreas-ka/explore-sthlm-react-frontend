// React hooks
import { React, useEffect, useState } from "react";

// CSS styles
import styles from "../../styles/MapContainer.module.css";

// Bootstrap
import Container from "react-bootstrap/Container";

// Mapcontainer components and Axios
import MapContainer from "../../components/MapContainer";
import axios from "axios";

// Library to convert adresses to coordinates
import Geocode from "react-geocode";

// Fetch all event data and show the mapcontainer with the results
// Using hasLoaded to check if data i loaded, still a bug thats noted in readme

const EventMap = () => {
  const [eventLocations, setEventLocations] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  Geocode.setRegion("se");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("/events/");
        // get the event locations
        const updatedLocations = await Promise.all(
          data.results.map(async (event) => {
            try {
              const location = event.event_location;
              // react-geocode to get the latitude and longitude of the location
              const response = await Geocode.fromAddress(location);
              const { lat, lng } = response.results[0].geometry.location;
              return { ...event, location, lat, lng };
            } catch (error) {
              console.log("Error fetching geolocation", error);
              return null;
            }
          })
        );
        setEventLocations(updatedLocations);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    setHasLoaded(false);
    fetchEvents();
  }, []);

  return (
    <Container className="text-center">
      <div className="p-3 text-center text-white">
        <h1>Event Map</h1>
      </div>
      {hasLoaded ? (
        <>
          <div className="text-white">
            <h3>Categories</h3>
            <i className="fa-solid fa-location-dot" style={{ color: "#57A639" }}></i> Family
            <i className="fa-solid fa-location-dot" style={{ color: "#ffc0cb" }}></i> Food & Drink
            <i className="fa-solid fa-location-dot" style={{ color: "#3B83BD" }}></i> Sightseeing
            <i className="fa-solid fa-location-dot" style={{ color: "purple" }}></i> Music
            <i className="fa-solid fa-location-dot" style={{ color: "#E1CC4F" }}></i> Sport
            <i className="fa-solid fa-location-dot" style={{ color: "#FF7514" }}></i> Culture
            <i className="fa-solid fa-location-dot" style={{ color: "#B32428" }}></i> Shopping
          </div>
          <div className={styles.CenterMap}>
            <MapContainer eventLocations={eventLocations} />
          </div>
        </>
      ) : (
        <Container className={styles.LoadingContainer}>
          <div className={styles.Spinner}></div>
          <div className="text-center text-white mt-2">Loading...</div>
        </Container>
      )}
    </Container>
  );
};

export default EventMap;
