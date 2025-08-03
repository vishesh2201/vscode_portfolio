import React, { useState, useRef, useEffect } from "react";
import { Search, Menu } from 'lucide-react';
import TransparentButton from './TransparentButton';
import minimize from '../assets/minimize.svg';
import smallScreen from '../assets/smallscreen.svg';
import cross from '../assets/cross.svg';

const menuItems = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'];

const fileMenuOptions = [
    'New File',
    'Open File...',
    'Open Folder...',
    'Save',
    'Save As...',
    'Preferences',
    'Exit'
];

function TopMenuBar({ toggleSidebar, onNewFile, onTerminalClick }) {
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef();

    // Close menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMenuClick = (option, e) => {
        e.stopPropagation();
        if (option === 'New Text File' || option === 'New File...') {
            onNewFile();
        } else if (option === 'New Terminal') {
            onTerminalClick();
        }
        setOpenMenu(null);
    };

    return (
        <div className="w-full flex items-center justify-between px-2 py-1 bg-[#222223] text-[#19f9d8] text-sm select-none relative">
            {/* Sidebar Toggle (Mobile Only) */}
            <button
                className="md:hidden p-2 focus:outline-none"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <Menu size={20} className="text-[#19f9d8]" />
            </button>

            {/* Menu Items */}
            <div className="hidden md:flex gap-2 relative" ref={menuRef}>
                {menuItems.map((item) => (
                    <div
                        key={item}
                        onClick={() => setOpenMenu(openMenu === item ? null : item)}
                        className="hover:bg-[rgba(103,107,121,0.4)] px-2 py-1 rounded cursor-pointer"
                    >
                        {item}
                        {/* File Menu Dropdown */}
                        {openMenu === 'File' && item === 'File' && (
                            <div className="absolute top-full left-0 mt-1 bg-[#3c3c3c] border border-[#373b41] text-white rounded shadow-md z-100 w-64 py-1 max-h-[calc(100vh-100px)] overflow-y-auto hide-scrollbar">
                                {/* Section 1 */}
                                {['New Text File', 'New File...', 'New Window', 'New Window with Profile ⮞'].map((option) => (
                                    <div
                                        key={option}
                                        className="px-3 py-1.5 hover:bg-[#292a2b] hover:text-[#19f9d8] cursor-pointer"
                                        onClick={(e) => handleMenuClick(option, e)}
                                    >
                                        {option}
                                    </div>
                                ))}
                                <hr className="border-[#373b41] my-1" />

                                {/* Section 2 */}
                                {['Open File...', 'Open Folder...', 'Open Workspace from File...', 'Open Recent ⮞'].map((option) => (
                                    <div key={option} className="px-3 py-1.5 hover:bg-[#292a2b] hover:text-[#19f9d8] cursor-pointer">{option}</div>
                                ))}
                                <hr className="border-[#373b41] my-1" />

                                {/* Section 3 */}
                                {['Add Folder to Workspace...', 'Save Workspace As...', 'Duplicate Workspace'].map((option) => (
                                    <div key={option} className="px-3 py-1.5 hover:bg-[#292a2b] hover:text-[#19f9d8] cursor-pointer">{option}</div>
                                ))}
                                <hr className="border-[#373b41] my-1" />

                                {/* Section 4 */}
                                {['Save', 'Save As...', 'Save All'].map((option) => (
                                    <div key={option} className="px-3 py-1.5 hover:bg-[#292a2b] hover:text-[#19f9d8] cursor-pointer">{option}</div>
                                ))}
                                <hr className="border-[#373b41] my-1" />

                                {/* Section 5 */}
                                <div className="px-3 py-1.5 hover:bg-[#292a2b] hover:text-[#19f9d8] cursor-pointer">Share ⮞</div>
                                <hr className="border-[#373b41] my-1" />

                                {/* Section 6 */}
                                {['Auto Save', 'Preferences ⮞'].map((option) => (
                                    <div key={option} className="px-3 py-1.5 hover:bg-[#292a2b] hover:text-[#19f9d8] cursor-pointer">{option}</div>
                                ))}
                                <hr className="border-[#373b41] my-1" />

                                {/* Section 7 */}
                                {['Revert File', 'Close Editor', 'Close Folder', 'Close Window'].map((option) => (
                                    <div key={option} className="px-3 py-1.5 hover:bg-[#292a2b] hover:text-[#19f9d8] cursor-pointer">{option}</div>
                                ))}
                                <hr className="border-[#373b41] my-1" />

                                {/* Exit */}
                                <div className="px-3 py-1.5 hover:bg-[#292a2b] hover:text-[#19f9d8] cursor-pointer">Exit</div>
                            </div>
                        )}

                        {/* Terminal Menu Dropdown */}
                        {openMenu === 'Terminal' && item === 'Terminal' && (
                            <div className="absolute top-full left-0 mt-1 bg-[#3c3c3c] border border-[#373b41] text-white rounded shadow-md z-100 w-48 py-1">
                                <div
                                    className="px-3 py-1.5 hover:bg-[#292a2b] hover:text-[#19f9d8] cursor-pointer"
                                    onClick={(e) => handleMenuClick('New Terminal', e)}
                                >
                                    New Terminal
                                </div>
                                <hr className="border-[#373b41] my-1" />
                                <div className="px-3 py-1.5 hover:bg-[#292a2b] hover:text-[#19f9d8] cursor-pointer">Split Terminal</div>
                                <div className="px-3 py-1.5 hover:bg-[#292a2b] hover:text-[#19f9d8] cursor-pointer">Kill Terminal</div>
                                <hr className="border-[#373b41] my-1" />
                                <div className="px-3 py-1.5 hover:bg-[#292a2b] hover:text-[#19f9d8] cursor-pointer">Clear</div>
                                <div className="px-3 py-1.5 hover:bg-[#292a2b] hover:text-[#19f9d8] cursor-pointer">Clear Scrollback</div>
                            </div>
                        )}

                    </div>
                ))}
            </div>

            {/* Search Bar */}
            <div className="flex items-center justify-center bg-[rgba(103,107,121,0.1)] border border-[rgba(25,249,216,0.5)] rounded w-full md:w-80 lg:w-120 px-2 py-1 shadow-sm mx-2">
                <Search size={14} className="text-[#19f9d8] mr-2" />
                <span className="text-[#19f9d8] font-medium truncate">Vishesh's Portfolio</span>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
                <TransparentButton ariaLabel="Minimize window">
                    <img src={minimize} alt="minimize" className="w-2.5 h-2.5" />
                </TransparentButton>
                <TransparentButton ariaLabel="Maximize or restore window">
                    <img src={smallScreen} alt="small screen" className="w-2.5 h-2.5" />
                </TransparentButton>
                <TransparentButton ariaLabel="Close window">
                    <img src={cross} alt="close" className="w-2.5 h-2.5" />
                </TransparentButton>
            </div>
        </div>
    );
}

export default TopMenuBar;
