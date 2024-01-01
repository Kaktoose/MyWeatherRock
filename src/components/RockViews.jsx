import { useEffect, useState } from 'react'
import { addDoc, collection, query, where, getDocs, serverTimestamp, Timestamp, getCountFromServer } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'


const RockViews = (props) =>{

    const [views, setViews] = useState()



    
    useEffect(()=>{
        addDoc(props.collection, {
    
            location: props.placeName
            
            
        });
        
        getViews()
        
    }, [props.placeName])
    
    
    async function getViews(){
        const q = query(props.collection, where("location", "==", props.placeName));
    
        const snapshot = await getCountFromServer(q);
        console.log('count: ', snapshot.data().count);
        await setViews(snapshot.data().count)


    };

    return(
        <h2 className='views'>The weather rock of {props.placeName} has {views} views </h2>
    )

    }



    







export default RockViews


