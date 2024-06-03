import CurrentConditions from "./CurrentConditions";

import getSeason from "../seasons";
import { useState, useEffect } from 'react'

const rockConditions = {
    'rain': '/assets/rock-rain.png',
    'dry': '/assets/rock-base.png',
    'snow': '/assets/rock-snow.png',
    'lightning': '/assets/rock-lightning.png',
    'rainfallWarning': '/assets/warning/rain.png',
    'snowWarning': '/assets/warning/snowWarning.png'
}


const rockBackground = (season, dayNight)  => {
    return{
    'clear': `/assets/atmosphere/${season}/clear${dayNight}.png`,
    'cloudy': `/assets/atmosphere/${season}/cloudy${dayNight}.png`,
    'rainy': `/assets/atmosphere/${season}/raining${dayNight}.png`,
    'fog': `/assets/atmosphere/${season}/fog${dayNight}.png`
    
    }




}


const WeatherEnvironment = (props) => {
    let season = getSeason(props.latitude, props.temp);
    
   if(props.temp > 9){
       season = 'Spring'
    }

    if(props.temp < -5){
        season = 'Winter'
    }


    // useEffect(() => {
    //     // Update the URL when inputValue changes
        
    //       window.history.pushState({}, '', `/${props.city}/`);
        
    //   }, [props.city]);
       
    
    const [background, setBackground] = useState();
    const [rockStatus, setRockStatus] = useState()
    const [message, setMessage] = useState()
    const [isSnowing, setIsSnowing] = useState(false)
    const [isRaining, setIsRaining] = useState(false)
    //const [isLightning, setIsLightning] = useState(false)
    let clouds = ["Partly cloudy",  "Cloudy",  "Overcast"]
    let rain = ["Patchy light drizzle", "Light drizzle",  "Patchy rain possible", "Patchy light rain", "Light rain", "Moderate rain at times", "Moderate rain", "Heavy rain at times", "Heavy rain", "Light rain shower", "Moderate or heavy rain shower", "Torrential rain shower", "Moderate or heavy sleet", "Light sleet showers", "Patchy sleet possible",]
    let snow =["Snow" || "Blowing Snow" || "Blizzard", "Light snow", "Patchy light snow", "Patchy moderate snow", "Moderate snow", "Patchy heavy snow", "Heavy snow", "Light snow showers", "Moderate or heavy snow showers", "Patchy freezing drizzle possible", "Freezing drizzle", "Heavy freezing drizzle", "Light Freezing Rain", "Moderate or heavy freezing rain",  "Ice pellets", "Light showers of ice pellets", "Moderate or heavy showers of ice pellets" ]
    let thunder = ["Patchy light snow with thunder", "Moderate or heavy snow with thunder", "Patchy light rain with thunder" ]
    let clear = ["Sunny", "Clear"]
    let fog = ["Fog", "Mist", "Freezing fog"]
    let snowThunder = ["Patchy light snow with thunder", "Moderate or heavy snow with thunder"]
    let rainThunder = ["Moderate or heavy rain with thunder", "Thundery outbreaks possible"]
   

    useEffect( () =>{
        const dayNight = props.isDay ? "Day" : "Night"
        setIsSnowing(false)

        
        
        if(props.main_condition === "Clouds"){
            
            
            setBackground(rockBackground(season, dayNight).cloudy)
            setRockStatus(rockConditions.dry)
            setMessage(`"Your rock has taken up cloud watching, almost as boring as being a rock."`)
            setIsRaining(false)
        } else if(props.main_condition === "Rain"){

            
            setBackground(rockBackground(season, dayNight).rainy)
            setMessage(`"Your rock has taken to sitting in the rain, your rock is now wet. :/"`)
            setRockStatus(rockConditions.rain)
            setIsRaining(true)
        } else if(props.main_condition === "Drizzle"){

            
            setBackground(rockBackground(season, dayNight).rainy)
            setMessage(`"Your rock has taken to sitting in the rain, your rock is now wet. :/"`)
            setRockStatus(rockConditions.rain)
            setIsRaining(true)
        }  
        else if(props.main_condition === "Clear"){

            setBackground(rockBackground(season, dayNight).clear)
            setRockStatus(rockConditions.dry)
            setMessage(`"It would be a shame to take this clear day for granite"`)
            setIsRaining(false)
        } else if(props.main_condition === "Atmosphere"){

            
            setBackground(rockBackground(season, dayNight).fog)
            setRockStatus(rockConditions.dry)
            setMessage(`"Your rock sits in the fog, alone..."`)
            setIsRaining(false)
        } else if(props.main_condition === "Snow"){
            setBackground(rockBackground(season, dayNight).cloudy)
            setRockStatus(rockConditions.snow)
            setMessage(`"Your rock fears of becoming the eye of a snowman"`)
            setIsSnowing(true)
            setIsRaining(false)
        } else if(props.main_condition === "Thunderstorm"){
            
            setBackground(rockBackground(season, dayNight).rainy)
            setIsRaining(true)        
            setRockStatus(rockConditions.lightning)
            
            setMessage('Your rock was burnt to a crisp by lightning. Womp Womp :/')
        }
        
        if(props.warning.includes('RAIN') || props.warning.includes('FLOOD') ){
            setRockStatus(rockConditions.rainfallWarning)
        
        }  else if(props.warning.includes('SNOW') || props.warning.includes('BLIZZARD') || props.warning.includes('WINTER') ){
            setRockStatus(rockConditions.snowWarning)
        }

        if(props.condition.includes('rain')){
            setBackground(rockBackground(season, dayNight).rainy)
            setMessage(`"Your rock has taken to sitting in the rain, your rock is now wet. :/"`)
            setRockStatus(rockConditions.rain)
            setIsRaining(true)

        }
        if(props.condition.includes('Rain')){
            setBackground(rockBackground(season, dayNight).rainy)
            setMessage(`"Your rock has taken to sitting in the rain, your rock is now wet. :/"`)
            setRockStatus(rockConditions.rain)
            setIsRaining(true)

        }
        if(props.condition.includes('RAIN')){
            setBackground(rockBackground(season, dayNight).rainy)
            setMessage(`"Your rock has taken to sitting in the rain, your rock is now wet. :/"`)
            setRockStatus(rockConditions.rain)
            setIsRaining(true)

        }
        if(props.condition.includes('snow')){
            setBackground(rockBackground(season, dayNight).cloudy)
            setRockStatus(rockConditions.snow)
            setMessage(`"Your rock fears of becoming the eye of a snowman"`)
            setIsSnowing(true)
            setIsRaining(false)

        }
        if(props.condition.includes('Snow')){
            setBackground(rockBackground(season, dayNight).cloudy)
            setRockStatus(rockConditions.snow)
            setMessage(`"Your rock fears of becoming the eye of a snowman"`)
            setIsSnowing(true)
            setIsRaining(false)

        }
        if(props.condition.includes('SNOW')){
            setBackground(rockBackground(season, dayNight).cloudy)
            setRockStatus(rockConditions.snow)
            setMessage(`"Your rock fears of becoming the eye of a snowman"`)
            setIsSnowing(true)
            setIsRaining(false)

        }
        
        /*
        switch (props.condition) {
            case "Partly cloudy" || "Cloudy" || "Overcast":
                console.log('cloudy')
                setBackground(rockBackground(season, dayNight).cloudy)
                setRockStatus(rockConditions.dry)
                setMessage(`"Your rock has taken up cloud watching, almost as boring as being a rock."`)
                break;

            case "Light drizzle" || "Patchy light drizzle" || "Patchy rain possible" || "Patchy light rain" || "Light rain" || "Moderate rain at times" || "Moderate rain" || "Heavy rain at times" || "Heavy rain" || "Light rain shower" || "Moderate or heavy rain shower" || "Torrential rain shower":
                setBackground(rockBackground(season, dayNight).rainy)
                setRockStatus(rockConditions.rain)
                setMessage(`"Your rock has taken up cloud watching, almost as boring as being a rock."`)
                break;                
                
                case "Sunny":
                    setBackground(rockBackground(season, dayNight).clear)
                    setRockStatus(rockConditions.dry)
                    setMessage(`"The heat from the sun beams down on your rock, it reminds them of the good old days being formed by heat and pressure underground. Much more interesting then sitting here all day."`)
                    break;
                    
                case "Fog" || "Mist":
                    setBackground(rockBackground(season, dayNight).fog)
                    setRockStatus(rockConditions.dry)
                    setMessage(`"Your rock has taken up cloud watching, almost as boring as being a rock."`)
                    break;


                case "Snow" || "Blowing Snow" || "Blizzard" || "Light snow" || "Patchy light snow" || "Patchy moderate snow" || "Moderate snow" || "Patchy heavy snow" || "Heavy snow" || "Light snow showers" || "Moderate or heavy snow showers" || "Patchy freezing drizzle possible" || "Freezing drizzle" || "Heavy freezing drizzle" || "Light Freezing Rain" || "Moderate or heavy freezing rain":
                    setBackground(rockBackground(season, dayNight).cloudy)
                    setRockStatus(rockConditions.snow)
                    setMessage('snow')
                    setIsSnowing(true)
                    break;
                
                case  "Patchy light snow with thunder", "Moderate or heavy snow with thunder":
                    setMessage(`"Your rock was burnt to a crisp by a bolt of lightning. Womp womp :/"`)
                    setRockStatus(rockConditions.lightning)
                    setIsSnowing(true)
                    setBackground(rockBackground(season, dayNight).cloudy)
                    break;

                case "Patchy light rain with thunder", "Moderate or heavy rain with thunder", "Thundery outbreaks possible":
                    setMessage(`"Your lightning was burnt to a crisp by a bolt of lightning. Womp womp :/" `)
                    setRockStatus(rockConditions.lightning)
                    setBackground(rockBackground(season, dayNight).rainy)
                    break;



                    
            }*/ 
       
        }, [season, props])
    
    return (
        <>
            <h2 style={{ textAlign: "center", marginBottom: "0" }}>{props.city}</h2>
            <div style={{ marginBottom: "0" }} className="weatherEnvironment" id="environment">
                <img className="rock" src={rockStatus} />
                {isSnowing && <div className="snow"></div> }
                {isRaining && <div className="rain"></div>}                
                <img className="background" src={background} />

            </div>
            <h2 style={{ textAlign: "center", fontStyle: "italic", marginTop: "0" }}>{message}</h2>

        </>
    )



}








export default WeatherEnvironment;