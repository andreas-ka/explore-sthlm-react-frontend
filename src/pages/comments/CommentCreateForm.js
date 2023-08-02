/* eslint-disable */
// React hooks
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Bootstrap imports
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Styles and css imports
import styles from "../../styles/CommentForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// Axios and avatar import
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

// Creates the comment form and posts it to the API when submit

function CommentCreateForm(props) {
  const { event, setEvent, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Submit comment form 
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
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <>
      <Form className="mt-2" onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profileImage} height={65} />
            </Link>
          </Form.Label>
          <Col sm={10}>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  className={styles.Form}
                  placeholder="My comment..."
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
              Post
            </button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}

export default CommentCreateForm;
