import { useState, useEffect } from "react";

import { keys } from "../keys.js";

const SiteHeader = (props) =>{


    const [inputValue, setInputValue] = useState("");
    
    
    
    
    
    
    
    const handleSubmit = (e) => {
        props.fetchCurrentWeather(e, inputValue);
        e.preventDefault();
    };
    
    
    

    return <nav>
        <h1 style={{padding: '0 1rem'}} className="siteTitle">MyWeatherRock</h1>
        <form id="searchForm" onSubmit={handleSubmit}>
                <search>
                    <input
                        autoFocus
                        id="searchCity"
                        placeholder="Enter Location..."
                        type="search"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </search>
            </form>


    </nav>


}



export default SiteHeader;





