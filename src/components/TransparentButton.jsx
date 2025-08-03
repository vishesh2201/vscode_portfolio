import React from 'react';

const TransparentButton = ({ children, onClick, ariaLabel, className = '' }) => {
    return (
        <button
            className={`bg-transparent !bg-transparent p-1 rounded-full flex items-center justify-center text-[#e6e6e6] hover:text-[#19f9d8] hover:opacity-80 transition-all duration-200 outline-none focus:outline-none border-none ${className}`}
            onClick={onClick}
            aria-label={ariaLabel}
            style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
        >
            {children}
        </button>
    );
};

export default TransparentButton;