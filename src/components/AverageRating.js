import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import React, { useState } from "react";
import EventPage from "./EventPage";


const [rating, setRating] = useState();

export const fetchRatings = async () => {
    try {
      const { data } = await axiosRes.get("/ratings/");
      // Handle the fetched ratings data
      // e.g., setRatings(data);
      return data;
    } catch (err) {
      console.log(err);
      // Handle the error
    }
  };

  export const calculateAverage = (ratings) => {
    if (ratings.length === 0) {
      return 0; // Return 0 if there are no ratings
    }
  
    const total = ratings.reduce((sum, rating) => sum + rating.value, 0);
    const averageRating = total / ratings.length;
    return averageRating;
  };
