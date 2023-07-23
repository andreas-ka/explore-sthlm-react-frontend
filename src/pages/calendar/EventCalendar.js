import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';

// The calendar library
import Calendar from 'react-awesome-calendar';

// Styles CSS
import styles from "../../styles/Calendar.module.css";

/* Calendar page, fetch the event data from the api and then
maps trough them and show them in the calendar in different
colors depending on the category for the event */

  const EventCalendar = () => {
    const [eventsData, setEventsData] = useState([]);
    const history = useHistory();
  
    useEffect(() => {
      const fetchEventData = async () => {
        try {
          const { data } = await axiosRes.get('/events/');
          const filteredData = data.results.map((event) => ({
            id: event.id,
            title: event.title,
            start_date: event.start_date,
            end_date: event.end_date,
            category: event.category,
          }));
          setEventsData(filteredData);
        } catch (err) {
          console.log(err);
          // Handle the error
        }
      };
  
      fetchEventData();
    }, []); 

    const categoryColorMap = {
      Family: '#57A639', // green
      Music: '#9E9764', // Grey beige
      Sport: '#E1CC4F', // yellow ivory
      Culture: '#FF7514', // orange
      Food: 'pink', // pink
      Shopping: '#B32428', // red
      Sightseeing: '#3B83BD', // blue
    };

    const handleClickEvent = (event) => {
     
      history.push(`/events/${event}`);
    };

    const events =
    eventsData.length > 0
    ? eventsData.map((event) => ({
        id: event.id,
        color: categoryColorMap[event.category] || 'gray',
        from: event.start_date, 
        to: event.end_date, 
        title: event.title,
        category: event.category,
      }))
    : [];

    console.log(events);
    

  return (
    <div className={styles.Calendar}>
      <Calendar
                events={events}
                onClickEvent={(event) => handleClickEvent(event)}         
            />
    </div>
  );
};

export default EventCalendar;
