import '../App.css'
import { useEffect, useState } from 'react'
import { addDoc, collection, query, where, getDocs, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'
import WeatherEnvironment from './WeatherEnvironment';




const WeatherLikeDislike = (props) => {
    const today0Am = new Date();
    today0Am.setHours(0);
    today0Am.setMinutes(0);
    const today0AmTimestamp = Timestamp.fromDate(today0Am);
    
    const q = query(collection(props.db, "Ratings"), where("createdAt", ">", today0AmTimestamp), where("location", "==", props.placeName));

    const [querySnapshot, loading, error] = useCollection(q);
    const [likePercentage, setLikePercentage] = useState(0)
    const [dislikePercentage, setDislikePercentage] = useState(0)
    const [votedCity, setVotedCity] = useState('');
    const [didCalculate, setDidCalculate] = useState(false)
    

    useEffect(() => {

        if (votedCity !== props.placeName && props.voteState == true && loading === false) {
            console.log(' querysnapshot', querySnapshot)
            const ratingsArray = querySnapshot.docs.map((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data())
                return doc.data().didLike;

            });
            console.log(ratingsArray)
            if (ratingsArray) {
                const likes = ratingsArray.filter(Boolean).length
                const dislikes = ratingsArray.length - likes

                setLikePercentage(100 * (likes / (likes + dislikes)))
                setDislikePercentage(100 * (dislikes / (likes + dislikes)))
                setVotedCity(props.placeName);
            }
        }

    }, [props.voteState, votedCity, props.placeName, didCalculate, loading, querySnapshot])







    const handleLike = async (didLike) => {

        addDoc(props.collection, {
            createdAt: serverTimestamp(),
            didLike: didLike,
            location: props.placeName


        });

        props.setVoteState(true)


    }




    return (
        <div className='weatherreaction'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            {props.voteState === false
                ? <>
                    <h2 style={{ 'text-align': 'center' }}>What do you think of the weather?</h2>


                    <div className='buttonclass'>

                        <button onClick={() => { handleLike(true) }}><span class=" reactionbutton material-symbols-outlined ">thumb_up</span></button>
                        <button onClick={() => { handleLike(false) }}><span class=" reactionbutton material-symbols-outlined">thumb_down</span></button>
                    </div> </>
                :
                <table>
                    <tbody>
                        <tr>
                            <td className="material-symbols-outlined">Thumb_up</td>
                            <td style={{ 'fontSize': '1.9rem' }}>{likePercentage}%</td>
                        </tr>
                        <tr>
                            <td className="material-symbols-outlined">thumb_down</td>
                            <td style={{ 'fontSize': '1.9rem' }}>{dislikePercentage}%</td>
                        </tr>
                    </tbody>
                </table>}



        </div>
    )
}






export default WeatherLikeDislike