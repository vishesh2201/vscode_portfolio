import React, { useState, useRef, useEffect } from 'react';

const VideoModal = ({ isOpen, onClose, projectName, videoSrc }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Video mapping for project files to video files
    const videoMapping = {
        'clash-of-clans.jsx': '/clashofclans.webm',
        'linkedout.tsx': '/linkedout.webm',
        'brainwave.jsx': '/brainwave.webm',
        'manache-ganpati.apk': '/manache_demo.webm',
        'tic-tac-two.apk': '/ttt_demo.webm',
        'swipeflix.apk': '/swipeflix_demo.webm',
        'guess-the-flag.apk': '/guesstheflag_demo.webm',
        'polo.apk': '/polo.webm'
    };

    const videoFile = videoMapping[projectName] || videoSrc;

    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.load();
        }
    }, [isOpen, videoFile]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const newTime = percentage * duration;

        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const getProjectInfo = (projectName) => {
        // Logo mapping for tech stack with fallback icons
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
            'Expo': '/logos/expo.svg',
            'TypeScript': '/logos/typescript.png',
            'JavaScript': '/logos/javascript.png',
            'HTML': '/logos/html.svg',
            'CSS': '/logos/css.svg',
            'Git': '/logos/git.svg',
            'GitHub': '/logos/github.svg',
            'Three.js': '/logos/threejs.svg',
            'Framer': '/logos/framer.svg',
            'Figma': '/logos/figma.svg',
            'Notion': '/logos/notion.svg'
        };

        // Fallback icons for missing logos
        const fallbackIcons = {
            'React.js': '⚛️',
            'React Native': '⚛️',
            'Next.js': '⚡',
            'GSAP': '🎨',
            'Tailwind CSS': '🌬️',
            'Firebase': '🔥',
            'VAPI': '🎤',
            'Android Studio': '🤖',
            'Java': '☕',
            'Kotlin': '🔷',
            'Google Maps API': '🗺️',
            'TMDB API': '🎬',
            'Supabase': '🔵',
            'Expo': '📱',
            'TypeScript': '📘',
            'JavaScript': '📜',
            'HTML': '🌐',
            'CSS': '🎨',
            'Git': '📝',
            'GitHub': '🐙',
            'Three.js': '🔺',
            'Framer': '🎭',
            'Figma': '🎨',
            'Notion': '📝'
        };

        // Project logo mapping
        const projectLogos = {
            'clash-of-clans.jsx': '/logos/clashofclanslogo.webp',
            'linkedout.tsx': '/logos/linkedoutlogo.png',
            'brainwave.jsx': '/logos/brainwavelogo.png',
            'manache-ganpati.apk': '/logos/manache.svg',
            'tic-tac-two.apk': '/logos/tictactwo.png',
            'swipeflix.apk': '/logos/swipeflix.svg',
            'guess-the-flag.apk': '/logos/guesstheflag.jpg',
            'polo.apk': '/logos/polologo.png'
        };

        const projectInfo = {
            'clash-of-clans.jsx': {
                title: 'Clash of Clans Landing Page',
                description: 'A React and GSAP-powered landing page with advanced animations',
                tech: ['React.js', 'GSAP', 'Tailwind CSS'],
                type: 'Web Application',
                logo: projectLogos['clash-of-clans.jsx']
            },
            'linkedout.tsx': {
                title: 'linkedOut',
                description: 'A full-stack web application for technical interview preparation',
                tech: ['Next.js', 'Firebase', 'React.js', 'VAPI'],
                type: 'Web Application',
                logo: projectLogos['linkedout.tsx']
            },
            'brainwave.jsx': {
                title: 'Brainwave',
                description: 'A React and Tailwind CSS website showcasing Generative AI software',
                tech: ['React.js', 'Tailwind CSS'],
                type: 'Web Application',
                logo: projectLogos['brainwave.jsx']
            },
            'manache-ganpati.apk': {
                title: 'Manache 5 Ganpati App',
                description: 'Real-time updates for Pune\'s Manache Ganpati locations',
                tech: ['Android Studio', 'Java', 'Google Maps API'],
                type: 'Mobile Application',
                logo: projectLogos['manache-ganpati.apk']
            },
            'tic-tac-two.apk': {
                title: 'Tic Tac Two',
                description: 'Advanced Tic-Tac-Toe with vanishing moves mechanic',
                tech: ['Android Studio', 'Java'],
                type: 'Mobile Game',
                logo: projectLogos['tic-tac-two.apk']
            },
            'swipeflix.apk': {
                title: 'Swipeflix',
                description: 'Movie-matching app like Tinder for groups',
                tech: ['Android Studio', 'Kotlin', 'Firebase', 'TMDB API'],
                type: 'Mobile Application',
                logo: projectLogos['swipeflix.apk']
            },
            'guess-the-flag.apk': {
                title: 'Guess the Flag',
                description: 'Educational flag identification game',
                tech: ['Android Studio', 'Kotlin'],
                type: 'Educational Game',
                logo: projectLogos['guess-the-flag.apk']
            },
            'polo.apk': {
                title: 'Polo',
                description: 'Location-sharing compass app for events',
                tech: ['React Native', 'Supabase', 'Expo'],
                type: 'Mobile Application',
                logo: projectLogos['polo.apk']
            }
        };

        const info = projectInfo[projectName] || {
            title: projectName,
            description: 'Project demonstration',
            tech: [],
            type: 'Application',
            logo: null
        };

        // Add tech logos to the info
        info.techLogos = info.tech.map(tech => ({
            name: tech,
            logo: techLogos[tech] || null,
            fallbackIcon: fallbackIcons[tech] || '⚙️'
        }));

        return info;
    };

    const projectInfo = getProjectInfo(projectName);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-6xl mx-4 bg-[#1a1a1a] rounded-lg shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-[#2a2a2a] border-b border-[#3a3a3a]">
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center space-x-3">
                        {projectInfo.logo && (
                            <img
                                src={projectInfo.logo}
                                alt={`${projectInfo.title} logo`}
                                className="w-8 h-8 rounded-lg"
                            />
                        )}
                        <h2 className="text-lg font-semibold text-white">{projectInfo.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row">
                    {/* Video Section */}
                    <div className="flex-1 p-6">
                        <div className="relative bg-black rounded-lg overflow-hidden">
                            <video
                                ref={videoRef}
                                className="w-full h-auto max-h-[60vh]"
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onEnded={() => setIsPlaying(false)}
                            >
                                <source src={videoFile} type="video/webm" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Video Controls */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={handlePlayPause}
                                        className="text-white hover:text-[#19f9d8] transition-colors"
                                    >
                                        {isPlaying ? (
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        )}
                                    </button>

                                    <div className="flex-1">
                                        <div
                                            className="w-full h-2 bg-gray-600 rounded-full cursor-pointer"
                                            onClick={handleSeek}
                                        >
                                            <div
                                                className="h-full bg-[#19f9d8] rounded-full transition-all"
                                                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="text-white text-sm">
                                        {formatTime(currentTime)} / {formatTime(duration)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Info Section */}
                    <div className="w-full lg:w-80 p-6 bg-[#2a2a2a] border-l border-[#3a3a3a]">
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    {projectInfo.logo && (
                                        <img
                                            src={projectInfo.logo}
                                            alt={`${projectInfo.title} logo`}
                                            className="w-12 h-12 rounded-lg"
                                        />
                                    )}
                                    <h3 className="text-2xl font-bold text-[#19f9d8]">
                                        {projectInfo.title}
                                    </h3>
                                </div>
                                <span className="inline-block px-3 py-1 bg-[#19f9d8]/20 text-[#19f9d8] text-sm rounded-full">
                                    {projectInfo.type}
                                </span>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {projectInfo.description}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {projectInfo.techLogos.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-2 px-3 py-2 bg-[#3a3a3a] text-gray-300 text-xs rounded-full"
                                        >
                                            {tech.logo ? (
                                                <img
                                                    src={tech.logo}
                                                    alt={`${tech.name} logo`}
                                                    className="w-4 h-4"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'inline';
                                                    }}
                                                />
                                            ) : null}
                                            <span className={tech.logo ? 'hidden' : 'inline'}>{tech.fallbackIcon}</span>
                                            <span>{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#3a3a3a]">
                                <p className="text-gray-400 text-xs">
                                    Click and drag on the progress bar to seek through the video
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoModal; 