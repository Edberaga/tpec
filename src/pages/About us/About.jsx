import React from "react";
import './About.css';
import Quote from '../../common.json'
export const About = () => {
    return (
        <>
        <div className="container-heading"><h1>About Us</h1></div>
            <section className="about-mission">
                <div className="container-section">
                    <div className="about-mission-1">
                        <h1>School Mission</h1>
                        <p>{Quote["our-goal-about"]}</p>
                    </div>
                    <div className="about-mission-2">
                        <img src={require('../../assets/img/school_mission.jpeg')} className="about-mission-img" alt="" />
                    </div>
                </div>
            </section>

            <section className="about-history">
                <div className="container-section">
                    <div className="about-history-1">
                        <img src={require('../../assets/img/school_history.jpg')} className="about-history-img" alt="" />
                    </div>
                    <div className="about-history-2">
                        <h1>History</h1>
                        <p>{Quote["our-history-1"]}</p>
                        <p>{Quote["our-history-2"]}</p>
                        <p>{Quote["our-history-3"]}</p>
                    </div>
                </div>
            </section>
        </>
    )
}