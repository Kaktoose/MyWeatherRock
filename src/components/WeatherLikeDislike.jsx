import '../App.css'
import { useState } from 'react'
import { addDoc, collection, query, where, getDocs, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'
import WeatherEnvironment from './WeatherEnvironment';




const WeatherLikeDislike = (props) => {
    const [likePercentage, setLikePercentage] = useState()
    const [dislikePercentage, setDislikePercentage] = useState()


    // const twentyFourHoursAgo = new Date();
    // twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    // const twentyFourHoursAgoTimestamp = Timestamp.fromDate(
    //     twentyFourHoursAgo
    // );



    const today0Am = new Date();
    today0Am.setHours(0)
    today0Am.setMinutes(0)
    const today0AmTimestamp = Timestamp.fromDate(today0Am)

    console.log('date', today0AmTimestamp)
 
    async function getPercentage(props, didLike) {
        const q = query(collection(props.db, "Ratings"), where("createdAt", ">", today0AmTimestamp),  where("location", "==", props.placeName));
        
        const ratingsArray = []

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data())
            ratingsArray.push(doc.data().didLike)
            


            
        });
        console.log(ratingsArray)


        const likes = ratingsArray.filter(Boolean).length
        //console.log('likes', likes)
        const dislikes = ratingsArray.length - likes
       // console.log('dislikes', dislikes)

        if(ratingsArray.length ==0 && didLike == true){
            setLikePercentage(100)
        } else if(ratingsArray.length == 0 && didLike == false){
            setDislikePercentage(100)
        }else{

            setLikePercentage(Math.round(100 * (likes / (likes+dislikes))))
            setDislikePercentage(Math.round(100 * (dislikes/(likes+dislikes))))
        }
  



        

    }

    console.log('trythis', getPercentage)





    const [ratings, loading, error] = useCollection(props.collection);


    const handleLike = async (didLike) => {
        props.setVoteState(true)
        addDoc(props.collection, {
            createdAt: serverTimestamp(),
            didLike: didLike,
            location: props.placeName


        });
        await getPercentage(props, didLike)



    }





    return (
        <div className='weatherreaction'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            {!props.voteState ? <>
                <h2 style={{ 'text-align': 'center' }}>What do you think of the weather?</h2>


                <div className='buttonclass'>

                    <button onClick={() => { handleLike(true) }}><span class=" reactionbutton material-symbols-outlined ">thumb_up</span></button>
                    <button onClick={() => { handleLike(false) }}><span class=" reactionbutton material-symbols-outlined">thumb_down</span></button>
                </div> </> : 
                <table>
                <tbody>
                <tr>
                <td className="material-symbols-outlined">Thumb_up</td>
                <td style={{'fontSize': '1.9rem'}}>{likePercentage}%</td>
                </tr>
                <tr>
                <td className="material-symbols-outlined">thumb_down</td>
                <td style={{'fontSize': '1.9rem'}}>{dislikePercentage}%</td>
                </tr>
                </tbody>
                </table>}



        </div>
    )
}






export default WeatherLikeDislike