import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router";
import { fetchMoreData } from "../../utils/utils";
import Review from "../reviews/Review";

import ReviewCreateForm from "../reviews/ReviewCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";

import Event from "./Event";

function EventPage() {
  const { id } = useParams();
    const [event, setEvent] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: event }, {data: comments}] = await Promise.all([
              axiosReq.get(`/events/${id}`),
              axiosReq.get(`/comments/?event=${id}`)
            ]);
            setEvent({ results: [event] });
            setComments(comments)
          } catch (err) {
            // console.log(err);
          }
        };
    
        handleMount();
      }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Event {...event.results[0]} setEvents={setEvent} eventPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <ReviewCreateForm
            profile_id={currentUser.profile_id}
            profileImage={profile_image}
            event={id}
            setEvent={setEvent}
            setComments={setComments}
          />
        ) : (
          <>
            <div className="mb-3">
              <i className="far fa-comments"></i>
              <span className="ml-3">Log in to post a comment...</span>
            </div>
          </>
        )}
        {comments.results.length ? (
          <InfiniteScroll
            children={comments.results.map((comment) => (
              <Review
                key={comment.id}
                {...comment}
                setEvent={setEvent}
                setComments={setComments}
              />
            ))}
            dataLength={comments.results.length}
            hasMore={!!comments.next}
            next={() => fetchMoreData(comments, setComments)}
          />
        ) : currentUser ? (
          <span>No comments yet, be the first to comment!</span>
        ) : (
          <span>No comments...yet</span>
        )}
      </Container>
    </Col>
    <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
    </Col>
  </Row>
);
}

export default EventPage;
