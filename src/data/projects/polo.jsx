import React from 'react';

const Polo = () => {
    return (
        <div className="project-container">
            <h1 className="project-title">Polo</h1>

            <div className="project-section">
                <h2>Description</h2>
                <p>
                    Polo is a location-sharing compass app designed for festivals, raves, and crowded events.
                    It lets friends link up through username-based connections and track each other's directions in real time using a simple compass interface.
                </p>
                <p>
                    Built with React Native, Supabase, and Expo, Polo focuses on instant online-only connectivity.
                    Users can add friends, send mutual tracking requests, and see multiple arrows on their compass pointing toward accepted friends —
                    making it easier to stay together in chaotic environments.
                </p>
            </div>

            <div className="project-section">
                <h2>Tech Stack</h2>
                <div className="tech-stack">
                    <span className="tech-item">React Native</span>
                    <span className="tech-item">Supabase</span>
                    <span className="tech-item">Expo</span>
                </div>
            </div>

            <div className="project-section">
                <h2>Key Features</h2>
                <ul>
                    <li>Real-time location sharing</li>
                    <li>Compass-based navigation</li>
                    <li>Username-based connections</li>
                    <li>Mutual tracking requests</li>
                    <li>Multiple friend tracking</li>
                    <li>Festival/event optimized</li>
                    <li>Cross-platform (iOS/Android)</li>
                </ul>
            </div>

            <div className="project-section">
                <h2>Project Type</h2>
                <p>Mobile Application - React Native</p>
            </div>
        </div>
    );
};

export default Polo; 