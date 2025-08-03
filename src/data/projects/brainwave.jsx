import React from 'react';

const Brainwave = () => {
    return (
        <div className="project-container">
            <h1 className="project-title">Brainwave</h1>

            <div className="project-section">
                <h2>Description</h2>
                <p>
                    A React and Tailwind CSS website that includes animations about Brainwave: a Generative AI software.
                    Information about Brainwave, what they do, how they work.
                </p>
            </div>

            <div className="project-section">
                <h2>Tech Stack</h2>
                <div className="tech-stack">
                    <span className="tech-item">React.js</span>
                    <span className="tech-item">Tailwind CSS</span>
                </div>
            </div>

            <div className="project-section">
                <h2>Key Features</h2>
                <ul>
                    <li>Generative AI software showcase</li>
                    <li>Animated website</li>
                    <li>Information about AI technology</li>
                    <li>Responsive design</li>
                </ul>
            </div>

            <div className="project-section">
                <h2>Project Type</h2>
                <p>Web Application - AI Software Showcase</p>
            </div>
        </div>
    );
};

export default Brainwave; 