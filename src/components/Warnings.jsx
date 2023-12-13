import { useEffect, useState } from "react";

import { keys } from "../keys.js";

const Warnings = (props) =>{
    
    
    
    const [events, setEvents] = useState([])
    const [open, setOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState('')
    
    
    function filterAlerts(){

        let alerts = []
        
        console.log(props.alerts)
        props.alerts.forEach(alert => {
            alerts.push({
                'title': alert.headline,
                'description': alert.desc,
                'event': alert.event,
                
            })
            
        });
        
        alerts = alerts.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.event === value.event
        ))
      )
            return alerts
        }

    
    return ( 
        <>
        { filterAlerts().map((alert,index) => {
          //  setSelectedEvent(alert)
            //setOpen(true)
            
            return( 
            <>
            <h2 key={index} className="warningBar"><a onClick={() => {setOpen(true); setSelectedEvent(alert)} }>{alert.event}</a></h2>
            
        </>
        )

        })}
        <dialog open={open}>
            <p>{selectedEvent.title}</p>
            <p>{selectedEvent.description}</p>
            


            <button onClick={()=>{setOpen(false)}}>Dismiss</button>
            
        </dialog>

        </>
    )


    



   

    
  


}



export default Warnings;



