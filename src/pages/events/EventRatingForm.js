import React, { useState } from "react";

// Bootstrap
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button  from "react-bootstrap/Button";

// Styles and CSS
import btnStyles from "../../styles/Button.module.css";

// Context, rating library and Axios import
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Rating } from "react-simple-star-rating";
import { axiosRes } from "../../api/axiosDefaults";

// Event rating form, shows the stars and then sends rating to the API

function EventRatingForm(props) {
  const { event, setEvent, id, averageRating } = props;

  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

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
                rating: event.rating,
                ratings_count: event.ratings_count + 1,
              }
            : event;
        }),
      }));
      // Show modal and close it after 2 seconds.
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
      console.log(event.rating_average);
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
        <div>avg result {averageRating}</div>
      </Form>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rating</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Thank you, your rating has been registered.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EventRatingForm;
