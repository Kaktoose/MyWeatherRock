import CurrentConditions from "./CurrentConditions";

import getSeason from "../seasons";
import { useState, useEffect } from 'react'


const rockConditions = {
    'rain': '/assets/rock-rain.png',
    'dry': '/assets/rock-base.png',
    'snow': '/assets/rock-snow.png',
    'lightning': '/assets/rock-lightning.png'
}


const rockBackground = (season, dayNight)  => {
    return{
    'clear': `/assets/atmosphere/${season}/clear${dayNight}.png`,
    'cloudy': `/assets/atmosphere/${season}/cloudy${dayNight}.png`,
    'fog': `/assets/atmosphere/${season}/fog${dayNight}.png`,
    'rainy': `/assets/atmosphere/${season}/raining${dayNight}.png`
    }




}




const WeatherEnvironment = (props) => {
    let season = getSeason(props.latitude, props.temp);
    
    if(props.temp > 10){
        season = 'Spring'
    }
    
    
    
    console.log('season:', season);
    console.log(props.temp)
    console.log(props.latitude)
    
    const [background, setBackground] = useState();
    const [rockStatus, setRockStatus] = useState()
    const [message, setMessage] = useState()
    const [isSnowing, setIsSnowing] = useState(false)
    const [isRaining, setIsRaining] = useState(false)
    const [isLightning, setIsLightning] = useState(false)

    
    
    useEffect( () =>{
        const dayNight = props.isDay ? "Day" : "Night"
        console.log('-----', dayNight)
        setIsSnowing(false)
        switch (props.condition) {
            case "Partly cloudy" || "Cloudy" || "Overcast":
                console.log('cloudy')
                setBackground(rockBackground(season, dayNight).cloudy)
                setRockStatus(rockConditions.dry)
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
                    //document.getElementById('environment').classList.add("snow")
                    setIsSnowing(true)
                    break;
                
                case  "Patchy light snow with thunder" || "Moderate or heavy snow with thunder":
                    setMessage(`"Your rock was burnt to a crisp by a bolt of lightning. Womp womp :/" `)
                    setRockStatus(rockConditions.lightning)
                    setIsSnowing(true)
                    setBackground(rockBackground(season, dayNight).cloudy)
                    break;

                case "Patchy light rain with thunder" || "Moderate or heavy rain with thunder" || "Thundery outbreaks possible":
                    setMessage(`"Your lightning was burnt to a crisp by a bolt of lightning. Womp womp :/" `)
                    setRockStatus(rockConditions.lightning)
                    setBackground(rockBackground(season, dayNight).rainy)
                    setIsRaining(true)

                case "Patchy rain possible" || "Patchy light drizzle" || "Light drizzle" || "Patchy light rain" || "Light rain" || "Moderate rain at times" || "Moderate rain" || "Heavy rain at times" || "Heavy rain" || "Light rain shower" || "Moderate or heavy rain shower" || "Torrential rain shower":
                    setMessage(`"Your rock is soaked."`)
                    setBackground(rockBackground(season, dayNight).rainy)
                    setRockStatus(rockConditions.rain)
                    setIsRaining(true)
            } 
            console.log("background", props.condition)
        }, [season, props])
    
    return (
        <>
            <h2 style={{ textAlign: "center", marginBottom: "0" }}>{props.city}</h2>
            <div style={{ marginBottom: "0" }} className="weatherEnvironment" id="environment">
                <img className="rock" src={rockStatus} />
                {isSnowing && <div className="snow"></div> }
                {/*isRaining && <div className="rain"></div>*/}
                <img className="background" src={background} />

            </div>
            <h2 style={{ textAlign: "center", fontStyle: "italic", marginTop: "0" }}>{message}</h2>

        </>
    )



}








export default WeatherEnvironment;