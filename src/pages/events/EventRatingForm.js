import React, { useState } from "react";

// Bootstrap
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button  from "react-bootstrap/Button";

// Styles and CSS
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/Modal.module.css"

// rating library and Axios import
import { Rating } from "react-simple-star-rating";
import { axiosRes, axiosReq } from "../../api/axiosDefaults";

// Context
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// Event rating form, shows the stars and then sends rating to the API
function EventRatingForm(props) {
  const { event, setEvent, id, owner } = props;

  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [noRateModal, setNoRateModal] = useState(false);
  const [ownerRateModal, setOwnerRateModal] = useState(false);
  const currentUser = useCurrentUser();


  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleRatingSubmit = async (e) => {
    // Post new rating to database
    e.preventDefault();
    try {
      const { data: ratingsData } = await axiosReq.get(`/ratings/`);
  
      // check if the current user has already rated the event
      const userRating = ratingsData.results.find(
        (rating) =>
          rating.owner === currentUser?.username
      );

      const isEventOwner = currentUser?.username === owner;

      // if the current user has already rated the event
      if (userRating) {
        setNoRateModal(true);
        setTimeout(() => setNoRateModal(false), 3000);
        return;
      }

      if (isEventOwner) {
        setOwnerRateModal(true);
        setTimeout(() => setOwnerRateModal(false), 3000);
        return;
      }

  
      // Post new rating to database
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

      // Pass the rating to parent
      setShowModal(true);
      // Show modal and close it after 2 seconds.
      setTimeout(() => setShowModal(false), 2000);
      setRating(0);
    } catch (err) {
      // console.log(err);
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title >Rating</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className={styles.Psuccess}>Thank you, your rating has been registered.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setNoRateModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={noRateModal} onHide={() => setNoRateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rating</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Sorry, it seems you have already rated this event, you can only rate a event once...</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setNoRateModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={ownerRateModal} onHide={() => setOwnerRateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title >Rating</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Sorry, you can't rate your won event.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOwnerRateModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EventRatingForm;
