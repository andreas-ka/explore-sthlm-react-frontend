import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import { axiosRes } from '../../api/axiosDefaults';

import timezone from 'dayjs/plugin/timezone'
dayjs.extend(timezone)

const djLocalizer = dayjsLocalizer(dayjs)

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

  const EventCalendar = ({ ...props }) => {
    const [eventsData, setEventsData] = useState([]);
  
    useEffect(() => {
      const fetchEventData = async () => {
        try {
          const { data } = await axiosRes.get('/events/');
          setEventsData(data);
        } catch (err) {
          console.log(err);
          // Handle the error
        }
      };
  
      fetchEventData();
    }, []);

  function Dayjs({ ...props }) {
  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(2023, 4, 1),
      max: dayjs().endOf('day').subtract(1, 'hours').toDate(),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  )


  return (
    <div className="height600" {...props}>
      <Calendar
        components={components}
        defaultDate={defaultDate}
        events={eventsData.map((event) => ({
          title: event.title,
          start: new Date(event.startdate),
          end: new Date(event.enddate),
        }))}
        localizer={dayjsLocalizer(dayjs)}
        max={max}
        showMultiDayTimes
        step={60}
        views={views}
      />
    </div>
  );
};

export default EventCalendar;
