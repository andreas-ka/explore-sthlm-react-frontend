import React from "react";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { axiosRes } from "../../api/axiosDefaults";
import { Form } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css"
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import EventPage from "./EventPage";

const EventRatingForm = (props) => {
  const { 
    event, 
    setEvent, 
    setComments, 
    profileImage, 
    ratings_count, 
    rating_average,
    id,
    is_owner,
    owner,
     } = props;
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

  const currentUser = useCurrentUser();

  const handleRating = (rate) => {
    setRating(rate);
  };

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
          return event.id === id
            ? { ...event, 
                ratings_count: event.ratings_count +1,
                rating_average: ((event.rating_average + event.rating) / event.ratings_count) }
            : event;
        }),
      }));
      setRating(rating);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(currentUser);
  console.log(event.owner);


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
      </Form>
    </>
  );
};

export default EventRatingForm;
