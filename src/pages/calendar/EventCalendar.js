// React hooks
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Axios and currentuser context
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// The calendar library
import Calendar from "react-awesome-calendar";

// Styles CSS
import styles from "../../styles/Calendar.module.css";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Calendar.module.css";

/* Calendar page, fetch the event data from the api and then
maps trough them and show them in the calendar in different
colors depending on the category for the event */

const EventCalendar = () => {
  const [eventsData, setEventsData] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [showUserEvents, setShowUserEvents] = useState(false);
  const history = useHistory();
  const currentUser = useCurrentUser();

  useEffect(() => {
    // fetch all events data
    const fetchEventData = async () => {
      try {
        const { data } = await axiosRes.get("/events/");
        const filteredData = data.results.map((event) => ({
          id: event.id,
          title: event.title,
          start_date: event.start_date,
          end_date: event.end_date,
          category: event.category,
        }));
        setEventsData(filteredData);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchEventData();
  }, []);

  const categoryColorMap = {
    Family: "#57A639", // green
    Music: "purple", // purple
    Sport: "#E1CC4F", // yellow ivory
    Culture: "#FF7514", // orange
    Food: "pink", // pink
    Shopping: "#B32428", // red
    Sightseeing: "#3B83BD", // blue
  };

  const handleClickEvent = (event) => {
    history.push(`/events/${event}`);
  };

  // Set the array for all events
  const allEvents =
    eventsData.length > 0
      ? eventsData.map((event) => ({
          id: event.id,
          color: categoryColorMap[event.category] || "gray",
          from: event.start_date,
          to: event.end_date,
          title: event.title,
          category: event.category,
        }))
      : [];

  // Set array for the logged in users event they are attending
  const myEvent =
    userEvents.length > 0
      ? userEvents.map((event) => ({
          id: event.id,
          color: categoryColorMap[event.category] || "gray",
          from: event.start_date,
          to: event.end_date,
          title: event.title,
          category: event.category,
        }))
      : [];

  const handleAllEventsClick = () => {
    setShowUserEvents(false); // all events
  };

  const handleUserEventsClick = async () => {
    // check if currentUser has a profile, if they do check for events
    if (!currentUser || !currentUser.profile_id) {
      return;
    }

    try {
      const { data } = await axiosRes.get(`/attend/`);
      const userEvents = data.results
        .filter((attend) => attend.owner === currentUser.username)
        .map((attend) => ({
          id: attend.id,
          owner: attend.owner,
          event: attend.event,
        }));

      setUserEvents(userEvents);

      // filter all event.id to match users attend.event
      const myEvents = eventsData.filter((eventData) =>
        userEvents.some((userEvent) => userEvent.event === eventData.id)
      );

      setUserEvents(myEvents);
      setShowUserEvents(true); // show user events
    } catch (err) {
      // console.error(err);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1>Event Calendar</h1>
        <p className="text-white">
          You need to be logged in to view your events you are attending.
        </p>
        <Button
          className={`${btnStyles.BtnCalendar} m-2`}
          onClick={handleAllEventsClick}
        >
          All Events
        </Button>
        <Button
          className={`${btnStyles.BtnCalendar} m-2`}
          onClick={handleUserEventsClick}
        >
          My Events
        </Button>
      </div>
      {/* Ternary to display user events if they any, else show all events */}
      {showUserEvents ? (
        <div className={styles.Calendar}>
          <Calendar
            events={myEvent}
            onClickEvent={(event) => handleClickEvent(event)}
          />
        </div>
      ) : (
        <div className={styles.Calendar}>
          <Calendar
            events={allEvents}
            onClickEvent={(event) => handleClickEvent(event)}
          />
        </div>
      )}
    </>
  );
};

export default EventCalendar;
