import React from 'react';

const TicTacTwo = () => {
    return (
        <div className="project-container">
            <h1 className="project-title">Tic Tac Two</h1>

            <div className="project-section">
                <h2>Description</h2>
                <p>
                    An advanced version of Tic-Tac-Toe where your first move vanishes when you make your fourth move. ♟📱
                </p>
                <p>
                    Developed in Android Studio using Java, this game introduces a new level of strategy where only the last three moves of each player remain visible,
                    eliminating the possibility of a tie. The game features smooth animations and an intuitive UI for a competitive experience.
                </p>
            </div>

            <div className="project-section">
                <h2>Tech Stack</h2>
                <div className="tech-stack">
                    <span className="tech-item">Android Studio</span>
                    <span className="tech-item">Java</span>
                </div>
            </div>

            <div className="project-section">
                <h2>Key Features</h2>
                <ul>
                    <li>Advanced Tic-Tac-Toe gameplay</li>
                    <li>Vanishing moves mechanic</li>
                    <li>Strategic gameplay</li>
                    <li>Smooth animations</li>
                    <li>Intuitive UI</li>
                    <li>No-tie guarantee</li>
                </ul>
            </div>

            <div className="project-section">
                <h2>Project Type</h2>
                <p>Mobile Application - Android Game</p>
            </div>
        </div>
    );
};

export default TicTacTwo; 