import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

function Sidebar({ files, activeFile, onSelect, temporaryFiles = [] }) {
    const [openFolders, setOpenFolders] = useState({});

    const toggleFolder = (folderName) => {
        setOpenFolders((prev) => ({
            ...prev,
            [folderName]: !prev[folderName],
        }));
    };

    const paddingMap = ['pl-0', 'pl-3', 'pl-6', 'pl-9', 'pl-12', 'pl-15', 'pl-18'];

    const renderFiles = (items, parentKey = '', depth = 0) => (
        <ul className="py-1">
            {items.map((item) => {
                if (item.type === 'folder') {
                    const folderKey = parentKey + item.name;
                    const isOpen = openFolders[folderKey] ?? item.isOpen;
                    const paddingClass = paddingMap[depth] || 'pl-12';
                    const folderRowClass = depth === 0
                        ? `flex items-center cursor-pointer select-none py-1 bg-[rgba(103,107,121,0.3)] w-full ${paddingClass}`
                        : `flex items-center cursor-pointer select-none w-full ${paddingClass}`;
                    const chevronOffset = 6;
                    const depthPadding = 8 * depth; // Adjusted for smaller padding
                    const lineLeft = chevronOffset + depthPadding;
                    return (
                        <li key={folderKey} className="relative">
                            <div
                                className={folderRowClass}
                                onClick={() => toggleFolder(folderKey)}
                            >
                                <span className="mr-1 relative" style={{ width: '16px', display: 'inline-block' }}>
                                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </span>
                                <span className={depth === 0 ? 'font-semibold text-sm' : 'text-sm'}>{item.name}</span>
                            </div>
                            {isOpen && item.children && (
                                <div className="flex flex-row relative">
                                    <span
                                        className="absolute top-0 w-px bg-[#676b79]"
                                        style={{ left: `${lineLeft}px`, height: '100%', minHeight: '100%' }}
                                    />
                                    <div className="flex-1">
                                        {renderFiles(item.children, folderKey + '/', depth + 1)}
                                    </div>
                                </div>
                            )}
                        </li>
                    );
                } else {
                    const fileKey = parentKey + item.name;
                    const paddingClass = paddingMap[depth] || 'pl-12';
                    return (
                        <li
                            key={fileKey}
                            onClick={() => onSelect(item.name)}
                            className={`px-2 py-0.5 cursor-pointer ${paddingClass} hover:bg-[rgba(103,107,121,0.3)] ${activeFile === item.name ? 'bg-[rgba(103,107,121,0.3)] text-[#19f9d8]' : 'text-[#e6e6e6]'
                                } text-xs md:text-sm`}
                        >
                            {item.icon && (
                                <img src={item.icon} alt="icon" className="inline-block w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 align-middle" />
                            )}
                            {item.name}
                        </li>
                    );
                }
            })}
        </ul>
    );

    // Create a modified files structure that includes temporary files
    const getFilesWithTemporaryFiles = () => {
        const filesCopy = JSON.parse(JSON.stringify(files)); // Deep copy
        const portfolioFolder = filesCopy[0]; // "Vishesh's Portfolio" folder

        // Find the index of resume.md to insert temporary files after it
        const resumeIndex = portfolioFolder.children.findIndex(item => item.name === 'resume.md');

        // Add temporary files after resume.md
        if (resumeIndex !== -1) {
            temporaryFiles.forEach((tempFileName, index) => {
                const tempFile = {
                    type: 'file',
                    name: tempFileName,
                    icon: '/logos/pythonLogo.svg'
                };
                portfolioFolder.children.splice(resumeIndex + 1 + index, 0, tempFile);
            });
        }

        return filesCopy;
    };

    return (
        <div className="bg-[#222223] w-full md:w-60 h-full text-white border-r border-[#222223] overflow-y-auto">
            <div className="flex justify-between items-center font-normal p-2 text-[#e6e6e6] text-xs md:text-sm">
                <span>EXPLORER</span>
                <span className="cursor-default pb-2">...</span>
            </div>
            <div className="pt-1">{renderFiles(getFilesWithTemporaryFiles())}</div>
        </div>
    );
}

export default Sidebar;