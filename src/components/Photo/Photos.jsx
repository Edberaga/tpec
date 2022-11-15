import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../config/firebase'
import { Link } from 'react-router-dom';
import './Photos.css';
import LikePhoto from './LikePhoto';
import { DeletePhoto } from './DeletePhoto';

export default function Photos() {
    const [user] = useAuthState(auth);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const photoRef = collection(db, "Photos");
        const q = query(photoRef, orderBy("photoDate", "desc"));
        onSnapshot(q, (snapshot) => {
            const photos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPhotos(photos);
        });
    }, []);
  return (
    <>
    <div className="photo-container">
        {/*All Photo container */}
        {photos.length === 0 ? (
                <h1>No Photos Available</h1>
        ) : (
        photos.map(({id, photoTitle, photoDate, photoUrl, photoLikes, photoComment}) => (
        <div className="single-photo" key={id}>
            <Link><img src={photoUrl} alt={photoTitle} className="photo-img" /></Link>
            <div className="photo-overlay">
                <div className="photo-content">
                    <h3>{photoTitle}</h3>
                    <p className='photo-date'>
                        {photoDate.toDate().toDateString()}
                    </p>
                    <div className='photo-media'>
                        <Link >
                            <p className="photo-comment">
                                <span>{photoComment?.length}</span> comment
                            </p>
                        </Link>
                        {/* For delete photo button*/
                        user && user.uid === 'wXdT70ui90WaxRTvGBBJcVXZCnp2' ?  (
                            <div className="news-admin-control">
                                <DeletePhoto id={id} image={photoUrl}/>
                            </div>
                        ) : (
                            ''
                        )}
                        <span className="photo-like">
                        {user 
                            ? <><span>{photoLikes?.length}</span> <LikePhoto id={id} likes={photoLikes}> </LikePhoto></>
                            : <Link to={'/login'}>
                                <i className="fas fa-heart fa-lg"> 
                                <span>{photoLikes?.length}</span>
                                </i>
                            </Link>
                        }
                        </span>
                    </div>
                </div>  
            </div>
        </div>
        ))
    )}
    </div>
    </>
  )
}
