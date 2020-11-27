import React from 'react'
import './display.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
    return (
        <div className="about_cont">
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-8">
                        <h1>About :</h1>
                        <p>This website is all about working out with react functionalities and projects .</p>
                        <h3>Playground of React App : </h3>
                        <ul>
                            <li>Folder construction</li>
                            <li>Function and Class</li>
                            <li>Props and State</li>
                            <li>Even binding and event handling</li>
                            <li>Routing functinalities - react-router-dom</li>
                            <li>Bootstrap</li>
                            <li>Axios data fetching using API</li>
                            <li>Axios POST to mysql using PHP Backend</li>
                            <li>Dashboard Designing</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
