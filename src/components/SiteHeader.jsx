import { useState, useEffect } from "react";
import { keys } from "../keys.js";

const SiteHeader = (props) =>{

    const [inputValue, setInputValue] = useState("");
    
    

    
    
    const handleSubmit = (e) => {
        props.fetchCurrentWeather(e, inputValue);
        if (e) {
            e.preventDefault();
        }
    };
    
    const handleSlashSubmit = () => {
        props.fetchCurrentWeatherWithoutEvent(props.slashState);


      };
      useEffect(() => {
        // Extract the value after the slash from the URL
        const path = window.location.pathname;
        const valueAfterSlash = path.substring(path.indexOf('/') + 1);
        console.log(valueAfterSlash, 'valueafterslash')
        props.setSlashState(valueAfterSlash);
    }, []);
    
    useEffect(() => {
        if (props.slashState !== '') {
            console.log(props.slashState);
            console.log('not empty')
            handleSlashSubmit(props.slashState.replace(/\//g, ""))
        }
      }, [props.slashState]);

      console.log(props.slashState)
    



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





