const CurrentConditions = (props) =>{
    return<div className="container">
    <table cellPadding={"11"} className="conditionsTable">
    <caption style={{textAlign: "center", padding: "0.5rem 0"}}>{props.city}</caption>
    <tbody>
    <tr >
    <td >&nbsp;Temp</td>
    <td style={{textAlign: "right"}}>&nbsp;{props.temp}°C</td>
    </tr>
    <tr >
    <td >&nbsp;Feels Like</td>
    <td style={{textAlign: "right"}}>&nbsp;{props.feelslike}°C</td>
    </tr>
    <tr >
    <td >&nbsp;Humidity</td>
    <td style={{textAlign: "right"}}>{props.humidity}%</td>
    </tr>
    <tr >
    <td >&nbsp;Wind Speed</td>
    <td style={{textAlign: "right"}}>{props.windspeed}km/h</td>
    </tr>
    </tbody>
    </table>
    </div> 




}


export default CurrentConditions