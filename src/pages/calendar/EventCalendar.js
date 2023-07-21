import React, { useEffect, useState } from 'react';

import { axiosRes } from '../../api/axiosDefaults';
import Calendar from 'react-awesome-calendar';
import styles from "../../styles/Calendar.module.css";



  const EventCalendar = () => {
    const [eventsData, setEventsData] = useState([]);
  
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
      Food: 'p#924E7D', // Purple violet
      Shopping: '#B32428', // red
      Sightseeing: '#3B83BD', // blue
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
            />
    </div>
  );
};

export default EventCalendar;
