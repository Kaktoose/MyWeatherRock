import { useState } from "react";
const Footer = () => {

    const [showModal, setShowModal] = useState(false);


    const showCredits = () =>{
        setShowModal(true)
    }

    const dismissCredits = () => {
        setShowModal(false);
    };


    return (
        <>

            <footer className="Footer">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

                <span style={{ "color": "aliceBlue", 'margin': "10px" }}>V2.0.0</span>
                <a onClick={showCredits}><span style={{ "color": "aliceBlue", 'margin': "10px" }}>© 2024 MyWeatherRock</span></a>
                <span class="fa fa-github" style={{ "color": "aliceBlue", 'margin': "10px" }}><a style={{ 'fontSize': 'min(max(3vw, 2vw), 30px)', 'textDecoration': "none", 'color': 'aliceBlue' }} href="https://github.com/Kaktoose/MyWeatherRock/">&#32; GitHub</a></span>


            </footer>

            {showModal &&
                <div className="modal">
                    <div className="modal-content">
                        <h1 style={{color: 'black'}}>MyWeatherRock</h1>
                        <h2 style={{color: 'black', fontSize: '1.25rem'}}>Weather data provided by <a href="https://openweathermap.org/">OpenWeather</a></h2>
                        <h2 style={{color: 'black', fontSize: '1.25rem'}}>Forecast data and icons provided by<a href="https://www.weatherapi.com/"> WeatherAPI</a></h2>
                        <div class="creditLogos">
                        <img style={{maxWidth: '20%'}} src={"/assets/logos/OpenWeather-Master-Logo RGB.png"}></img>
                        <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0"></img>
                        </div>
                        <button onClick={dismissCredits}>Dismiss</button>
                    </div>
                </div>
            }

        
        



        </>
        
        
        
        
    )



}

export default Footer;