import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { Rating } from "react-simple-star-rating";

import styles from "../../styles/ReviewCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function ReviewCreateForm(props) {
  const { setEvents, setReviewComments, id, profileImage, profile_id } = props;
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [review, setReview] = useState("");
  const [social_media, setSocial_media] = useState("");


  const handleChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("event", id);
    formData.append("review", review);
    formData.append("social_media", social_media);

    try {
      const { data } = await axiosRes.post("/reviews/", formData);

      setReviewComments((prevComments) => ({
        ...prevComments,

        results: [data, ...prevComments.results],
      }));

      setEvents((prevEvents) => ({
        ...prevEvents,

        results: prevEvents.results.map((event) => {
          return event.id === id
            ? {
                ...event,
                review_count: event.review_count + 1,
              }
            : event;
        }),
      }));
      setReview("");
      history.push(`/reviews`);
    } catch (err) {
      for (const entry of formData.entries()) {
        console.log(entry[0], entry[1]);

        if (err.response?.status !== 401) {
          setErrors(err.response?.data);
        }
      }
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Link to={`/profiles/${profile_id}`}>
        <Avatar src={profileImage} />
      </Link>
      <Form.Group>
        <Form.Control
          className={styles.Form}
          placeholder="My Review..."
          as="textarea"
          name="review"
          value={review}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!review.trim()}
        type="submit"
      >
        Post
      </button>
    </Form>
  );
}

export default ReviewCreateForm;
