import React, { useState, useEffect } from "react";


// Bootstrap
import Form from "react-bootstrap/Form";

// Styles and CSS
import btnStyles from "../../styles/Button.module.css";

// Context, rating library and Axios import
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Rating } from "react-simple-star-rating";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

// Event rating form, shows the stars and then sends rating to the API

function EventRatingForm(props) {
  const { event, setEvent, id } = props;

  const [rating, setRating] = useState(0);
  const [ratingsData, setRatingsData] = useState([]);
  const [averageRating, setAverageRating] = useState(0);


  const currentUser = useCurrentUser();

  const handleRating = (rate) => {
    setRating(rate);
  };

  // Fetch all the ratings, and calculate avg rating for that event in variable: averageRating
  useEffect(() => {
    const fetchRatingsForEvent = async () => {
      try {
        const { data } = await axiosRes.get("/ratings/");
        console.log("all the ratings:", data.results);
        console.log("event:", id);
        const ratingsForEvent = data.results.filter((rating) => rating.event === parseInt(id));
        setRatingsData(ratingsForEvent);
        console.log("ratings for event", id, ":", ratingsForEvent);
  

        const totalRatings = ratingsForEvent.reduce((acc, rating) => acc + rating.rating, 0);
        const averageRating = ratingsForEvent.length ? totalRatings / ratingsForEvent.length : 0;
        console.log("avg rating:", averageRating);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchRatingsForEvent();
  }, [id]);
  

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosRes.post("/ratings/", {
        event,
        rating,
      });

      setEvent((prevEvent) => ({
        ...prevEvent,
        results: prevEvent.results.map((event) => {
          return event.id === parseInt(id)
            ? { ...event, 
              ratings_count: data.ratings_count,
            }
            : event;
        }),
      }));
      console.log(event.rating_average)
      setRating(0);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <div className="text-center">Rate This Event</div>
      <Form className="mt-2 pb-4" onSubmit={handleRatingSubmit}>
        <div className="text-center p-1 mb-1">
          <Rating onClick={handleRating} />
        </div>
        <button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          type="submit"
        >
          Submit
        </button>
        <div>avg result {event.rating_average} {averageRating}</div>
      </Form>
    </>
  );
}

export default EventRatingForm;