import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { deleteObject, ref } from 'firebase/storage';

export function DeletePhoto({id, image}) {
    const handleDelete = async() => {
        //use window confirm to consider Admin to delete the article or not.
        if(window.confirm("Are you sure you want to delete this Photo?")) {
            try {
                await deleteDoc(doc(db, "Photos", id))
                alert("Photo Deleted Successfully")
                
                //Delete the image from the storage
                const storageRef = ref(storage, image)
                await deleteObject(storageRef)
            } 
            catch(error) {
                alert("Error Deleting Photo...", error)
                console.log(error)
            }
        }
    }
    
  return (
    <>
        <button 
        className='btn btn-danger m-0'
        style={{borderRadius: "50%", fontSize: "14px", padding: "5px 10px"}} 
        onClick={handleDelete}>
            X
        </button>
    </>
  )
}