import React from "react";
import ContactForm from "./ContactForm";
import ContactDetail from "./ContactDetail";
import './Contact.css';

export const Contact = () => {
    return (
        <>
        <div className="contact-heading">
            <h4>Let's Get known each other</h4>
            <h1>Contact With Us</h1>
        </div>

        <div className="contact">
            <ContactForm/>
            <ContactDetail/>
        </div>
        </>
    )
}