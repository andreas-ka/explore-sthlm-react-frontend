import React from "react";

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

import { axiosRes } from "../../api/axiosDefaults";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";

// Context and component
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { DropdownMenu } from "../../components/DropDownMenu";

// Star rating library
import { Rating } from "react-simple-star-rating";

// Event construct, with Card layout, Attend / remove attend and edit/delete for events.
// Props are being set

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
    rating_average,
    ratings_count,
    averageRating,
  } = props;

  const history = useHistory();
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

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
    try {
      await axiosRes.delete(`/events/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

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
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/events/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        <Card.Title>
          {title}
          <span className="float-right">
            <i className="fa-regular fa-comments"></i> {comments_count}{" "}
            <Rating
              className={star.Star}
              readonly
              initialValue={rating_average}
              size={25}
            />
            {rating_average}
            {averageRating}
          </span>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <div>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't attend your own event</Tooltip>}
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
        <ListGroup.Item>Category: {category}</ListGroup.Item>
        <ListGroup.Item>Cost: {cost} $</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Event;
