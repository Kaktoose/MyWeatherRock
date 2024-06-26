import { useState, useEffect } from "react"


const CurrentConditions = (props) => {

    const [metricState, setMetricState] = useState(true)
    const [isStarButtonYellow, setIsStarButtonYellow] = useState(false);

    const forecast = props.forecast

    function copyToClipboard(){
        const url = window.location.href;
        
        // Create a temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = url;
        document.body.appendChild(tempInput);
        
        // Select the text field
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices
        
        // Copy the text inside the text field
        document.execCommand('copy');
        
        // Remove the temporary input element
        document.body.removeChild(tempInput);
        
        // Optional: Alert the user that the text has been copied
        alert('Link copied to clipboard: ' + url);

    }


    function getDirection() {
        if (props.winddirection >= 337.5 || props.winddirection < 22.5) {
            return "N"; // North
        } else if (props.winddirection >= 22.5 && props.winddirection < 67.5) {
            return "NE"; // North-East
        } else if (props.winddirection >= 67.5 && props.winddirection < 112.5) {
            return "E"; // East
        } else if (props.winddirection >= 112.5 && props.winddirection < 157.5) {
            return "SE"; // South-East
        } else if (props.winddirection >= 157.5 && props.winddirection < 202.5) {
            return "S"; // South
        } else if (props.winddirection >= 202.5 && props.winddirection < 247.5) {
            return "SW"; // South-West
        } else if (props.winddirection >= 247.5 && props.winddirection < 292.5) {
            return "W"; // West
        } else if (props.winddirection >= 292.5 && props.winddirection < 337.5) {
            return "NW"; // North-West
        } else {
            return "Invalid degree"; // This case should not happen if the input is correct
        }
    }
    

    function capitalizeConditions(){


        return props.currentConditions.replace(/\b\w/g, function(char, props) {
            return char.toUpperCase();
        });

    }





    function setUnits() {

        setMetricState(prevState => !prevState);
        console.log(metricState)


    }



    function dayOfWeek(epoch) {

        const date = new Date(epoch);
        // Array of day names



        var userTimezoneOffset = date.getTimezoneOffset() * 60000;
        const newDate = new Date(date.getTime() + userTimezoneOffset);


        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        // Get the day of the week as a number (0-6)
        const dayOfWeekNumber = newDate.getDay();
        



        // Get the name of the day
        const dayOfWeekName = daysOfWeek[dayOfWeekNumber];
        
        console.log(epoch, date, dayOfWeekNumber, dayOfWeekName)
        return dayOfWeekName;
    }

    useEffect(() => {
        // Update the URL when inputValue changes
        
        window.history.pushState({}, '', `/${props.city}`);        
      }, [props.city]);

    return (
        <>
            {metricState &&
                <>

                    <div className="belowRockContainer">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

                        <button type="button" className="unitButton" onClick={setUnits}>°C/°F</button>
                        <button type="button" id="starButton" onClick={() => { localStorage.clear("defaultCity"); localStorage.setItem("defaultCity", props.city); alert(`Default location set to ${props.justcity}`) }} className="starButton"  ><span className="fa fa-star" style={{ "color": "aliceBlue", 'margin': "0" }}></span></button>
                        <button type="button" id="starButton" onClick={copyToClipboard} className="starButton"  ><span className="fa fa-share" style={{ "color": "aliceBlue", 'margin': "0" }}></span></button>
                        


                        <h2 style={{ 'textAlign': 'center', "color": "aliceblue" }}>{capitalizeConditions()}</h2>
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
                                    <ul>{props.windspeed} km/h</ul>
                                </li>
                                <li className="conditionLists">
                                    <ul><strong>Wind Direction</strong></ul>
                                    <ul>{getDirection()}</ul>
                                </li>






                            </div>






                        </div>







                    </div>
                    <div className="dailyForecast">
                        <div id="today" className="forecastTable">
                            <h2>Today</h2>
                            <img style={{ 'margin': 'auto' }} src={forecast.forecast.forecastday[0].day.condition.icon} />

                            <h2>{forecast.forecast.forecastday[0].day.avgtemp_c}°C</h2>
                            <h3>{forecast.forecast.forecastday[0].day.mintemp_c}°C/{forecast.forecast.forecastday[0].day.maxtemp_c}°C</h3>


                        </div>

                        <div id="tomorrow" className="forecastTable">
                            <h2>Tomorrow</h2>
                            <img style={{ 'margin': 'auto' }} src={forecast.forecast.forecastday[1].day.condition.icon} />

                            <h2>{forecast.forecast.forecastday[1].day.avgtemp_c}°C</h2>
                            <h3>{forecast.forecast.forecastday[1].day.mintemp_c}°C/{forecast.forecast.forecastday[1].day.maxtemp_c}°C</h3>

                        </div>
                        <div id="day2" className="forecastTable">
                        <h2>{dayOfWeek(forecast.forecast.forecastday[2].date)}</h2>
                            <img style={{ 'margin': 'auto' }} src={forecast.forecast.forecastday[2].day.condition.icon} />

                            <h2>{forecast.forecast.forecastday[2].day.avgtemp_c}°C</h2>
                            <h3>{forecast.forecast.forecastday[2].day.mintemp_c}°C/{forecast.forecast.forecastday[2].day.maxtemp_c}°C</h3>

                        </div>





                    </div>
                </>

            }
            {!metricState &&
                <>
                    <div className="belowRockContainer">
                        <button type="button" className="unitButton" onClick={setUnits}>°C/°F</button>
                        <button type="button" className="unitButton"><span class="fa fa-star" style={{ "color": "aliceBlue", 'margin': "0" }}></span></button>
                        <button type="button" id="starButton" onClick={copyToClipboard} className="starButton"  ><span className="fa fa-share" style={{ "color": "aliceBlue", 'margin': "0" }}></span></button>


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
                                    <ul>{props.windspeedM} mph</ul>
                                </li>
                                <li className="conditionLists">
                                    <ul><strong>Wind Direction</strong></ul>
                                    <ul>{getDirection()}</ul>
                                </li>






                            </div>






                        </div>



                    </div>
                        <div className="dailyForecast">
                            <div id="today" className="forecastTable">
                                <h2>Today</h2>
                                <img style={{ 'margin': 'auto' }} src={forecast.forecast.forecastday[0].day.condition.icon} />

                                <h2>{forecast.forecast.forecastday[0].day.avgtemp_f}°F</h2>
                                <h3>{forecast.forecast.forecastday[0].day.mintemp_f}°F/{forecast.forecast.forecastday[0].day.maxtemp_f}°F</h3>


                            </div>

                            <div id="tomorrow" className="forecastTable">
                                <h2>Tomorrow</h2>
                                <img style={{ 'margin': 'auto' }} src={forecast.forecast.forecastday[1].day.condition.icon} />

                                <h2>{forecast.forecast.forecastday[1].day.avgtemp_f}°F</h2>
                                <h3>{forecast.forecast.forecastday[1].day.mintemp_f}°F/{forecast.forecast.forecastday[1].day.maxtemp_f}°F</h3>

                            </div>
                            <div id="day2" className="forecastTable">
                                <h2>{dayOfWeek(forecast.forecast.forecastday[2].date)}</h2>
                                <img style={{ 'margin': 'auto' }} src={forecast.forecast.forecastday[2].day.condition.icon} />

                                <h2>{forecast.forecast.forecastday[2].day.avgtemp_f}°F</h2>
                                <h3>{forecast.forecast.forecastday[2].day.mintemp_f}°F/{forecast.forecast.forecastday[2].day.maxtemp_f}°F</h3>

                            </div>





                        </div>
                </>
            }

        </>
    )




}


export default CurrentConditions