import React from 'react';

const GuessTheFlag = () => {
    return (
        <div className="project-container">
            <h1 className="project-title">Guess the Flag</h1>

            <div className="project-section">
                <h2>Description</h2>
                <p>
                    A fun quiz game where you identify country flags, featuring a hint system and score tracking. 🚩🧠
                </p>
                <p>
                    This interactive Kotlin-based quiz game tests users on their knowledge of world flags.
                    Players get four multiple-choice options per question, with a hint system to assist them.
                    The app maintains a scorekeeping system and features a simple, engaging UI for an enjoyable learning experience.
                </p>
            </div>

            <div className="project-section">
                <h2>Tech Stack</h2>
                <div className="tech-stack">
                    <span className="tech-item">Android Studio</span>
                    <span className="tech-item">Kotlin</span>
                </div>
            </div>

            <div className="project-section">
                <h2>Key Features</h2>
                <ul>
                    <li>World flag identification</li>
                    <li>Multiple choice questions</li>
                    <li>Hint system</li>
                    <li>Score tracking</li>
                    <li>Educational content</li>
                    <li>Engaging UI</li>
                </ul>
            </div>

            <div className="project-section">
                <h2>Project Type</h2>
                <p>Mobile Application - Android Educational Game</p>
            </div>
        </div>
    );
};

export default GuessTheFlag; 