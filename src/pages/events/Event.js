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
import { axiosRes } from '../../api/axiosDefaults';
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
    attending_id,
    average_rating,
    setEvents,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleAttend = async () => {
    try {
        const { data } = await axiosRes.post('/attending/', {event: id});
        setEvents((prevEvents) => ({
            ...prevEvents,
            results: prevEvents.results.map((event) => {
                return event.id === id
                ? {...event, attending_count: event.attending_count + 1, attending_id: data.id}
                : event;
            })
        }))
    } catch (err) {
        // console.log(err);
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
        <Card.Title>{title} 
        <span className="float-right">Rating: {ratings_count}</span>
        </Card.Title>
        <Card.Text>{description}<span className="float-right">
          <button className={`${btnStyles.Button} ${btnStyles.NotWide} ${btnStyles.Bright}`}
              type="submit"
            >Attend</button></span></Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>Location: {event_location}</ListGroup.Item>
        <ListGroup.Item>Date: {start_date} to {end_date}</ListGroup.Item>
        <ListGroup.Item>Category: {category}</ListGroup.Item>
        <ListGroup.Item>Cost: {cost} $</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Event;
