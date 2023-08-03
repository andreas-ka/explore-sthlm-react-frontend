/* eslint-disable */

// React hooks
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Bootstrap components
import { Media } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Avatar
import Avatar from "../../components/Avatar";

// Styles CSS
import styles from "../../styles/Comment.module.css";

// Current user context
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

// Components and form
import { DropdownMenu } from "../../components/DropDownMenu";
import CommentEditForm from "./CommentEditForm";

// The comment page/module that displays the comment section on events

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    // delete the comment
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),

      }));
    } catch (err) {
       // console.log(err);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <DropdownMenu
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Comment Deleted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Comment deleted successfully!</p>
          <p>You need to refresh the page to see the outcome.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Comment;
