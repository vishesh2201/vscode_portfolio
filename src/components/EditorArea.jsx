import React, { useEffect, useRef, useState } from 'react';
import TransparentButton from './TransparentButton';
import VideoModal from './VideoModal';
import gmailLogo from '../assets/gmailLogo.svg';
import githubLogo from '../assets/githubLogo.svg';
import linkedInLogo from '../assets/linkedInLogo.svg';
import instagramLogo from '../assets/instagramlogo.svg';
import runCode from '../assets/runcode.svg';
import splitScreen from '../assets/splitscreen.svg';
import searchIcon from '../assets/search.svg';
import printIcon from '../assets/print.svg';

// Static file content
const fileContent = {
    'about-me.jsx': `Hi, I'm Vishesh — a passionate full-stack developer with a drive for building impactful, user-focused web applications.
I specialize in creating scalable and efficient solutions across the front and back end, with a keen eye for clean design and robust architecture. Whether it's building from scratch or optimizing existing systems, I love transforming ideas into seamless digital experiences.`,
    // Removed static 'contact.json' entry
    'resume.md': `# Resume

📄 **Vishesh's Resume**

Your resume PDF will be displayed below. Make sure to place your resume.pdf file in the public folder.

## Instructions:
1. Save your resume as "resume.pdf" 
2. Place it in the "public" folder of your project
3. The PDF will automatically load and display here

*Note: If you don't see the PDF, please check that the file is named "resume.pdf" and is in the public folder.*`,

    // Project files
    'clash-of-clans.jsx': `Clash of Clans Landing Page

Description:
A React and GSAP-powered landing page for Clash of Clans with advanced animations. Built to showcase expertise in React and GSAP animations, creating an immersive user experience.

Tech Stack:
• React.js ⚛️
• GSAP 🎨
• Tailwind CSS 🌬️

Key Features:
• Advanced GSAP animations
• Responsive design
• Immersive user experience
• Interactive elements`,

    'linkedout.tsx': `linkedOut

Description:
A full-stack web application designed to help users prepare for technical interviews. Built with Next.js, Tailwind CSS, and Firebase for seamless user experience and secure data management.

Tech Stack:
• Next.js ⚡
• Firebase 🔥
• React.js ⚛️
• VAPI 🎤

Key Features:
• Technical interview preparation
• Full-stack application
• Secure data management
• Seamless user experience`,

    'brainwave.jsx': `Brainwave

Description:
A React and Tailwind CSS website that includes animations about Brainwave: a Generative AI software. Information about Brainwave, what they do, how they work.

Tech Stack:
• React.js ⚛️
• Tailwind CSS 🌬️

Key Features:
• Generative AI software showcase
• Animated website
• Information about AI technology
• Responsive design`,

    'manache-ganpati.apk': `📱 Manache 5 Ganpati App
🏛📍 Real-time updates for Pune's Manache Ganpati locations

📋 Description:
An Android app providing real-time updates about the Manache Ganpati in Pune, built using Java and Google Maps API. Developed in Android Studio using Java, this app allows users to view live updates on the 5 Manache Ganpati locations in Pune. It features Google Maps integration for real-time navigation, ensuring devotees can easily locate and visit each Ganpati pandal during the festival.

🛠️ Tech Stack:
• Android Studio 🤖
• Java ☕
• Google Maps API 🗺️

✨ Key Features:
• Real-time updates on Ganpati locations
• Google Maps integration
• Live navigation
• Location tracking
• Festival-specific information

📱 Project Type: Mobile Application - Android`,

    'tic-tac-two.apk': `📱 Tic Tac Two
♟📱 Advanced Tic-Tac-Toe with vanishing moves

📋 Description:
An advanced version of Tic-Tac-Toe where your first move vanishes when you make your fourth move. Developed in Android Studio using Java, this game introduces a new level of strategy where only the last three moves of each player remain visible, eliminating the possibility of a tie. The game features smooth animations and an intuitive UI for a competitive experience.

🛠️ Tech Stack:
• Android Studio 🤖
• Java ☕

✨ Key Features:
• Advanced Tic-Tac-Toe gameplay
• Vanishing moves mechanic
• Strategic gameplay
• Smooth animations
• Intuitive UI
• No-tie guarantee

📱 Project Type: Mobile Application - Android Game`,

    'swipeflix.apk': `📱 Swipeflix
🎥🔥 Movie-matching app like Tinder for groups

📋 Description:
A movie-matching app like Tinder, helping groups decide on a movie to watch. Built in Kotlin with Firebase as the backend, this app allows friends to join a session, swipe on movies they like or dislike, and select a final movie based on majority votes. It integrates the TMDB API for fetching real-time movie data and features an engaging swipe-based UI.

🛠️ Tech Stack:
• Android Studio 🤖
• Kotlin 🔷
• Firebase 🔥
• TMDB API 🎬

✨ Key Features:
• Group movie decision making
• Swipe-based UI
• Real-time movie data
• Majority voting system
• Session-based groups
• TMDB API integration

📱 Project Type: Mobile Application - Android`,

    'guess-the-flag.apk': `📱 Guess the Flag
🚩🧠 Educational flag identification game

📋 Description:
A fun quiz game where you identify country flags, featuring a hint system and score tracking. This interactive Kotlin-based quiz game tests users on their knowledge of world flags. Players get four multiple-choice options per question, with a hint system to assist them. The app maintains a scorekeeping system and features a simple, engaging UI for an enjoyable learning experience.

🛠️ Tech Stack:
• Android Studio 🤖
• Kotlin 🔷

✨ Key Features:
• World flag identification
• Multiple choice questions
• Hint system
• Score tracking
• Educational content
• Engaging UI

📱 Project Type: Mobile Application - Android Educational Game`,

    'polo.apk': `📱 Polo
📍 Location-sharing compass app for events

📋 Description:
Polo is a location-sharing compass app designed for festivals, raves, and crowded events. It lets friends link up through username-based connections and track each other's directions in real time using a simple compass interface. Built with React Native, Supabase, and Expo, Polo focuses on instant online-only connectivity. Users can add friends, send mutual tracking requests, and see multiple arrows on their compass pointing toward accepted friends — making it easier to stay together in chaotic environments.

🛠️ Tech Stack:
• React Native ⚛️
• Supabase 🔵
• Expo 📱

✨ Key Features:
• Real-time location sharing
• Compass-based navigation
• Username-based connections
• Mutual tracking requests
• Multiple friend tracking
• Festival/event optimized
• Cross-platform (iOS/Android)

📱 Project Type: Mobile Application - React Native`,
};

// Utility function to find icon for a file (unchanged)
const findFileIcon = (files, fileName, parentKey = '') => {
    for (const item of files) {
        if (item.type === 'folder') {
            const icon = findFileIcon(item.children, fileName, `${parentKey}${item.name}/`);
            if (icon) return icon;
        } else if (item.name === fileName) {
            return item.icon || null;
        }
    }
    return null;
};

const EditorArea = ({ openFiles, activeFile, setActiveFile, files, onCloseFile, temporaryFiles = {}, onFileContentChange, onExecutePython }) => {
    const contentRef = useRef(null);
    const [maxLines, setMaxLines] = useState(1);
    const [isPreview, setIsPreview] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [typingIndex, setTypingIndex] = useState(0);
    const typingSpeed = 18; // ms per character
    const [contactData, setContactData] = useState(null);
    const [contactLoading, setContactLoading] = useState(false);
    const [contactError, setContactError] = useState(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [editableContent, setEditableContent] = useState('');

    const content = activeFile === 'contact.json'
        ? (contactData ? JSON.stringify(contactData, null, 2) : '// Loading contact data...')
        : activeFile.startsWith('untitled-')
            ? (temporaryFiles[activeFile] || '')
            : fileContent[activeFile] || '// File not found';
    const lines = content.split('\n');

    // Handle editable content for temporary files
    useEffect(() => {
        if (activeFile.startsWith('untitled-')) {
            setEditableContent(temporaryFiles[activeFile] || '');
        }
    }, [activeFile, temporaryFiles]);

    // Handle content changes for temporary files
    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setEditableContent(newContent);
        if (onFileContentChange) {
            onFileContentChange(activeFile, newContent);
        }
    };

    // Reset preview state when switching files
    useEffect(() => {
        setIsPreview(false);
        setTypedText('');
        setTypingIndex(0);
    }, [activeFile]);

    // Typewriter effect for preview mode (now only for heading)
    useEffect(() => {
        if (isPreview && activeFile === 'about-me.jsx') {
            setTypedText('');
            setTypingIndex(0);
        }
    }, [isPreview, content, activeFile]);

    useEffect(() => {
        if (isPreview && activeFile === 'about-me.jsx') {
            const aboutLines = content.split('\n');
            const heading = aboutLines[0] || '';
            if (typingIndex < heading.length) {
                const timeout = setTimeout(() => {
                    setTypedText((prev) => prev + heading[typingIndex]);
                    setTypingIndex((prev) => prev + 1);
                }, typingSpeed);
                return () => clearTimeout(timeout);
            }
        } else if (isPreview && typingIndex < content.length) {
            // fallback for other files
            const timeout = setTimeout(() => {
                setTypedText((prev) => prev + content[typingIndex]);
                setTypingIndex((prev) => prev + 1);
            }, typingSpeed);
            return () => clearTimeout(timeout);
        }
    }, [isPreview, typingIndex, content, activeFile]);

    // For about-me.jsx, show body after heading is typed
    const [showBody, setShowBody] = useState(false);
    useEffect(() => {
        if (isPreview && activeFile === 'about-me.jsx') {
            const aboutLines = content.split('\n');
            const heading = aboutLines[0] || '';
            if (typedText.length === heading.length && heading.length > 0) {
                const timeout = setTimeout(() => setShowBody(true), 200); // slight delay
                return () => clearTimeout(timeout);
            } else {
                setShowBody(false);
            }
        }
    }, [typedText, isPreview, content, activeFile]);

    // Calculate the number of lines needed to fill the editor height
    useEffect(() => {
        const updateMaxLines = () => {
            if (contentRef.current) {
                const editorHeight = contentRef.current.clientHeight;
                const lineHeight = 24; // Approximate line height in pixels (adjust based on your font size and line height)
                const calculatedMaxLines = Math.max(lines.length, Math.ceil(editorHeight / lineHeight));
                setMaxLines(calculatedMaxLines);
            }
        };

        updateMaxLines();
        window.addEventListener('resize', updateMaxLines);
        return () => window.removeEventListener('resize', updateMaxLines);
    }, [lines.length]);

    // Debug logs for activeFile, content, and lines
    useEffect(() => {
        console.log('Active File:', activeFile);
        console.log('Content:', content);
        console.log('Lines:', lines);
        console.log('Number of Lines:', lines.length);
        console.log('Max Lines:', maxLines);
    }, [activeFile, content, lines, maxLines]);

    useEffect(() => {
        if (activeFile === 'contact.json') {
            setContactLoading(true);
            fetch('/contact.json')
                .then((res) => res.json())
                .then((data) => {
                    setContactData(data);
                    setContactLoading(false);
                })
                .catch((err) => {
                    setContactError('Failed to load contact info.');
                    setContactLoading(false);
                });
        }
    }, [activeFile]);

    useEffect(() => {
        // Starfield canvas effect
        const canvas = document.getElementById('starfield-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const width = canvas.offsetWidth * dpr;
        const height = canvas.offsetHeight * dpr;
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, width, height);
        // Draw random stars
        const numStars = 120;
        for (let i = 0; i < numStars; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const radius = Math.random() * 1.2 + 0.2;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.7})`;
            ctx.shadowColor = '#fff';
            ctx.shadowBlur = Math.random() * 4;
            ctx.fill();
        }
    }, [isPreview]);

    const handleClose = (file, e) => {
        e.stopPropagation();
        onCloseFile(file);
    };

    // Check if current file is a project file that has a video
    const isProjectFile = (fileName) => {
        const projectFiles = [
            'clash-of-clans.jsx',
            'linkedout.tsx',
            'brainwave.jsx',
            'manache-ganpati.apk',
            'tic-tac-two.apk',
            'swipeflix.apk',
            'guess-the-flag.apk',
            'polo.apk'
        ];
        return projectFiles.includes(fileName);
    };

    // Check if current file is a Python file
    const isPythonFile = (fileName) => {
        return fileName.endsWith('.py') || fileName.startsWith('untitled-');
    };

    const handlePlayButton = () => {
        if (isProjectFile(activeFile)) {
            setIsVideoModalOpen(true);
        } else if (isPythonFile(activeFile)) {
            // Execute Python code
            const pythonCode = activeFile.startsWith('untitled-')
                ? (temporaryFiles[activeFile] || '')
                : content;
            if (onExecutePython) {
                onExecutePython(pythonCode);
            }
        } else {
            setIsPreview(true);
        }
    };

    // Check if current file is a temporary file
    const isTemporaryFile = (fileName) => {
        return fileName.startsWith('untitled-');
    };

    // Tech stack for about-me.jsx preview
    const techStack = [
        { name: 'React', logo: '/logos/react.svg', fallbackIcon: '⚛️' },
        { name: 'Node.js', logo: '/logos/nodejs.svg', fallbackIcon: '🟩' },
        { name: 'Tailwind CSS', logo: '/logos/tailwind.svg', fallbackIcon: '🌬️' },
        { name: 'Three.js', logo: '/logos/threejs.svg', fallbackIcon: '🔺' },
        { name: 'TypeScript', logo: '/logos/typescript.png', fallbackIcon: '📘' },
        { name: 'JavaScript', logo: '/logos/javascript.png', fallbackIcon: '📜' },
        { name: 'HTML', logo: '/logos/html.svg', fallbackIcon: '🌐' },
        { name: 'CSS', logo: '/logos/css.svg', fallbackIcon: '🎨' },
        { name: 'Git', logo: '/logos/git.svg', fallbackIcon: '📝' },
        { name: 'GitHub', logo: '/logos/github.svg', fallbackIcon: '🐙' },
    ];

    // Basic preview rendering for all file types
    const renderPreview = () => {
        if (activeFile === 'about-me.jsx') {
            // Special preview for about-me.jsx
            const aboutLines = content.split('\n');
            return (
                <div className="w-full h-full flex flex-col items-center justify-start md:justify-center animate-fade-in py-6 px-4 md:py-8 md:px-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-white text-center drop-shadow-lg" style={{ fontFamily: 'Yeseva One, serif', letterSpacing: '0.01em', minHeight: '2em' }}>
                        {typedText}
                    </h1>
                    <div className={`flex flex-col gap-4 max-w-2xl w-full md:w-auto transition-opacity duration-700 ${showBody ? 'opacity-100' : 'opacity-0'}`}
                        style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {aboutLines.slice(1).map((line, idx) => (
                            <p key={idx} className="text-sm md:text-base text-white text-center leading-relaxed drop-shadow px-2">
                                {line}
                            </p>
                        ))}
                    </div>
                    {/* Tech stack section */}
                    <div className={`grid grid-cols-3 sm:grid-cols-4 gap-4 mt-8 justify-items-center md:flex md:flex-wrap md:justify-center md:gap-4 md:mt-6 transition-opacity duration-700 ${showBody ? 'opacity-100' : 'opacity-0'}`}
                        style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {techStack.map((tech, idx) => (
                            <div key={idx} className="flex flex-col items-center w-16 md:w-auto">
                                {tech.logo ? (
                                    <img
                                        src={tech.logo}
                                        alt={`${tech.name} logo`}
                                        className="w-8 h-8 md:w-10 md:h-10"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'inline';
                                        }}
                                    />
                                ) : null}
                                <span className={`text-2xl md:text-3xl ${tech.logo ? 'hidden' : 'inline'}`}>
                                    {tech.fallbackIcon || '⚛️'}
                                </span>
                                <span className="text-xs md:text-sm text-[#19f9d8] mt-1">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        if (activeFile === 'resume.md') {
            // Special handling for resume - show PDF
            return (
                <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#19f9d8] mb-4 text-center drop-shadow-lg">
                            📄 Resume
                        </h1>
                        <p className="text-[#e6e6e6] text-lg mb-4">
                            View my professional resume below
                        </p>
                    </div>

                    {/* PDF Viewer */}
                    <div className="w-full max-w-4xl h-full max-h-[70vh] bg-white rounded-lg shadow-2xl overflow-hidden">
                        <iframe
                            src="/resume.pdf"
                            className="w-full h-full border-0"
                            title="Vishesh's Resume"
                            onError={(e) => {
                                console.error('PDF failed to load');
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                        {/* Fallback if PDF doesn't load */}
                        <div className="hidden w-full h-full flex items-center justify-center bg-gray-100 text-gray-600">
                            <div className="text-center">
                                <p className="text-lg mb-2">PDF not found</p>
                                <p className="text-sm">Please ensure resume.pdf is in the public folder</p>
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#19f9d8] underline hover:text-[#64ffda] mt-2 inline-block"
                                >
                                    Open PDF in new tab
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (activeFile.endsWith('.md') || activeFile.endsWith('.txt')) {
            // Render headings, lists, and paragraphs
            const previewLines = typedText.split('\n');
            return (
                <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in">
                    {previewLines.map((line, idx) => {
                        if (/^#\s/.test(line)) {
                            return <h1 key={idx} className="text-3xl md:text-4xl font-bold text-[#19f9d8] mb-4 text-center drop-shadow-lg">{line.replace(/^#\s/, '')}</h1>;
                        } else if (/^##\s/.test(line)) {
                            return <h2 key={idx} className="text-xl md:text-2xl font-semibold text-[#19f9d8] mb-2 text-center drop-shadow">{line.replace(/^##\s/, '')}</h2>;
                        } else if (/^-\s/.test(line)) {
                            return <li key={idx} className="ml-6 list-disc text-[#e6e6e6] text-base md:text-lg">{line.replace(/^-\s/, '')}</li>;
                        } else if (line.trim() === '') {
                            return <div key={idx} className="h-3" />;
                        } else {
                            return <p key={idx} className="text-base md:text-lg text-[#e6e6e6] text-center mb-2 drop-shadow">{line}</p>;
                        }
                    })}
                </div>
            );
        }
        if (activeFile === 'contact.json' && isPreview) {
            return renderContactCard();
        }
        // JSON and JS: show as code block
        if (activeFile.endsWith('.json') || activeFile.endsWith('.js')) {
            return (
                <pre className="p-6 md:p-10 max-w-2xl mx-auto bg-[#23272e] rounded-lg shadow-lg text-[#19f9d8] animate-fade-in whitespace-pre-wrap text-sm md:text-base">
                    {typedText}
                </pre>
            );
        }
        // Default: plain text
        return (
            <div className="p-6 md:p-10 max-w-2xl mx-auto bg-[#23272e] rounded-lg shadow-lg text-[#e6e6e6] animate-fade-in text-sm md:text-base">
                {typedText}
            </div>
        );
    };

    // JSX-aware syntax highlighting for about-me.jsx
    const renderJSXWithSyntax = (line, index) => {
        // Tokenize for JSX/React
        const tokens = line.match(/(import|from|function|return|export|default|const|let|var)\b|AboutMe|<\/?[A-Za-z0-9]+|className|\".*?\"|'.*?'|`.*?`|[{}()[\].,;:<>]|\/\/.*|\/\*[\s\S]*?\*\/|\w+|\s+|[^\w\s]/g) || [''];
        return (
            <span key={index}>
                {tokens.map((token, i) => {
                    if (/^\s+$/.test(token)) {
                        return token;
                    } else if (token === 'import' || token === 'from') {
                        return <span key={i} className="text-[#c586c0]">{token}</span>; // Import/from keywords
                    } else if (token === 'function') {
                        return <span key={i} className="text-[#e5c07b]">{token}</span>; // function keyword yellow
                    } else if (token === 'return') {
                        return <span key={i} className="text-[#d16969]">{token}</span>; // return keyword red
                    } else if (token === 'export') {
                        return <span key={i} className="text-[#569cd6]">{token}</span>; // export blue
                    } else if (token === 'default') {
                        return <span key={i} className="text-[#c586c0]">{token}</span>; // default purple
                    } else if (token === 'const' || token === 'let' || token === 'var') {
                        return <span key={i} className="text-[#d16969]">{token}</span>; // var keywords blue
                    } else if (token === 'AboutMe') {
                        return <span key={i} className="text-[#4ec9b0]">{token}</span>; // Component name
                    } else if (/^<\/?[A-Za-z0-9]+$/.test(token)) {
                        return <span key={i} className="text-[#d16969]">{token}</span>; // JSX tag red
                    } else if (token === 'className') {
                        return <span key={i} className="text-[#9cdcfe]">{token}</span>; // JSX attribute
                    } else if (/^\".*\"$|^'.*'$|^`.*`$/.test(token)) {
                        return <span key={i} className="text-[#ce9178]">{token}</span>; // Strings
                    } else if (token === '{' || token === '}') {
                        return <span key={i} className="text-[#e5c07b]">{token}</span>; // Braces yellow
                    } else if (/[()[\].,;:<>]/.test(token)) {
                        return <span key={i} className="text-[#d4d4d4]">{token}</span>; // Punctuation
                    } else if (/^\/\/.*/.test(token) || /^\/\*[\s\S]*?\*\//.test(token)) {
                        return <span key={i} className="text-[#6a737d] italic">{token}</span>; // Comments
                    } else {
                        return <span key={i} className="text-[#e6e6e6]">{token}</span>; // Default
                    }
                })}
            </span>
        );
    };

    // Syntax highlighting for JS/JSON files
    const renderCodeWithSyntax = (line, index) => {
        if (activeFile === 'about-me.jsx') {
            return renderJSXWithSyntax(line, index);
        }

        // Check if line contains tech stack items (for project files)
        if (isProjectFile(activeFile) && line.includes('•') && (line.includes('React') || line.includes('GSAP') || line.includes('Tailwind') || line.includes('Next.js') || line.includes('Firebase') || line.includes('VAPI') || line.includes('Android') || line.includes('Java') || line.includes('Kotlin') || line.includes('Google Maps') || line.includes('TMDB') || line.includes('Supabase') || line.includes('Expo'))) {
            return renderTechStackWithLogos(line, index);
        }

        if (!activeFile.endsWith('.js') && !activeFile.endsWith('.json')) {
            return <span key={index} className="text-[#e6e6e6]">{line || ' '}</span>;
        }

        // Simple tokenization for JS/JSON
        const tokens = line.match(/\/\/.*|\/\*[\s\S]*?\*\/|".*?"|'.*?'|`.*?`|\b(const|let|var|function|return|import|from|if|else|for|while|true|false|null|undefined)\b|[{}[\]().,;:]|\w+|[^\w\s]/g) || [''];

        return (
            <span key={index}>
                {tokens.map((token, i) => {
                    if (/\/\/.*/.test(token)) {
                        return <span key={i} className="text-[#6a737d] italic">{token}</span>; // Comments
                    } else if (/\/\*[\s\S]*?\*\//.test(token)) {
                        return <span key={i} className="text-[#6a737d] italic">{token}</span>; // Multiline comments
                    } else if (/^".*"$|^'.*'$|^`.*`$/.test(token)) {
                        return <span key={i} className="text-[#ce9178]">{token}</span>; // Strings
                    } else if (/\b(const|let|var|function|return|import|from|if|else|for|while|true|false|null|undefined)\b/.test(token)) {
                        return <span key={i} className="text-[#569cd6]">{token}</span>; // Keywords
                    } else if (/[{}[\]().,;:]/.test(token)) {
                        return <span key={i} className="text-[#d4d4d4]">{token}</span>; // Punctuation
                    } else {
                        return <span key={i} className="text-[#e6e6e6]">{token}</span>; // Default
                    }
                })}
            </span>
        );
    };

    // Render tech stack with logos for project files
    const renderTechStackWithLogos = (line, index) => {
        try {
            // Tech logo mapping
            const techLogos = {
                'React.js': '/logos/react.svg',
                'React Native': '/logos/react.svg',
                'Next.js': '/logos/nextjs.svg',
                'GSAP': '/logos/gsap.svg',
                'Tailwind CSS': '/logos/tailwind.svg',
                'Firebase': '/logos/firebase.svg',
                'VAPI': '/logos/vapi.svg',
                'Android Studio': '/logos/android.svg',
                'Java': '/logos/java.svg',
                'Kotlin': '/logos/kotlin.svg',
                'Google Maps API': '/logos/googlemaps.svg',
                'TMDB API': '/logos/tmdb.svg',
                'Supabase': '/logos/supabase.png',
                'Expo': '/logos/expo.svg'
            };

            // Find which tech is in this line
            let techName = null;
            let logoPath = null;

            for (const [tech, logo] of Object.entries(techLogos)) {
                if (line.includes(tech)) {
                    techName = tech;
                    logoPath = logo;
                    break;
                }
            }

            if (techName && logoPath) {
                // Split the line by the tech name to properly render JSX
                const parts = line.split(techName);

                return (
                    <span key={index} className="text-[#e6e6e6]">
                        {parts[0]}
                        <span className="inline-flex items-center">
                            <img
                                src={logoPath}
                                alt={`${techName} logo`}
                                className="w-4 h-4 mr-1 inline-block"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            {techName}
                        </span>
                        {parts[1]}
                    </span>
                );
            }

            // Fallback to normal text if no tech found
            return <span key={index} className="text-[#e6e6e6]">{line}</span>;
        } catch (error) {
            console.error('Error rendering tech stack logos:', error);
            return <span key={index} className="text-[#e6e6e6]">{line}</span>;
        }
    };

    const renderContactCard = () => {
        if (contactLoading) return <div className="text-center text-[#19f9d8]">Loading contact info...</div>;
        if (contactError) return <div className="text-center text-red-500">{contactError}</div>;
        if (!contactData) return null;

        const contactIcons = {
            LinkedIn: linkedInLogo,
            Email: gmailLogo,
            Instagram: instagramLogo,
            GitHub: githubLogo,
        };

        return (
            <div className="flex flex-col items-center justify-start md:justify-center h-full animate-fade-in py-6 px-4 md:py-0 md:px-0 w-full">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 md:mb-8 text-white text-center drop-shadow-lg" style={{ fontFamily: 'Yeseva One, serif', letterSpacing: '0.01em', minHeight: '2em' }}>
                    Contact Me
                </h2>
                <div className="w-full max-w-2xl pr-2">
                    <ul className="space-y-6">
                        {contactData.contacts.map((c, idx) => (
                            <li key={idx} className="flex items-center gap-4">
                                <img
                                    src={contactIcons[c.type]}
                                    alt={`${c.type} icon`}
                                    className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0"
                                />
                                <span className="font-semibold text-[#e6e6e6] text-base md:text-xl flex-shrink-0">{c.type}:</span>
                                <a
                                    href={c.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#19f9d8] underline hover:text-[#64ffda] transition-colors text-sm md:text-xl break-all"
                                >
                                    {c.value}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col flex-1 bg-[#292a2b] text-gray-200 relative min-h-0" ref={contentRef}>
            {/* Tabs: Scrollable on mobile */}
            <div className="flex items-center h-8 bg-[#222223] px-2 sticky top-0 z-10">
                {/* Tabs: Scrollable on mobile */}
                <div className="flex overflow-x-auto hide-scrollbar flex-1 mr-2 max-w-full sm:max-w-[calc(100%-200px)]">
                    {openFiles.map((file) => {
                        const icon = findFileIcon(files, file);
                        return (
                            <div
                                key={file}
                                className={`flex items-center px-2 md:px-4 py-1 text-xs md:text-sm cursor-pointer flex-shrink-0 ${file === activeFile
                                    ? 'bg-[rgba(103,107,121,0.2)] text-[#19f9d8] border-b-2 border-[#19f9d8]'
                                    : 'bg-[#222223] text-[#e6e6e6]'
                                    } transition-all duration-300`}
                                onClick={() => setActiveFile(file)}
                            >
                                {icon && (
                                    <img
                                        src={icon}
                                        alt={`${file} icon`}
                                        className="inline-block w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 align-middle"
                                    />
                                )}
                                {file}
                                <TransparentButton
                                    className="ml-1 md:ml-2 text-[#e6e6e6] hover:text-white text-xs w-4 h-4 flex items-center justify-center"
                                    onClick={(e) => handleClose(file, e)}
                                    title={`Close ${file}`}
                                >
                                    ×
                                </TransparentButton>
                            </div>
                        );
                    })}
                </div>

                {/* Fixed Action Buttons - Always visible */}
                <div className="flex items-center gap-1 flex-shrink-0 absolute right-2">
                    {activeFile === 'resume.md' ? (
                        <a
                            href="/resume.pdf"
                            download="Vishesh_Resume.pdf"
                            className="px-3 py-1 hover:bg-[rgba(103,107,121,0.4)] rounded text-[#19f9d8] flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                            title="Download Resume"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 mr-1"
                            >
                                <path d="M8 1v8.5L4.5 6 3 7.5 8 12.5 13 7.5 11.5 6 8 9.5V1H8z" />
                                <path d="M2 13h12v1H2v-1z" />
                            </svg>
                            Download
                        </a>
                    ) : !isPreview ? (
                        <>
                            <TransparentButton
                                aria-label={isPythonFile(activeFile) ? "Run Python" : "Play"}
                                className="px-2 py-1 hover:bg-[rgba(103,107,121,0.4)] rounded text-[#19f9d8] flex items-center justify-center flex-shrink-0"
                                onClick={handlePlayButton}
                                title={isPythonFile(activeFile) ? "Run Python Code" : "Preview"}
                                data-tour="play-button"
                            >
                                <img src={runCode} alt="run code" className="w-4 h-4" />
                            </TransparentButton>
                            <TransparentButton
                                aria-label="Split screen"
                                className="px-2 py-1 hover:bg-[rgba(103,107,121,0.4)] rounded text-[#19f9d8] flex items-center justify-center flex-shrink-0"
                                title="Split Screen"
                            >
                                <img src={splitScreen} alt="split screen" className="w-4 h-4" />
                            </TransparentButton>
                            <TransparentButton
                                aria-label="Search"
                                className="px-2 py-1 hover:bg-[rgba(103,107,121,0.4)] rounded text-[#19f9d8] flex items-center justify-center flex-shrink-0"
                                title="Search"
                            >
                                <img src={searchIcon} alt="search" className="w-4 h-4" />
                            </TransparentButton>
                            <TransparentButton
                                aria-label="Print"
                                className="px-2 py-1 hover:bg-[rgba(103,107,121,0.4)] rounded text-[#19f9d8] flex items-center justify-center flex-shrink-0"
                                title="Print"
                            >
                                <img src={printIcon} alt="print" className="w-4 h-4" />
                            </TransparentButton>
                        </>
                    ) : (
                        <TransparentButton
                            aria-label="Back to Code"
                            className="px-2 py-1 hover:bg-[rgba(103,107,121,0.4)] rounded text-[#19f9d8] flex items-center justify-center flex-shrink-0"
                            onClick={() => setIsPreview(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4"
                            >
                                <path d="M11.5 3.5l-6 4.5 6 4.5v-9z" />
                            </svg>
                        </TransparentButton>
                    )}
                </div>
            </div>

            {/* Editor Content or Preview */}
            {activeFile === 'resume.md' ? (
                // Always show PDF for resume - clean and simple
                <div className="flex-1 bg-white">
                    <iframe
                        src="/resume.pdf"
                        className="w-full h-full border-0"
                        title="Vishesh's Resume"
                        onError={(e) => {
                            console.error('PDF failed to load');
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    {/* Fallback if PDF doesn't load */}
                    <div className="hidden w-full h-full flex items-center justify-center bg-gray-100 text-gray-600">
                        <div className="text-center">
                            <p className="text-lg mb-2">PDF not found</p>
                            <p className="text-sm">Please ensure resume.pdf is in the public folder</p>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#19f9d8] underline hover:text-[#64ffda] mt-2 inline-block"
                            >
                                Open PDF in new tab
                            </a>
                        </div>
                    </div>
                </div>
            ) : !isPreview ? (
                <div className="flex flex-1 overflow-auto text-xs md:text-sm font-mono min-h-0 editor-content">
                    {/* Line Numbers */}
                    <div className="text-[#19f9d8]/50 py-2 text-right select-none w-8 flex-shrink-0">
                        {Array.from({ length: maxLines }, (_, index) => (
                            <div key={index} className="leading-relaxed">
                                {index + 1}
                            </div>
                        ))}
                    </div>
                    {/* File Content with Syntax Highlighting or Editable Textarea */}
                    <div className="px-2 md:px-4 py-2 whitespace-pre-wrap break-words flex-1 bg-[#292a2b] min-w-0">
                        {isTemporaryFile(activeFile) ? (
                            // Editable textarea for temporary files
                            <textarea
                                value={editableContent}
                                onChange={handleContentChange}
                                className="w-full h-full bg-transparent text-[#e6e6e6] outline-none resize-none font-mono text-xs md:text-sm leading-relaxed"
                                placeholder={activeFile.endsWith('.py') ? "# Hello World!\nprint('Hello, World!')\n\n# Try some math\nx = 5\ny = 3\nprint(f'{x} + {y} = {x + y}')" : "Start typing your new file content here..."}
                                autoFocus
                            />
                        ) : activeFile === 'about-me.jsx' ? (
                            <>
                                <div className="leading-relaxed text-[#6a737d] italic">{renderJSXWithSyntax('//about-me.jsx', -100)}</div>
                                <div className="leading-relaxed">&nbsp;</div>
                                <div className="leading-relaxed">&nbsp;</div>
                                <div className="leading-relaxed">{renderJSXWithSyntax('import React from "react";', -1)}</div>
                                <div className="leading-relaxed">&nbsp;</div>
                                <div className="leading-relaxed">{renderJSXWithSyntax('', -2)}</div>
                                <div className="leading-relaxed">{renderJSXWithSyntax('function AboutMe() {', -3)}</div>
                                <div className="leading-relaxed">{renderJSXWithSyntax('  return (', -4)}</div>
                                <div className="leading-relaxed">{renderJSXWithSyntax('    <div className="about-me">', -5)}</div>
                                {/* About Me Content as JSX */}
                                {(() => {
                                    const aboutLines = lines;
                                    return [
                                        aboutLines[0] && (
                                            <div key={0} className="leading-relaxed">{renderCodeWithSyntax(`      <h1>${aboutLines[0]}</h1>`, 0)}</div>
                                        ),
                                        ...aboutLines.slice(1).map((line, idx) => (
                                            <div key={idx + 1} className="leading-relaxed">{renderCodeWithSyntax(`      <p>${line}</p>`, idx + 1)}</div>
                                        ))
                                    ];
                                })()}
                                <div className="leading-relaxed">{renderJSXWithSyntax('    </div>', -6)}</div>
                                <div className="leading-relaxed">{renderJSXWithSyntax('  );', -7)}</div>
                                <div className="leading-relaxed">{renderJSXWithSyntax('}', -8)}</div>
                                <div className="leading-relaxed">{renderJSXWithSyntax('', -9)}</div>
                                <div className="leading-relaxed">{renderJSXWithSyntax('export default AboutMe;', -10)}</div>
                            </>
                        ) : (
                            <>
                                {/* Main file content */}
                                {lines.length > 0 ? (
                                    lines.map((line, index) => (
                                        <div key={index} className="leading-relaxed">
                                            {renderCodeWithSyntax(line, index)}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-500">No content available</div>
                                )}
                            </>
                        )}
                        {/* Add empty lines to match maxLines */}
                        {lines.length < maxLines &&
                            Array.from({ length: maxLines - lines.length }, (_, index) => (
                                <div key={`empty-${index}`} className="leading-relaxed">
                                    {' '}
                                </div>
                            ))}
                    </div>
                </div>
            ) : (
                <div className="flex-1 relative min-h-0">
                    {/* Space-themed background with starfield overlay */}
                    <div className="w-full min-h-[60vh] md:min-h-0 md:absolute md:inset-0 flex items-start md:items-center justify-center overflow-visible md:overflow-hidden" style={{
                        background: 'linear-gradient(135deg, #05010a 0%, #0a1833 70%, #10131a 100%)'
                    }}>
                        {/* Starfield overlay */}
                        <div className="relative w-full">
                            <canvas
                                id="starfield-canvas"
                                className="pointer-events-none absolute inset-0 z-0"
                                style={{ width: '100%', height: '100%', display: 'block' }}
                            />
                            <div className="relative z-10 w-full flex items-start md:items-center justify-center p-3 sm:p-4 md:p-8">
                                {renderPreview()}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Video Modal */}
            <VideoModal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                projectName={activeFile}
            />
        </div>
    );
};

export default EditorArea;