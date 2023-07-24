import React from "react";
import ReactWeather, { useOpenWeather } from "react-open-weather";


// Weather widget that's showing the current weather in Stockholm
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
        key: '7b5f855dea5801df1df9469b143c0742',
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
