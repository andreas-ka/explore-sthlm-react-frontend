import { useEffect, useState } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";

import MapContainer from "../../components/MapContainer";
import axios from "axios";

// Library to convert adresses to coordinates
import Geocode from "react-geocode";

// Grabs all the events, order them by rating, highest at the top.

const EventMap = () => {
  const [originalLocations, setOriginalLocations] = useState({ results: [] });
  const [eventLocations, setEventLocations] = useState([]);

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  Geocode.setRegion("se");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("/events/");
        const locations = data.results.map((event) => event.event_location);
        setOriginalLocations(locations);

        const updatedLocations = await Promise.all(
          locations.map(async (location) => {
            try {
              const response = await Geocode.fromAddress(location);
              const { lat, lng } = response.results[0].geometry.location;
              return { location, lat, lng };
            } catch (error) {
              console.log(`Error fetching geolocation for "${location}":`, error);
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
    <Container className="mt-5">
      <>
        <div></div>
        <MapContainer
        eventLocations={eventLocations} />
      </>
    </Container>
  );
};

export default EventMap;
