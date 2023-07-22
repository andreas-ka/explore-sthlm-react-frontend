import React from "react";
import ReactWeather, { useOpenWeather } from "react-open-weather";
import appStyles from "../App.module.css";
import { Container } from "react-bootstrap";

const WeatherComponent = () => {
  
    
    const customStyles = {
        fontFamily:  'Helvetica, sans-serif',
        gradientStart:  '#ff851c',
        gradientMid:  'rgb(125 125 125)',
        gradientEnd:  '#343a40',
        locationFontColor:  '#FFF',
        todayTempFontColor:  '#FFF',
        todayDateFontColor:  '#B5DEF4',
        todayRangeFontColor:  '#B5DEF4',
        todayDescFontColor:  '#B5DEF4',
        todayInfoFontColor:  '#B5DEF4',
        todayIconColor:  '#FFF',
        forecastBackgroundColor:  '#FFF',
        forecastSeparatorColor:  '#DDD',
        forecastDateColor:  '#777',
        forecastDescColor:  '#777',
        forecastRangeColor:  '#777',
        forecastIconColor:  '#ff851c',
    };

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: process.env.REACT_APP_WEATHER_API_KEY,
        lat: "57.64188017795392",
        lon: "18.292565198468033",
        lang: "en",
        unit: "metric" // values are (metric, standard, imperial)
      });

  return (
      <ReactWeather
        theme={customStyles}
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel="Stockholm"
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        showForecast
      />
  );
};

export default WeatherComponent;
