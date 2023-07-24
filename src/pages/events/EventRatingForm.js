import React from "react";
import { useState } from "react";

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
      setEvent((prevEvent) => ({
        ...prevEvent,
        results: prevEvent.results.map((event) => {
          return event.id === parseInt(id)
            ? {
                ...event,
                ratings_count: event.ratings_count + 1,
                rating_average:
                (event.rating_average * event.ratings_count + rating) /
                (event.ratings_count + 1)
          
              }
            : event;
        }),
      }));

      setRating(rating);
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
      </Form>
    </>
  );
}

export default EventRatingForm;
