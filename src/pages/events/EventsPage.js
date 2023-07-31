import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

// Bootstrap
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// Styles and CSS
import appStyles from "../../App.module.css";
import styles from "../../styles/EventsPage.module.css";

// Components, Contexts, Axios and other tools
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-result.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// Components
import Event from "./Event";
import PopularProfiles from "../profiles/PopularProfiles";

/* Shows the events, also a Search bar and category select option */

function EventsPage({ message, filter = "" }) {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // fetch event for searchbar and selecter
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(
          `/events/?${filter}search=${query}&category=${category}`
        );
        setEvents(data);
        console.log(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchEvents();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, category, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search events"
          />
          <Form.Control
            className={styles.formmargin}
            size="sm"
            as="select"
            placeholder="Choose..."
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option key="blankChoice" hidden value>
              {" "}
              Browse Categories{" "}
            </option>
            <option value="Culture">Culture</option>
            <option value="Music">Music & Concerts</option>
            <option value="Sightseeing">Sightseeing</option>
            <option value="Family">Family</option>
            <option value="Food">Food & Drink</option>
            <option value="Shopping">Shopping</option>
            <option value="Sport">Sports</option>
          </Form.Control>
        </Form>

        {hasLoaded ? (
          <>
            {events.results.length ? (
              <InfiniteScroll
                children={events.results.map((event) => (
                  <Event
                    key={event.id}
                    {...event}
                    setEvents={setEvents}
                    averageRating={event.averageRating}
                  />
                ))}
                dataLength={events.results.length}
                loader={<Asset />}
                hasMore={!!events.next}
                next={() => fetchMoreData(events, setEvents)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default EventsPage;
