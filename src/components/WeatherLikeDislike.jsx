import '../App.css'
import { useState } from 'react'
import { addDoc, collection, query, where, getDocs, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'







const WeatherLikeDislike = (props) => {



    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    const twentyFourHoursAgoTimestamp = Timestamp.fromDate(
        twentyFourHoursAgo
    );



    async function getPercentage() {
        const q = query(collection(props.db, "Ratings"), where("createdAt", ">", twentyFourHoursAgoTimestamp));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    }







    const [ratings, loading, error] = useCollection(props.collection);

    const [voteState, setVoteState] = useState()

    const handleLike = async (didLike) => {
        setVoteState(didLike)
        addDoc(props.collection, {
            createdAt: serverTimestamp(),
            didLike: didLike,
            location: props.placeName


        });



    }





    return (
        <div className='weatherreaction'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            {!voteState ? <>
                <h2 style={{ 'text-align': 'center' }}>What do you think of the weather?</h2>


                <div className='buttonclass'>

                    <button onClick={() => { handleLike(true) }}><span class=" reactionbutton material-symbols-outlined ">thumb_up</span></button>
                    <button onClick={() => { handleLike(true) }}><span class=" reactionbutton material-symbols-outlined">thumb_down</span></button>
                </div> </> : <h2>You voted</h2>}



        </div>
    )
}






export default WeatherLikeDislike