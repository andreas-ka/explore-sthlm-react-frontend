import React from "react";
import { useState } from "react";

// Bootstrap
import { Form } from "react-bootstrap";

// Styles and CSS
import btnStyles from "../../styles/Button.module.css";

// Context, rating library and Axios import
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Rating } from "react-simple-star-rating";
import { axiosRes } from "../../api/axiosDefaults";

// Event rating form, shows the stars and then sends rating to the API

function EventRatingForm(props) {
  const { event, setEvent, rating_average, id } = props;

  const [rating, setRating] = useState(0);

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
      console.log(event.rating_average);
      setEvent((prevEvent) => ({
        ...prevEvent,
        results: prevEvent.results.map((event) => {
          return event.id === id
            ? {
                ...event,
                ratings_count: event.ratings_count + 1,
                rating_average:
                  (event.rating_average * event.ratings_count + rating) /
                  event.ratings_count,
              }
            : event;
        }),
      }));
      console.log(event.rating_average);
      setRating(rating);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(currentUser);
  console.log(rating_average);

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
}

export default EventRatingForm;
