import React, { useState } from "react";
import { axiosRes } from '../api/axiosDefaults';
import { Rating } from '@smastrom/react-rating'

const StarRating = () => {
    const [state, setState] = useState({
      review: '',
      rating: 0 // Initial value
    })
  
      console.log(selectedValue)
      const handleChange = async (selectedValue) => {
        console.log(selectedValue)
        try {
          const { data } = await axiosRes.post("/ratings/", { event: id });
          setEvents((prevEvents) => ({
            ...prevEvents,
            results: prevEvents.results.map((event) => {
              return event.id === id
                ? {
                    ...event,
                    rating_count: event.rating_count + 1,
                    rating_id: data.id,
                  }
                : event;
            }),
          }));
        } catch (err) {
          console.log(err);
        }
      };

  
    return <Rating onChange={handleChange} value={state.rating} />
 

export default StarRating;