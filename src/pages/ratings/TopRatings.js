import { useEffect, useState } from "react";

// Styles and CSS
import styles from "../../styles/Event.module.css";

// Bootstrap
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";

import axios from "axios";
import Asset from "../../components/Asset";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

// Star rating library
import { Rating } from "react-simple-star-rating";

// Grabs all the events, order them by rating, highest at the top.

const TopRatings = () => {
  const [topRatings, setTopRatings] = useState({ results: [] });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("/events/");
        setTopRatings(data);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container className="mt-5">
      {topRatings.results.length ? (
        <>
          <div className="text-center text-white mb-5">
            <h1>Top Rating events</h1>
          </div>
          <div>
            <InfiniteScroll
              dataLength={topRatings.results.length}
              loader={<Asset spinner />}
              hasMore={!!topRatings.next}
              next={() => fetchMoreData(topRatings, setTopRatings)}
            >
              {topRatings.results.map((event) => (
                <div key={event.id}>
                  <Card bg="light" className={styles.Event}>
                    <Card.Body>
                      <Media className="align-items-center justify-content-between">
                        <Link to={`/profiles/${event.profile_id}`}>
                          <Avatar src={event.profile_image} height={55} />
                          {event.owner}
                        </Link>
                        <div className="d-flex align-items-center">
                          <span>{event.created_at}</span>
                        </div>
                      </Media>
                    </Card.Body>
                    <Link to={`/events/${event.id}`}>
                      <Card.Img src={event.image} alt={event.title} />
                    </Link>
                    <Card.Body>
                      <Card.Title>
                        {event.title}
                        <span className="float-right">
                          <i className="fa-regular fa-comments"></i>{" "}
                          {event.comments_count}{" "}
                          <Rating
                            readonly
                            initialValue={event.rating_average}
                            size={25}
                          />
                          {event.rating_average}
                        </span>
                      </Card.Title>
                    </Card.Body>
                    <div className="text-center mb-3">
                      <Card.Title>Description: {event.description}</Card.Title>
                      <Card.Title>When: {event.start_date}</Card.Title>
                    </div>
                  </Card>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </>
      ) : (
        <div>
          <Asset spinner />
        </div>
      )}
    </Container>
  );
};


export default TopRatings;
