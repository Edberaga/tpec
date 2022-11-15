import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import './Register.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch(error) {
            alert('Error Login...' + error);
            console.log(error);
        }
    }

  return (
    <>
    <div className="border p-4 bg-light" style={{maxWidth: '500px', margin: '5vw auto'}}>
        <h1 style={{textAlign: "center"}}>Login</h1>
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

        <div style={{textAlign: 'center', marginTop: '5%'}}>
            <button className="btn btn-warning" onClick={handleLogin}>Login</button>
            <p style={{marginTop: '5px'}}>Don't have account? <Link to="/signup" className='register-link'>Sign up</Link> here</p>
        </div>
    </div>
    </>
  )
}
