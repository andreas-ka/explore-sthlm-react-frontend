import React, { useEffect, useState } from "react";

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
import { useParams } from "react-router";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: event },
          { data: comments },
          { data: ratingsData },
        ] = await Promise.all([
          axiosReq.get(`/events/${id}`),
          axiosReq.get(`/comments/?event=${id}`),
          axiosReq.get("/ratings/"),
        ]);
        setEvent({ results: [event] });
        setComments(comments);
  
        // Calculate average rating for this event
        const ratingsForEvent = ratingsData.results.filter(
          (rating) => rating.event === parseInt(id)
        );
        const totalRatings = ratingsForEvent.reduce(
          (acc, rating) => acc + rating.rating,
          0
        );
        const averageRating =
          ratingsForEvent.length ? totalRatings / ratingsForEvent.length : 0;
        setAverageRating(averageRating);
      } catch (err) {
      }
    };
  
    fetchData();
  }, [id]);

  const updateAverageRating = (newRating) => {
    // calculate the new average rating
    const totalRatings = averageRating * (event.results[0].ratings_count - 1);
    const newAverageRating =
      (totalRatings + newRating.rating) / event.results[0].ratings_count;

    setAverageRating(newAverageRating);
  };


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Event {...event.results[0]} 
        setEvents={setEvent}
        averageRating={averageRating}
        eventPage />
        <Container className={`mb-3 ${appStyles.Content}`}>
          {currentUser && currentUser.profile_id ? (
            <EventRatingForm
              // Passing props
              profile_id={currentUser.profile_id}
              event={id}
              id={id}
              setEvent={setEvent}
              currentUser={currentUser}
              averageRating={averageRating}
              updateAverageRating={updateAverageRating}
            />
          ) : (
            <div>Loading...</div>
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
                  // Passing props
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
