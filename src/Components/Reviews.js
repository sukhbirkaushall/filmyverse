import React from 'react'
import { useState, useEffect } from 'react'
import ReactStars from 'react-stars'
import swal from 'sweetalert'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import { reviewsRef, db } from './firebase/firebase'
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'


const Review = ({ id, prevRating, userRated}) => {
    const [rating, setRating] = useState(0);
    const [form, setForm] = useState("");
    const [inc, setInc] = useState("");
    const [loading, setLoading] = useState(false);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [newAdded, setNewAdded] = useState(0);

    const sendReview = async () => {
        setLoading(true);
        try {
            await addDoc(reviewsRef, {
                movieid: id,
                name: "User",
                rating: rating,
                thoughts: form,
                timestamp: new Date().getTime()
            })

            const ref = doc(db, "movies", id);
            await updateDoc(ref, {
                rating: prevRating + rating,
                rated: userRated + 1
            })

            setRating(0);
            setForm("");
            setNewAdded(newAdded + 1);
            swal({
                title: "Review Sent",
                icon: "success",
                buttons: false,
                timer: 3000
            })
        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false);

    }
    useEffect(() => {
        async function getData() {
            setReviewsLoading(true);
            setData([]);
            let quer = query(reviewsRef, where('movieid', '==', id))
            const querySnapshot = await getDocs(quer);

            querySnapshot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })

            setReviewsLoading(false);
        }
        getData();
    },[newAdded])

    return (
        <div className='mt-4 border-t-2 border-gray-700 w-full'>
            <ReactStars
                size={30}
                half={true}
                value={rating}
                onChange={(rate) => setRating(rate)}
            />
            <input className='w-full p-2 bg-gray-900 outline-none header'
                value={form}
                onChange={(e) => setForm(e.target.value)}
                placeholder='Your Reviews'
            />
            <button onClick={sendReview} className='bg-green-600 flex justify-center w-full p-2'>
                {loading ? <TailSpin height={20} color="white" /> : 'Share'}
            </button>

            {reviewsLoading ? 
            <div className='mt-6 flex justify-center'><ThreeDots height={10} color="white" /></div> :
        <div className='mt-4'>
            {data.map((e, i) => {
                return(
                    <div className=' p-2 w-full border-b header bg-opacity-50 border-gray-600 mt-2' key={i}>
                        <div className='flex items-center'>
                            <p className='text-blue-500'>{`${e.name+(i+1)}`}</p>
                            <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                        </div>
                        <ReactStars
                            size={15}
                            half={true}
                            value={e.rating}
                            edit={false}
                        />

                        <p>{e.thoughts}</p>
                    </div>     
                )
            })}
        </div>
        }
        </div>
    )
}

export default Review
