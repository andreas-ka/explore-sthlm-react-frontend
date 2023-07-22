import { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import axios from 'axios';
import Asset from "../../components/Asset";

const TopRatings = () => {

  const [topRatings, setTopRatings] = useState({ results: [] });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("/events/?ordering=-rating_average");
        setTopRatings(data); 
      } catch (err) {

        console.log(err);
      }
    };

    fetchEvents();
  }, []); 

  return (

    <Container
    className={`${appStyles.Content} d-lg-none text-center mt-5 mb-3`}
  >
    {topRatings.results.length ? (
      <>
        <div>Top Rating events.</div>
        <div>
          {topRatings.results.map((event) => (
            <div key={event.id}>
              {/* Render data for each event */}
              <p>Title: {event.title}</p>
              <p>Rating: {event.rating_average}</p>
              
              {/* Add more data as needed */}
            </div>
          ))}
        </div>
      </>
    ) : (
      <div><Asset spinner /></div>
    )}
  </Container>
);
};

export default TopRatings