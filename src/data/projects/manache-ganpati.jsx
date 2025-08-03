import React from 'react';

const ManacheGanpati = () => {
    return (
        <div className="project-container">
            <h1 className="project-title">Manache 5 Ganpati App</h1>

            <div className="project-section">
                <h2>Description</h2>
                <p>
                    An Android app providing real-time updates about the Manache Ganpati in Pune, built using Java and Google Maps API. 🏛📍
                </p>
                <p>
                    Developed in Android Studio using Java, this app allows users to view live updates on the 5 Manache Ganpati locations in Pune.
                    It features Google Maps integration for real-time navigation, ensuring devotees can easily locate and visit each Ganpati pandal during the festival.
                </p>
            </div>

            <div className="project-section">
                <h2>Tech Stack</h2>
                <div className="tech-stack">
                    <span className="tech-item">Android Studio</span>
                    <span className="tech-item">Java</span>
                    <span className="tech-item">Google Maps API</span>
                </div>
            </div>

            <div className="project-section">
                <h2>Key Features</h2>
                <ul>
                    <li>Real-time updates on Ganpati locations</li>
                    <li>Google Maps integration</li>
                    <li>Live navigation</li>
                    <li>Location tracking</li>
                    <li>Festival-specific information</li>
                </ul>
            </div>

            <div className="project-section">
                <h2>Project Type</h2>
                <p>Mobile Application - Android</p>
            </div>
        </div>
    );
};

export default ManacheGanpati; 