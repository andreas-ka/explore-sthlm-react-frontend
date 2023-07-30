import { useEffect, useState } from "react";

//CSS
import styles from "../../styles/MapContainer.module.css"

// Bootstrap
import Container from "react-bootstrap/Container";

import MapContainer from "../../components/MapContainer";
import axios from "axios";

// Library to convert adresses to coordinates
import Geocode from "react-geocode";

// Grabs all the events, order them by rating, highest at the top.

const EventMap = () => {
  const [eventLocations, setEventLocations] = useState([]);

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
      } catch (err) {
        // console.log(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container className="text-center">
      <>
        <div className="p-5 text-center text-white"><h1>Showing all events on the map</h1></div>
        <div className={styles.CenterMap}>
        <MapContainer
        eventLocations={eventLocations} />
        </div>
        
      </>
    </Container>
  );
};

export default EventMap;
