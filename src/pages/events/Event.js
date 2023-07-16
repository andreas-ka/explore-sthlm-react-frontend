import React from "react";
import styles from "../../styles/Event.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import {
  Card,
  Media,
  OverlayTrigger,
  Tooltip,
  ListGroup,
  button,
} from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Event = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    reviews_count,
    ratings_count,
    rating_id,
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
    average_rating,
    setEvents,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleAttend = async () => {
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
      console.log(err);
    }
  };

  const handleRemoveAttend = async () => {
    try {
      const { data } = await axiosRes.delete(`/attend/${attend_id}`);
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
      console.log(err);
    }
  };

  return (
    <Card bg="warning" className={styles.Event}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{created_at}</span>
            {is_owner && eventPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        <Card.Title>
          {title}
          <span className="float-right">Rating: {ratings_count}</span>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <div>
          {is_owner ? (
            <OverlayTrigger
            placement="top"
            overlay={<Tooltip>You can't attend your own event</Tooltip>}>
            <span className="float-right">
            <button
              className={`${btnStyles.Button} ${btnStyles.NotWide} ${btnStyles.Bright}`}
              type="submit">
              Attend
            </button>
            </span>
            </OverlayTrigger>
          ) : attend_id ? (
            <span className="float-right">
            <button onClick={handleRemoveAttend}
              className={`${btnStyles.Button} ${btnStyles.NotWide} ${btnStyles.Bright}`}
              type="submit">
              Attend
            </button>
            </span>
          ) : currentUser ? (
            <span className="float-right">
            <button onClick={handleAttend}
              className={`${btnStyles.Button} ${btnStyles.NotWide} ${btnStyles.Bright}`}
              type="submit">
              Attend
            </button>
            </span>
          ) : (
            <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Login in to show you are attending the event.</Tooltip>}>
            <span className="float-right">
            <button
              className={`${btnStyles.Button} ${btnStyles.NotWide} ${btnStyles.Bright}`}
              type="submit">
              Attend
            </button>
            </span>
            </OverlayTrigger>
          )}
          <span className="float-right">{attend_count}</span>
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
