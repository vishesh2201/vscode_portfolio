import React from 'react';

const LinkedOut = () => {
    return (
        <div className="project-container">
            <h1 className="project-title">linkedOut</h1>

            <div className="project-section">
                <h2>Description</h2>
                <p>
                    A full-stack web application designed to help users prepare for technical interviews.
                    Built with Next.js, Tailwind CSS, and Firebase for seamless user experience and secure data management.
                </p>
            </div>

            <div className="project-section">
                <h2>Tech Stack</h2>
                <div className="tech-stack">
                    <span className="tech-item">Next.js</span>
                    <span className="tech-item">Firebase</span>
                    <span className="tech-item">React.js</span>
                    <span className="tech-item">VAPI</span>
                </div>
            </div>

            <div className="project-section">
                <h2>Key Features</h2>
                <ul>
                    <li>Technical interview preparation</li>
                    <li>Full-stack application</li>
                    <li>Secure data management</li>
                    <li>Seamless user experience</li>
                </ul>
            </div>

            <div className="project-section">
                <h2>Project Type</h2>
                <p>Full-Stack Web Application</p>
            </div>
        </div>
    );
};

export default LinkedOut; 