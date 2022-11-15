import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AddPhoto from "../../components/Photo/AddPhoto";
import Photos from "../../components/Photo/Photos";
import { auth } from "../../config/firebase";

export const Gallery = () => {
    const [user] = useAuthState(auth);
    return (
        <>
        <div className="container-heading"><h1>Gallery</h1></div>
        
        <div className="container-section">
            <Photos/>
        </div>

        {/*If the admin loged in, then able to access the Add Article component */}
        { user && user.uid === 'wXdT70ui90WaxRTvGBBJcVXZCnp2' ? <><AddPhoto/></> : <></>}
        </>
    )
}