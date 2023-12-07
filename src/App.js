import './App.css';
import WeatherEnvironment from './components/WeatherEnvironment';
import SiteHeader from './components/SiteHeader'
import Test from './components/WeatherEnvironment'
import { useState } from 'react'
import { keys } from "./keys"
import CurrentConditions from './components/CurrentConditions';
import getSeason from './seasons.js';

const mockData = {
  "location": {
    "name": "Halifax",
    "region": "Nova Scotia",
    "country": "Canada",
    "lat": 44.65,
    "lon": -63.6,
    "tz_id": "America/Halifax",
    "localtime_epoch": 1701868468,
    "localtime": "2023-12-06 9:14"
  },
  "current": {
    "last_updated_epoch": 1701867600,
    "last_updated": "2023-12-06 09:00",
    "temp_c": -4.1,
    "temp_f": 24.6,
    "is_day": 1,
    "condition": {
      "text": "Moderate or heavy rain with thunder",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
      "code": 1000
    },
    "wind_mph": 2.2,
    "wind_kph": 3.6,
    "wind_degree": 325,
    "wind_dir": "NW",
    "pressure_mb": 1014,
    "pressure_in": 29.95,
    "precip_mm": 0,
    "precip_in": 0,
    "humidity": 86,
    "cloud": 0,
    "feelslike_c": -7.3,
    "feelslike_f": 19,
    "vis_km": 10,
    "vis_miles": 6,
    "uv": 2,
    "gust_mph": 6.4,
    "gust_kph": 10.3
  }
}

function App() {
  const [dataState, setDataState] = useState()
  const [submittedState, setSubmittedState] = useState(false)

  async function fetchCurrentWeather(e, inputValue){
      setSubmittedState(true)
      e.preventDefault()
      console.log(inputValue)
      let fetchCurrentWeatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=${keys.WEATHER_API}&q=${inputValue}`)
      let currentWeatherData = await fetchCurrentWeatherData.json();     
      setDataState(currentWeatherData) 
    }
    console.log(dataState)

  return (
    <body>

    <SiteHeader fetchCurrentWeather = { fetchCurrentWeather } />

   {/* to use api, replace mockData with dataState */}
    { dataState && <WeatherEnvironment temp={dataState.current.temp_c} latitude={dataState.location.lat} isDay={dataState.current.is_day} condition={dataState.current.condition.text} city={dataState.location.name + ", " + dataState.location.region}/> }
    {!submittedState ? <h1 style={{textAlign: "center"}} >No location entered!</h1> : dataState ? <CurrentConditions temp={ dataState.current.temp_c } feelslike={ dataState.current.feelslike_c} humidity={dataState.current.humidity} windspeed={dataState.current.wind_kph} />: <h1 style={{textAlign: "center"}}>Loading...</h1>}
    
    </body> 
    );

    
}

export default App;
