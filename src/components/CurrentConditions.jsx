import { useState, useEffect } from "react"


const CurrentConditions = (props) => {

const [metricState, setMetricState] = useState(true)
const [isStarButtonYellow, setIsStarButtonYellow] = useState(false);


useEffect(() => {
    // Retrieve the default city from localStorage
    const defaultCity = localStorage.getItem('defaultCity');

    // Check if prop.city is equal to the default city from localStorage
    if (props.city === defaultCity) {
      setIsStarButtonYellow(true);
      
    } else {
        setIsStarButtonYellow(false);
     
    }
  }, [props.city]);



function setUnits(){

    setMetricState(prevState => !prevState);
    console.log(metricState)


}





    return (
<>
        {metricState &&
        
        <div className="belowRockContainer">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

<button type="button" className="unitButton" onClick={setUnits}>°C/°F</button>
<button type="button"  id="starButton" onClick={() =>{ localStorage.clear("defaultCity"); localStorage.setItem("defaultCity", props.city); setIsStarButtonYellow(true)}} className="starButton"  ><span className="fa fa-star" style={{ "color": "aliceBlue", 'margin': "0"}}></span></button>


        
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
                    <ul>{props.humidity}%</ul>
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
                <button type="button" className="unitButton"><span class="fa fa-star" style={{ "color": "aliceBlue", 'margin': "0"}}></span></button>


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