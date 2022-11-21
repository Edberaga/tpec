import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import Quote from '../../common.json'
import { FooterData } from './FooterData'
import { ContactData } from './FooterData'
import { BsSuitHeartFill } from 'react-icons/bs'
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaYoutube } from 'react-icons/fa'

export const Footer = () =>{
  return (
    <footer>
        <div className="footer-col">
            <Link to="/">
              <img src={require('../../assets/img/logo.jpeg')} alt="TPEC logo" className='nav-logo'/>
            </Link>
            <p>{Quote['footer-summary']}</p>
            <div className="media-col">
              <span className='fb-col media-part'><a target="_blank" rel="noreferrer" href='https://www.facebook.com/ThePeaceEduCentre'><FaFacebookSquare/></a></span>
              <span className='tw-col media-part'><a target="_blank" rel="noreferrer" href='https://twitter.com/?lang=en-my'><FaTwitterSquare/></a></span>
              <span className='in-col media-part'><a target="_blank" rel="noreferrer" href='https://www.instagram.com/'><FaInstagramSquare/></a></span>
              <span className='yt-col media-part'><a target="_blank" rel="noreferrer"  href='https://www.youtube.com/channel/UC8CWQ1cMNgVyU6OUxzEycrQ'><FaYoutube/></a></span>
            </div>
        </div>

        <div className="footer-col">
          <h2>Explore</h2>
          <ul className='footer-nav-menu'>
            {FooterData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} >
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="footer-col">
          <h2>Contact</h2>
          <ul className='footer-nav-menu'>
            {ContactData.map((item, index) => {
              return (
                <li key={index} className='footer-nav-contact'>
                  {item.icon}
                  <span>{item.content}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="footer-col">
          <h2>Support</h2>
          <p>{Quote['footer-support']}</p>
          <button className="footer-donate">
            <Link to='/donate'>
              <BsSuitHeartFill className='nav-user-icon'/>
              <span>Donate</span>
            </Link>
          </button>
        </div>
    </footer>
  )
}