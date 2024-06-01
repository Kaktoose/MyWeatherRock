import "./App.css";
import WeatherEnvironment from "./components/WeatherEnvironment";
import SiteHeader from "./components/SiteHeader";
import Test from "./components/WeatherEnvironment";
import PatchNotes from "./components/PatchNotes.jsx";
import { useState, useEffect } from "react";
import { keys } from "./keys";
import CurrentConditions from "./components/CurrentConditions";
import getSeason from "./seasons.js";
import Warnings from "./components/Warnings.jsx";
import Footer from "./components/Footer.jsx";
import { FIREBASE_CONFIG } from "./secrets.js";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

import { getAnalytics, logEvent } from "firebase/analytics";

const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

const analytics = getAnalytics(app);

logEvent(analytics, "page_view");

const mockData = {
  location: {
    name: "Halifax",
    region: "Nova Scotia",
    country: "Canada",
    lat: 44.65,
    lon: -63.6,
    tz_id: "America/Halifax",
    localtime_epoch: 1701868468,
    localtime: "2023-12-06 9:14",
  },
  current: {
    last_updated_epoch: 1701867600,
    last_updated: "2023-12-06 09:00",
    temp_c: -4.1,
    temp_f: 24.6,
    is_day: 1,
    condition: {
      text: "Light drizzle",
      icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
      code: 1000,
    },
    wind_mph: 2.2,
    wind_kph: 3.6,
    wind_degree: 325,
    wind_dir: "NW",
    pressure_mb: 1014,
    pressure_in: 29.95,
    precip_mm: 0,
    precip_in: 0,
    humidity: 86,
    cloud: 0,
    feelslike_c: -7.3,
    feelslike_f: 19,
    vis_km: 10,
    vis_miles: 6,
    uv: 2,
    gust_mph: 6.4,
    gust_kph: 10.3,
  },
  alerts: {
    alert: [
      {
        headline:
          "Flood Warning issued January 05 at 9:47PM EST until January 07 at 6:15AM EST by NWS",
        msgtype: "Alert",
        severity: "Moderate",
        urgency: "Expected",
        areas: "Calhoun; Lexington; Richland",
        category: "Met",
        certainty: "Likely",
        event: "Snowfall Warning",
        note: "Alert for Calhoun; Lexington; Richland (South Carolina) Issued by the National Weather Service",
        effective: "2021-01-05T21:47:00-05:00",
        expires: "2021-01-07T06:15:00-05:00",
        desc: "...The Flood Warning continues for the following rivers in South\nCarolina...\nCongaree River At Carolina Eastman affecting Richland, Calhoun\nand Lexington Counties.\nCongaree River At Congaree National Park-Gadsden affecting\nCalhoun and Richland Counties.\nNorth Fork Edisto River At Orangeburg affecting Orangeburg County.\n...The Flood Warning is now in effect until Thursday morning...\nThe Flood Warning continues for\nthe Congaree River At Carolina Eastman.\n* Until Thursday morning.\n* At 9:28 PM EST Tuesday the stage was 115.6 feet.\n* Flood stage is 115.0 feet.\n* Minor flooding is occurring and minor flooding is forecast.\n* Recent Activity...The maximum river stage in the 24 hours ending\nat 9:28 PM EST Tuesday was 118.2 feet.\n* Forecast...The river will rise to 115.7 feet just after midnight\ntonight. It will then fall below flood stage tomorrow morning to\n114.2 feet and begin rising again tomorrow evening. It will rise\nto 114.3 feet early Thursday morning. It will then fall again and\nremain below flood stage.\n* Impact...At 115.0 feet, Flooding occurs in low lying areas of the\nCarolina Eastman Facility and at the Congaree National Park.\n* Flood History...This crest compares to a previous crest of 116.3\nfeet on 12/03/2020.\n&&",
        instruction:
          "A Flood Warning means that flooding is imminent or occurring. All\ninterested parties should take necessary precautions immediately.\nMotorists should not attempt to drive around barricades or drive\ncars through flooded areas.\nCaution is urged when walking near riverbanks.\nAdditional information is available at www.weather.gov.\nThe next statement will be issued Wednesday morning at 1000 AM EST.",
      },
    ],
  },
};

const mockAlert = {
  alerts: {
    alert: [
      {
        headline:
          "Flood Warning issued January 05 at 9:47PM EST until January 07 at 6:15AM EST by NWS",
        msgtype: "Alert",
        severity: "Moderate",
        urgency: "Expected",
        areas: "Calhoun; Lexington; Richland",
        category: "Met",
        certainty: "Likely",
        event: "Rainfall Warning",
        note: "Alert for Calhoun; Lexington; Richland (South Carolina) Issued by the National Weather Service",
        effective: "2021-01-05T21:47:00-05:00",
        expires: "2021-01-07T06:15:00-05:00",
        desc: "...The Flood Warning continues for the following rivers in South\nCarolina...\nCongaree River At Carolina Eastman affecting Richland, Calhoun\nand Lexington Counties.\nCongaree River At Congaree National Park-Gadsden affecting\nCalhoun and Richland Counties.\nNorth Fork Edisto River At Orangeburg affecting Orangeburg County.\n...The Flood Warning is now in effect until Thursday morning...\nThe Flood Warning continues for\nthe Congaree River At Carolina Eastman.\n* Until Thursday morning.\n* At 9:28 PM EST Tuesday the stage was 115.6 feet.\n* Flood stage is 115.0 feet.\n* Minor flooding is occurring and minor flooding is forecast.\n* Recent Activity...The maximum river stage in the 24 hours ending\nat 9:28 PM EST Tuesday was 118.2 feet.\n* Forecast...The river will rise to 115.7 feet just after midnight\ntonight. It will then fall below flood stage tomorrow morning to\n114.2 feet and begin rising again tomorrow evening. It will rise\nto 114.3 feet early Thursday morning. It will then fall again and\nremain below flood stage.\n* Impact...At 115.0 feet, Flooding occurs in low lying areas of the\nCarolina Eastman Facility and at the Congaree National Park.\n* Flood History...This crest compares to a previous crest of 116.3\nfeet on 12/03/2020.\n&&",
        instruction:
          "A Flood Warning means that flooding is imminent or occurring. All\ninterested parties should take necessary precautions immediately.\nMotorists should not attempt to drive around barricades or drive\ncars through flooded areas.\nCaution is urged when walking near riverbanks.\nAdditional information is available at www.weather.gov.\nThe next statement will be issued Wednesday morning at 1000 AM EST.",
      },
    ],
  },
};

function App() {
  const [dataState, setDataState] = useState();
  const [submittedState, setSubmittedState] = useState(false);
  const [alertState, setAlertState] = useState();

  const [errorState, setErrorState] = useState("No matching location found.");
  async function fetchCurrentWeather(e, inputValue) {
    setSubmittedState(true);
    if (e) {
      e.preventDefault();
    }

    let fetchCurrentWeatherLocation = await fetch (`https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`)
    

    let currentWeatherLocation = await fetchCurrentWeatherLocation.json();

    let locationLat = currentWeatherLocation[0].lat;
    let locationLon = currentWeatherLocation[0].lon;
    
    // let fetchCurrentWeatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=${keys.WEATHER_API}&q=${inputValue}&alerts=yes`)
    
    let fetchCurrentWeatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locationLat}&lon=${locationLon}&units=metric&appid=${keys.OWM_API}`
    );
    
    let currentWeatherData = await fetchCurrentWeatherData.json();
   

   
    if (currentWeatherData.weather) {
      
      let fetchForecast = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${keys.WEATHER_API}&q=${locationLat},${locationLon}&days=5&aqi=no&alerts=yes`
      );
      let forecast = await fetchForecast.json();
      setDataState(currentWeatherData)
      setAlertState(forecast);

    } else {
      setErrorState('womp');
      alert(errorState);
    }
  }

  useEffect(() => {
    const defaultCity = localStorage.getItem("defaultCity");
    if (defaultCity) {
      fetchCurrentWeather(null, defaultCity); // Pass null for the event parameter
    }
  }, []);

  return (
    <>
      <body>
        <PatchNotes />
        <SiteHeader
          fetchCurrentWeather={fetchCurrentWeather}
          //datastate={dataState}
        />
        {alertState && alertState.alerts.alert[0]?.event[0] ? (
          <Warnings alerts={alertState.alerts.alert} />
        ) : (
          <div></div>
        )}

        {/* to use api, replace mockData with dataState */}
        {dataState && (
          <WeatherEnvironment
            temp={dataState.main.temp}
            warning={alertState.alerts.alert[0]?.event.toUpperCase() || "none"}
            latitude={dataState.coord.lat}
            isDay={dataState.dt >= dataState.sys.sunset || dataState.dt <= dataState.sys.sunrise ? 0 : 1}
            condition={dataState.weather[0].description}
            city={alertState.location.name + ", " + alertState.location.region}
            main_condition={dataState.weather[0].main}
          />
        )}
        {!submittedState ? (
          <h1
            style={{
              textAlign: "center",
              minHeight: "calc(100vh - 100px - 80px)",
            }}
          >
            No location entered!
          </h1>
        ) : dataState ? (
          <>
            <div className="  ">
              <CurrentConditions
                city={
                  alertState.location.name + ", " + alertState.location.region
                }
                justcity={alertState.location.name}
                temp={Math.round(dataState.main.temp)}
                feelslike={Math.round(dataState.main.feels_like)}
                humidity={dataState.main.humidity}
                windspeed={Math.round(dataState.wind.speed)}
                currentConditions={dataState.weather[0].description}
                winddirection={dataState.wind.deg}
                visibility={dataState.visibility / 1000}
                tempF={Math.round(9/5 * dataState.main.temp + 32)}
                feelslikeF={Math.round(9/5 * dataState.main.feels_like + 32)}
                windspeedM={Math.round(dataState.wind.speed * 0.621371)}
                forecast={alertState}
              />
            </div>
          </>
        ) : (
          <h1
            style={{
              textAlign: "center",
              minHeight: "calc(100vh - 100px - 80px)",
            }}
          >
            Loading...
          </h1>
        )}
      </body>
      <Footer />
    </>
  );
}

export default App;
