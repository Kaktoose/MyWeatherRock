import { useState, useEffect } from "react"


const CurrentConditions = (props) => {

const [metricState, setMetricState] = useState(false)


function setUnits(){

    setMetricState(prevState => !prevState);
    console.log(metricState)


}


    return (
<>
        {metricState &&
        <div className="belowRockContainer">
<button type="button" className="unitButton" onClick={setUnits}>°C/°F</button>

        
            <h2 style={{ 'textAlign': 'center', "color": "aliceblue" }}>{props.currentConditions}</h2>
        <div className="belowRockContainerFlex">
            
            
            <div id="lists">
                <li className="conditionLists">
                    <ul><strong>Temperature</strong></ul>
                    <ul>{props.temp}°C</ul>
                </li>
                <li className="conditionLists">
                    <ul><strong>Feels Like</strong></ul>
                    <ul>{props.feelslike}°C</ul>
                </li>
                <li className="conditionLists">
                    <ul><strong>Humidity</strong></ul>
                    <ul>{props.feelslike}%</ul>
                </li>
                <li className="conditionLists">
                    <ul><strong>Wind Speed</strong></ul>
                    <ul>{props.windspeed}km/h</ul>
                </li>
                <li className="conditionLists">
                    <ul><strong>Wind Direction</strong></ul>
                    <ul>{props.winddirection}</ul>
                </li>






            </div>






        </div>
        </div>
}
    {!metricState && 
    <>
            <div className="belowRockContainer">
                <button type="button" className="unitButton" onClick={setUnits}>°C/°F</button>

            <h2 style={{ 'textAlign': 'center', "color": "aliceblue" }}>{props.currentConditions}</h2>
            <div className="belowRockContainerFlex">
                
                
                <div id="lists">
                    <li className="conditionLists">
                        <ul><strong>Temperature</strong></ul>
                        <ul>{props.tempF}°F</ul>
                    </li>
                    <li className="conditionLists">
                        <ul><strong>Feels Like</strong></ul>
                        <ul>{props.feelslikeF}°F</ul>
                    </li>
                    <li className="conditionLists">
                        <ul><strong>Humidity</strong></ul>
                        <ul>{props.humidity}%</ul>
                    </li>
                    <li className="conditionLists">
                        <ul><strong>Wind Speed</strong></ul>
                        <ul>{props.windspeedM}mph</ul>
                    </li>
                    <li className="conditionLists">
                        <ul><strong>Wind Direction</strong></ul>
                        <ul>{props.winddirection}</ul>
                    </li>
    
    
    
    
    
    
                </div>
    
    
    
    
    
    
            </div>
            </div>
            </>
            }
            
</>
    )




}


export default CurrentConditions