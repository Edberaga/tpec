import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { db, storage } from '../../config/firebase';

export default function AddPhoto() {
    const [uploadData, setUploadData] = useState({
        title: "",
        content: "",
        image: "",
        photoDate: Timestamp.now().toDate()
    });

    const [progress, setProgress] = useState(0);

    const uploadImageContent = (e) => {
        setUploadData({...uploadData, [e.target.name]: e.target.value});
    };

    const uploadImageFile = (e) => {
        setUploadData({...uploadData, image: e.target.files[0]})
    };

    const handleUpload = () => {
        if(!uploadData.title || !uploadData.content || !uploadData.image){
            alert('Please fill all the fields!');
            return;
        }

        const storageRef = ref(storage, `/images/${Date.now()}${uploadData.image.name}`);
        const uploadImage = uploadBytesResumable(storageRef, uploadData.image);

        uploadImage.on(
            "state_changed",
            (snapshot) => {
                const progressPercent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progressPercent);
            },
            (err) => {
                console.log(err);
            },
            () => {
                setUploadData({
                    title: "",
                    content: "",
                    image: "",
                });

                getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                    const galleryRef = collection(db, "Photos");
                    addDoc(galleryRef, {
                        photoTitle: uploadData.title,
                        photoDesc: uploadData.content,
                        photoUrl: url,
                        photoDate: Timestamp.now().toDate(),
                        photoLikes: [],
                        photoComment: []
                    })
                    .then(() => {
                        alert('Succesfully upload new Image!');
                        setProgress(0);
                    })
                    .catch((err) => {
                        console.log(err);
                        alert('Failed to upload new Image...');
                    });
                });
            }
        );
    };

  return (
    <>
    <div className="add-article-form">
        <h2>Upload Photo</h2>
        {/*Title */}
        <label htmlFor="">Photo Title</label>
        <input 
          type="text" 
          name='title' 
          className='form-control' 
          value={uploadData.title} 
          onChange={(e)=>uploadImageContent(e)}
        />

        {/*Content*/}
        <label htmlFor="">Photo Description</label>
        <textarea 
          name='content' 
          className='form-control form-textarea' 
          style={{height: 200}} 
          value={uploadData.content} 
          onChange={(e)=>uploadImageContent(e)}
        />

        {/*Image */}
        <label htmlFor="">Image</label>
        <input type="file" name='image' accept='image/*' className='form-control' onChange={(e)=>uploadImageFile(e)}/>

        {/*Progress Bar */}
        {progress === 0 ? ''
        :
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped bg-warning"
            style={{ width: `${progress}%` }}
          >
            {`uploading image ${progress}%`}
          </div>
        </div>
        }

        <button
            className="form-control btn btn-warning mt-2"
            onClick={handleUpload}
          >
            Upload
        </button>
      </div>
    </>
  )
}