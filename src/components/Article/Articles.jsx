import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {auth, db} from '../../config/firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import './Articles.css'
import DeleteArticle from "./DeleteArticle";
import LikeArticle from "./LikeArticle";

export default function Articles() {
  const [user] = useAuthState(auth);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
    });
  },[]);
  return (
  <>
  {
    articles.length === 0 ? (
    <h1>Loading the Articles...</h1>
  ):(
    articles.map(({id, title, content, image, createAt, likes, comments}) => (
      <div className="news-card" key={id}>
        <Link to={`/blog/${id}`}>
          <div className="news-image" style={{backgroundImage: `url(${image})`} } />
        </Link>
        <div className="news-word">
            <p className="news-date">{createAt.toDate().toDateString()}</p>
            <h1>{title}</h1>
            <p className="news-content">{content}</p>
            <Link to={`/blog/${id}`}><p className="news-read-more">Read More</p></Link>
        </div>
        <div className="news-icon">
          <div className="news-media">
              <p className="news-comment">
                <Link to={`/blog/${id}`}><span>{comments?.length}</span> comment</Link>
              </p>
              <p className="news-like">
                {user 
                ? <><LikeArticle id={id} likes={likes} className="news-like-icon"> </LikeArticle><span>{likes?.length}</span></>
                : <Link to={'/login'}><i className="fas fa-heart fa-lg"> <span>{likes?.length}</span></i></Link>
                }
              </p>
          </div>
          {
            user && user.uid === 'wXdT70ui90WaxRTvGBBJcVXZCnp2' ?  (
              <div className="news-admin-control">
                <DeleteArticle id={id} image={image}/>
              </div>
            ) : (
              ''
            )
          }
        </div>
      </div>
      ))
    )
  }
  </>
  )
}