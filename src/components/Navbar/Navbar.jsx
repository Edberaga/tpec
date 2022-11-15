import React, { useState } from 'react';
import {FaBars, FaUserCircle} from 'react-icons/fa';
import {BsTelephoneFill} from 'react-icons/bs'
import {AiFillCloseCircle, AiOutlineMail} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './Navdata';
import './Navbar.css';
import { IconContext } from 'react-icons';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

function Navbar() {
  const [user] = useAuthState(auth);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>

        <div className='nav-bar'>
          <div className='first-bar'> 
            <Link to="/">
              <img src={require('../../assets/img/logo.jpeg')} alt="TPEC logo" className='nav-logo'/>
            </Link>
          </div>

          <div className="second-bar">
            <div className='first-row-nav'>
              <div className='nav-text-col'>
                <li className="nav-text">
                  <BsTelephoneFill/>
                  <span> + 601 8232 2011</span>
                </li>
                <li className="nav-text">
                  <AiOutlineMail style={{ fontSize: '140%' }}/>
                  <span> thepeaceedu@gmail.com</span>
                </li>
              </div>

              <div className="first-row-sos">
                
              </div>
            </div>

            <div className='second-row-nav'>
              <nav className='nav-links-destkop'>
                <ul className='nav-menu-items'>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path} >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
                </ul>
              </nav>
              {/*For the tablet and mobile navbar: */}
              <Link to='#' className='menu-bars'>
                <FaBars onClick={showSidebar} className='menu-btn'/>
              </Link>
              <div className="nav-user">
              {user ? (
                <div className='nav-user-display'>
                  <p className="pe-4">
                    Hi, {user.displayName}
                  </p>
                  
                  <button className="btn btn-primary btn-sm me-3"
                    onClick={()=>{signOut(auth)}}
                    >Logout
                  </button>
                </div>
              ) : (
              <button className="nav-user">
                <Link to='/signup'>
                  <FaUserCircle className='nav-user-icon'/>
                  <span>Sign Up</span>
                </Link>
              </button>
              )}
              

              </div>
            </div>
          </div>
        </div>

        {/*Sidebar code */}
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='close-bars'>
                <AiFillCloseCircle className='close-btn'/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            {/*Phone number */}
            <li className="nav-text">
              <BsTelephoneFill/>
              <span> + 601 8232 2011</span>
            </li>
            {/*Email */}
            <li className="nav-text">
              <AiOutlineMail style={{ fontSize: '130%' }}/>
              <span> thepeaceedu@gmail.com</span>
            </li>
            {/*Sign UP button for phone */}
            <li className='nav-button'>
              <button className="mobile-nav-user">
                  <Link to='/signup'>
                    <FaUserCircle className='mobile-nav-user-icon'/>
                    <span>Sign Up</span>
                  </Link>
                </button>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;