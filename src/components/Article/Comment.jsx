import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { v4 as uuidv4} from 'uuid';
import './Comment.css'

export default function Comment({ id }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [currentUser] = useAuthState(auth);
    const commentRef = doc(db, "Articles", id);

    useEffect(() => {
        const docRef = doc(db, "Articles", id);
        onSnapshot(docRef, (snapshot) => {
            setComments(snapshot.data().comments);
        });
    }, []);

    const changeComment = (e) => {
        if(e.key === "Enter") {
            updateDoc(commentRef, {
                comments:arrayUnion({
                    user: currentUser.uid,
                    userName: currentUser.displayName,
                    comment: comment,
                    createAt: new Date(),
                    commentId: uuidv4()
                }),
            }).then(
            () => {
                 setComment("");
            });
        }
    };

    const deleteComment = async(comment) => {
        //use window confirm to consider Admin or User to delete the comments or not.
        if(window.confirm("Are you sure you want to delete this Comment?")) {
            try {
            console.log(comment);
            updateDoc(commentRef, {
                comments:arrayRemove(comment),
            })}
            catch(error) {
                alert("Error Deleting Comment...");
                console.log(error);
            }
        }
    }

  return (
    <div>
        {
            comments !== null &&
            comments.map(({commentId, user, comment, userName, createAt}) => (
                <div key={commentId}>
                    <div className="border comment-container">
                        <div className="coll-11">
                            <p className={` ${
                                currentUser && currentUser.uid === user
                                ? "comment-currentUser"
                                : "comment-user"
                            }`}>{userName}</p>
                            <p className='comment-content'>{comment}</p>
                        </div>

                        <div className="row">
                            <p className='comment-bar'>
                            {currentUser && currentUser.uid === user ? (
                            <>
                                <span
                                    className='comment-delete' 
                                    style={{cursor:"pointer", color:"red"}} 
                                    onClick={() => deleteComment({commentId, user, comment, userName, createAt})}>
                                    Delete
                                </span> 
                                <span className='separate'>|</span>
                                <span
                                    className='comment-edit'
                                    style={{cursor:"pointer", color:"var(--primary-color)"}} 
                                    //onClick={() => editComment(comment)}>
                                    >
                                    Edit
                                </span>
                            </>
                            ) : ('')}
                            <span className='comment-date'>{createAt.toDate().toDateString()}</span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {
                currentUser ? (
                    <input 
                        type="text" 
                        className="form-control mt04 mb-5" 
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                        placeholder="Write a Comment..."
                        onKeyUp={(e) => {changeComment(e)}}
                    />
                )
                : (
                    <h2> </h2>
                )
            }
    </div>
  )
}
