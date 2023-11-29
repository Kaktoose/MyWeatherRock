import './App.css';
import WeatherEnvironment from './components/WeatherEnvironment';
import SiteHeader from './components/SiteHeader'
import Test from './components/WeatherEnvironment'
import { useState } from "react"
import { keys } from "./keys"
import CurrentConditions from './components/CurrentConditions';



function App() {
  const [dataState, setDataState] = useState("")
  const [submittedState, setSubmittedState] = useState(false)

  async function fetchCurrentWeather(e, inputValue){
      setSubmittedState(true)
      e.preventDefault()
      console.log(inputValue)
      let fetchCurrentWeatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=${keys.WEATHER_API}&q=${inputValue}`)
      let currentWeatherData = await fetchCurrentWeatherData.json();     
     setDataState(currentWeatherData) 
  }

  return (
    <body>

    <SiteHeader fetchCurrentWeather = { fetchCurrentWeather } />
    { dataState && <WeatherEnvironment city={dataState.location.name + ", " + dataState.location.region}/> }
    {!submittedState ? <h1 style={{textAlign: "center"}} >No location entered!</h1> : dataState ? <CurrentConditions temp={ dataState.current.temp_c } feelslike={ dataState.current.feelslike_c} humidity={dataState.current.humidity} windspeed={dataState.current.wind_kph} />: <h1 style={{textAlign: "center"}}>Loading...</h1>}
  
    </body> 
    );

    
}

export default App;
