import { useState } from "react";

import { keys } from "../keys.js";

const SiteHeader = (props) =>{



    const [inputValue, setInputValue] = useState("");


   

    return <nav>
        <h1 style={{padding: '0 1rem'}} className="siteTitle">MyWeatherRock</h1>
        <search>
    
        <input id="searchCity" placeholder="Enter Location..." type="search" onKeyDown={ (e) =>{ if(e.key == "Enter") {props.fetchCurrentWeather(e, inputValue)}  } } value={inputValue} onChange={(e)=> setInputValue(e.target.value) } />
        </search>


    </nav>


}



export default SiteHeader;





