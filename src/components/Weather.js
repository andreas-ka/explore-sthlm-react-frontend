import React from "react";

// Weather imports
import ReactWeather, { useOpenWeather } from "react-open-weather";

// Weather widget that's showing the current weather in Stockholm
const WeatherComponent = () => {
  const customStyles = {
    fontFamily: "Helvetica, sans-serif",
    gradientStart: "#ff851c",
    gradientMid: "rgb(125 125 125)",
    gradientEnd: "#343a40",
    locationFontColor: "#FFF",
    todayTempFontColor: "#FFF",
    todayDateFontColor: "#FFF",
    todayRangeFontColor: "#FFF",
    todayDescFontColor: "#FFF",
    todayInfoFontColor: "#FFF",
    todayIconColor: "#FFF",
    forecastBackgroundColor: "#FFF",
    forecastSeparatorColor: "#DDD",
    forecastDateColor: "black",
    forecastDescColor: "black",
    forecastRangeColor: "black",
    forecastIconColor: "#ff851c",
  };

 

  const { data, isLoading, errorMessage } = useOpenWeather({
    key: process.env.REACT_APP_WEATHER_API_KEY,
    lat: "57.64188017795392",
    lon: "18.292565198468033",
    lang: "en",
    unit: "metric",
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
