import React from 'react'
import { ContactData } from './ContactData'
import './Contact.css'

export default function ContactDetail() {
  return (
    <div className='contact-detail'>
        {ContactData.map((item, index) => {
        return (
        <div className="detail-part" key={index}>
            <h5>{item.name}</h5>
            <p>{item.content}</p>
        </div> 
        );
        })}
    </div>
  )
}
