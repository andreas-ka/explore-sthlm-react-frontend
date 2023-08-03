/* eslint-disable */
// React hooks
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Styles and CSS
import styles from "../../styles/Event.module.css";
import btnStyles from "../../styles/Button.module.css";
import star from "../../styles/Star.module.css";

// Bootstrap
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Axios and avatar import
import { axiosRes, axiosReq } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";

// Context and component
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { DropdownMenu } from "../../components/DropDownMenu";

// Star rating library
import { Rating } from "react-simple-star-rating";

// Event construct, with Card layout, Attend / remove attend and edit/delete for events.
// Props are being set
// Modal showing to confirm if you want to delete event
// Using hasLoaded to check if data i loaded, still a bug thats noted in readme

const Event = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    title,
    description,
    event_location,
    start_date,
    end_date,
    category,
    cost,
    image,
    created_at,
    eventPage,
    attend_count,
    attend_id,
    setEvents,
  } = props;

  const history = useHistory();
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [averageRating, setAverageRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleAttend = async () => {
    // Posts to the API when user press Attend, add to attend_count
    try {
      const { data } = await axiosRes.post("/attend/", { event: id });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? {
                ...event,
                attend_count: event.attend_count + 1,
                attend_id: data.id,
              }
            : event;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    // fetch all ratings data from the API
    const fetchData = async () => {
      try {
        const [{ data: ratingsData }] = await Promise.all([
          axiosReq.get(`/ratings/`),
        ]);

        // Calculate average rating for this event
        const ratingsForEvent = ratingsData.results.filter(
          (rating) => rating.event === parseInt(id)
        );
        const totalRatings = ratingsForEvent.reduce(
          (acc, rating) => acc + rating.rating,
          0
        );
        const averageRating = ratingsForEvent.length
          ? totalRatings / ratingsForEvent.length
          : 0;
        setAverageRating(averageRating);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  const handleRemoveAttend = async () => {
    // Delete the users attend and removes it from attend_count
    try {
      await axiosRes.delete(`/attend/${attend_id}`);
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? {
                ...event,
                attend_count: event.attend_count - 1,
                attend_id: null,
              }
            : event;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleEdit = () => {
    // Edit and delete functions for the events
    history.push(`/events/${id}/edit`);
  };

  const handleDelete = async () => {
    // Shows modal and asks if you still want to delete or cancel
    setShowModal(true);
    try {
      await axiosRes.delete(`/events/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Colors for all the events, shown on top of event image
  const categoryColorMap = {
    Family: "#57A639", // green
    Music: "purple", // purple
    Sport: "#E1CC4F", // yellow ivory
    Culture: "#FF7514", // orange
    Food: "pink", // pink
    Shopping: "#B32428", // red
    Sightseeing: "#3B83BD", // blue
  };
  const categoryColor = categoryColorMap[category] || "gray";

  return (
    <Card bg="light" className={styles.Event}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{created_at}</span>
            {is_owner && eventPage && (
              <DropdownMenu
                handleEdit={handleEdit}
                handleDelete={() => setShowModal(true)}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <div className={styles.Category}>
        <Link to={`/events/${id}`}>
          <Card.Img src={image} alt={title} />
          <h5
            className={styles.CategoryTag}
            style={{ backgroundColor: categoryColor }}
          >
            {category}
          </h5>
        </Link>
      </div>
      <Card.Body>
        <Card.Title>
          {title}
          <span className="float-right">
            <i className="fa-regular fa-comments"></i> {comments_count}{" "}
            {hasLoaded ? (
              <>
                <Rating
                  className={star.Star}
                  readonly
                  initialValue={averageRating.toFixed(1)}
                  size={25}
                />
                {averageRating.toFixed(1)}
              </>
            ) : (
              "Loading rating..."
            )}
          </span>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <div>
          {/* Ternarys to check if user can click attend */}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You cant attend your own event</Tooltip>}
            >
              <span className="float-right">
                <button
                  className={`${btnStyles.Button} ${btnStyles.NotWide} ${btnStyles.Bright}`}
                  type="submit"
                >
                  Attend
                </button>
              </span>
            </OverlayTrigger>
          ) : attend_id ? (
            <span className="float-right">
              <button
                onClick={handleRemoveAttend}
                className={`${btnStyles.Button} ${btnStyles.NotWide} ${btnStyles.Attending}`}
                type="submit"
              >
                Attending
              </button>
            </span>
          ) : currentUser ? (
            <span className="float-right">
              <button
                onClick={handleAttend}
                className={`${btnStyles.Button} ${btnStyles.NotWide} ${btnStyles.Bright}`}
                type="submit"
              >
                Attend
              </button>
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>Login in to show you are attending the event.</Tooltip>
              }
            >
              <span className="float-right">
                <button
                  className={`${btnStyles.Button} ${btnStyles.NotWide} ${btnStyles.Bright}`}
                  type="submit"
                >
                  Attend
                </button>
              </span>
            </OverlayTrigger>
          )}
          <span className="float-right mr-2">
            <i className="fa-solid fa-user-group"></i>({attend_count})
          </span>
        </div>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>Location: {event_location}</ListGroup.Item>
        <ListGroup.Item>
          Date: {start_date} to {end_date}
        </ListGroup.Item>
        <ListGroup.Item>Cost: {cost} $</ListGroup.Item>
      </ListGroup>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this event?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Event;
