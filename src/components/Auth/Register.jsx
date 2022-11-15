import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {auth} from '../../config/firebase'
import './Register.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, {displayName: name});
            navigate("/");
        } catch(error) {
            alert('Error sign up...' + error);
            console.log(error);
        }
    }

  return (
    <>
    <div className="border p-4 bg-light" style={{maxWidth: '600px', margin: '5vw auto'}}>
        <h1 style={{textAlign: "center"}}>Sign Up</h1>
        {/*Name*/}
        <div className="form-group">
            <label>Name</label>
            <input 
                type="text"
                className='form-control'
                placeholder='Enter your Name'
                onChange={(e)=>{setName(e.target.value)}}
            />
        </div>
        {/*Email*/}
        <div className="form-group">
            <label>Email</label>
            <input 
                type="text"
                className='form-control'
                placeholder='Enter your Email'
                onChange={(e)=>{setEmail(e.target.value)}}
            />
        </div>
        {/*Password*/}
        <div className="form-group">
            <label>Password</label>
            <input 
                type="password"
                className='form-control'
                placeholder='Write your Password'
                onChange={(e)=>{setPassword(e.target.value)}}
            />
        </div>
        {/*confirm Password*/}
        <div className="form-group">
            <label>Confirm Password</label>
            <input 
                type="password"
                className='form-control'
                placeholder='Confirm your Password'
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
            />
        </div>

        <div style={{textAlign: 'center', marginTop: '5%'}}>
            <button className="btn btn-warning" onClick={handleRegister}>Register</button>
            <p style={{marginTop: '5px'}}>If already registered then <Link to="/login" className='register-link'>Login</Link> here</p>
        </div>
    </div>
    </>
  )
}
