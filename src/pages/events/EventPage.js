/* eslint-disable */
// React hooks
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// Bootstrap
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// Styles and CSS
import appStyles from "../../App.module.css";

// Components
import Comment from "../comments/Comment";
import Event from "./Event";
import EventRatingForm from "./EventRatingForm";
import CommentCreateForm from "../comments/CommentCreateForm";
import PopularProfiles from "../profiles/PopularProfiles";

// Axios, user context and utils
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";

// Gets the event info, id and comments and passing it down as props

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });
  const [averageRating, setAverageRating] = useState(0);
  const owner = event.results[0]?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: event }, { data: comments }] = await Promise.all([
          axiosReq.get(`/events/${id}`),
          axiosReq.get(`/comments/?event=${id}`),
        ]);
        setEvent({ results: [event] });
        setComments(comments);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const updateAverageRating = (newRating) => {
    // calculate the new average rating
    const totalRatings = averageRating * event.results[0].ratings_count;
    const newAverageRating =
      (totalRatings + newRating.rating) / event.results[0].ratings_count;

    setAverageRating(newAverageRating);
  };

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Event
          {...event.results[0]}
          id={id}
          setEvents={setEvent}
          averageRating={averageRating.toFixed(2)}
          eventPage
        />
        <Container className={`mb-3 ${appStyles.Content}`}>
          {/* Ternary to check if current user can comment */}
          {currentUser && currentUser.profile_id ? (
            <EventRatingForm
              // Passing props
              profile_id={currentUser.profile_id}
              event={id}
              id={id}
              owner={owner}
              setEvent={setEvent}
              currentUser={currentUser}
              averageRating={averageRating.toFixed(2)}
              updateAverageRating={updateAverageRating}
            />
          ) : (
            <div>Create an account or login to rate the event...</div>
          )}
        </Container>
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              // Passing props
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              event={id}
              setEvent={setEvent}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setEvent={setEvent}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default EventPage;
