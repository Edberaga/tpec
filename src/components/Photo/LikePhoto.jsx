import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../config/firebase'

export default function LikePhoto({ id, likes}) {
    const [user] = useAuthState(auth);
    const likesRef = doc(db, "Photos", id);

    const handleLike = () => {
        /*if it's already like by the user*/
        if(likes?.includes(user.uid)) {
            updateDoc(likesRef, {
                photoLikes: arrayRemove(user.uid),
            }).then(() => {
                console.log('Unliked');
            }).catch((e) => {
                console.log(e);
            });
        }
        /*if it's haven't like yet.*/
        else {
            updateDoc(likesRef, {
                photoLikes:arrayUnion(user.uid),
            }).then(() => {
                console.log('Liked')
            }).catch((e) => {
                console.log(e);
            });
        }
    }
  return (
    <span>
        <i 
        className={`fas fa-heart${likes?.includes(user.uid)? '-o': ''} fa-lg`} 
        style={{cursor: "pointer", color:likes?.includes(user.uid)? "red" : "black"}}
        onClick={handleLike}
        >
        </i>
    </span>
  )
}