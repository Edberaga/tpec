import React from "react";
import Articles from "../../components/Article/Articles";
import AddArticle from "../../components/Article/AddArticle";

import './Blog.css'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

export const Blog = () => {
  const [user] = useAuthState(auth);

  return (
    <>
    <div className="container-heading"><h1>News</h1></div>
      <div className="container-article">
        <Articles/>
      </div>

    {/*If the admin loged in, then able to access the Add Article component */}
    { user && user.uid === 'wXdT70ui90WaxRTvGBBJcVXZCnp2' ? <><AddArticle/></> : <></>}
    </>
  )
}
