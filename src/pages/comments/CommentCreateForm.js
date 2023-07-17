import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/CommentForm.module.css";
import btnStyles from "../../styles/Button.module.css"

import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { Rating } from "react-simple-star-rating";

function CommentCreateForm(props) {
  const { event, setEvent, setComments, profileImage, profile_id, id, setEvents } = props;
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [rating, setRating] = useState(0);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleRating = async (rate) => {
    setRating(rate / 20);
    try {
      const { data } = await axiosRes.post("/ratings/", { event: id });
      setEvents((prevEvents) => ({
        ...prevEvents,
        results: prevEvents.results.map((event) => {
          return event.id === id
            ? { ...event, ratings_count: event.ratings_count + 1, rating_id: data.id }
            : event;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        event,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setEvent((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401){
        setErrors(err.response?.data)
      }
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
        <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Rating onClick={handleRating} />
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <button
        className={`${btnStyles.Button} ${btnStyles.Bright}`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;