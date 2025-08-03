import React, { useState, useEffect } from 'react';
import TransparentButton from './TransparentButton';

const StatusBar = ({ filename }) => {
    const [position, setPosition] = useState({ line: 1, col: 1 });

    useEffect(() => {
        const handleMouseMove = () => {
            // Generate random line and column numbers (1-99 for example)
            const randomLine = Math.floor(Math.random() * 99) + 1;
            const randomCol = Math.floor(Math.random() * 99) + 1;
            setPosition({ line: randomLine, col: randomCol });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []); // Empty dependency array to run effect only once

    return (
        <div className="bg-[#222223] text-[#e6e6e6] text-xs md:text-xs px-2 md:px-4 py-0.5 flex justify-between items-center">
            <span>{filename || 'No file selected'}</span>
            <div className="hidden md:flex items-center space-x-2 md:space-x-4">
                <span>Ln {position.line}, Col {position.col}</span>
                <span>Spaces: 4</span>
                <span>UTF-8</span>
                <span>CRLF</span>
                <span>{'{}'} JavaScript JSX</span>
                <span>Finish Setup</span>
                <span>Go Live</span>
                <span>Prettier</span>
                <span className="cursor-pointer" role="button" aria-label="Notifications">🔔</span>
            </div>
        </div>
    );
};

export default StatusBar;