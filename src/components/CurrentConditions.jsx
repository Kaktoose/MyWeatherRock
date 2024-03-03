import { useState, useEffect } from "react"


const CurrentConditions = (props) => {

    const [metricState, setMetricState] = useState(true)
    const [isStarButtonYellow, setIsStarButtonYellow] = useState(false);

    const forecast = props.forecast











    function setUnits() {

        setMetricState(prevState => !prevState);
        console.log(metricState)


    }



    function dayOfWeek(epoch) {

        const date = new Date(epoch);

        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


        return days[date.getDay()]

    }



    return (
        <>
            {metricState &&
                <>

                    <div className="belowRockContainer">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

                        <button type="button" className="unitButton" onClick={setUnits}>°C/°F</button>
                        <button type="button" id="starButton" onClick={() => { localStorage.clear("defaultCity"); localStorage.setItem("defaultCity", props.city); alert(`Default location set to ${props.justcity}`) }} className="starButton"  ><span className="fa fa-star" style={{ "color": "aliceBlue", 'margin': "0" }}></span></button>



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
                            <h2>{dayOfWeek(forecast.forecast.forecastday[2].date_epoch)}</h2>
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
                                <h2>{dayOfWeek(forecast.forecast.forecastday[2].date_epoch)}</h2>
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