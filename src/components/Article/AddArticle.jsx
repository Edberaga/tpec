import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, {useState} from 'react';
import {  db, storage } from '../../config/firebase';
import './AddArticle.css';

export default function AddArticle() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    createAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);

  const handleChange=(e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleImageChange=(e) => {
    setFormData({...formData, image: e.target.files[0] })
  };

  const handlePublish = () => {
    if(!formData.title || !formData.content || !formData.image){
      alert('Please fill all the fields!');
      return;
    }

    const storageRef = ref(storage, `/article-img/${Date.now()}${formData.image.name}`);

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

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
        setFormData({
          title: "",
          content: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            title: formData.title,
            content: formData.content,
            image: url,
            createAt: Timestamp.now().toDate(),
            likes: [],
            comments: []
          })
            .then(() => {
              alert('Succesfully Add new Articles!');
              setProgress(0);
            })
            .catch((err) => {
              console.log(err);
              alert('Failed to Add new Articles...');
            });
        });
      }
    );
  };

  return (
    <>
      <div className="add-article-form">
        <h2>Create Article</h2>
        {/*Title */}
        <label htmlFor="">Title</label>
        <input 
          type="text" 
          name='title' 
          className='form-control' 
          value={formData.title} 
          onChange={(e)=>handleChange(e)}
        />

        {/*Content*/}
        <label htmlFor="">Content</label>
        <textarea 
          name='content' 
          className='form-control form-textarea' 
          style={{height: 200}} 
          value={formData.content} 
          onChange={(e)=>handleChange(e)}
        />

        {/*Image */}
        <label htmlFor="">Image</label>
        <input type="file" name='image' accept='image/*' className='form-control' onChange={(e)=>handleImageChange(e)}/>

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
            onClick={handlePublish}
          >
            Publish
        </button>
      </div>
    </>
  )
}