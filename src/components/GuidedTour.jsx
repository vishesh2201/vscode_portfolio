import React, { useEffect, useRef, useState } from 'react';

const steps = [
    {
        selector: '[data-tour="play-button"]',
        title: 'Run Code or Preview',
        content: 'Click the play ▶️ button to run code or preview files.'
    },
    {
        selector: '[data-tour="file-button"]',
        title: 'Create a New File',
        content: 'Click on File → New File to create a new file and try writing some code.'
    },
    {
        selector: '[data-tour="terminal-button"]',
        title: 'Open the Terminal',
        content: 'Click on the Terminal button to open a new terminal and see output.'
    },
    {
        selector: '[data-tour="sidebar"]',
        title: 'Explore the Sidebar',
        content: 'Browse files and projects using the sidebar on the left.'
    }
];

const GuidedTour = ({ isOpen, onClose, onDontShowAgain }) => {
    const [step, setStep] = useState(0);
    const [dontShow, setDontShow] = useState(false);
    const [modalStyle, setModalStyle] = useState({});
    const modalRef = useRef();

    useEffect(() => {
        if (!isOpen) return;
        const target = document.querySelector(steps[step].selector);
        if (target && modalRef.current) {
            const rect = target.getBoundingClientRect();
            // Position modal to the right and slightly below the target
            setModalStyle({
                position: 'fixed',
                top: `${rect.bottom + 8}px`,
                left: `${rect.left + rect.width / 2}px`,
                zIndex: 10000
            });
            // Optionally, scroll into view
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [step, isOpen]);

    if (!isOpen) return null;

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            if (dontShow && onDontShowAgain) onDontShowAgain();
            onClose();
        }
    };

    const handlePrev = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <div>
            {/* Overlay for click-outside to close, but not blocking UI */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }} />
            <div
                ref={modalRef}
                style={modalStyle}
                className="bg-[#23272e] rounded-lg shadow-2xl p-4 max-w-xs w-full text-left border border-[#19f9d8] animate-fade-in"
            >
                <h2 className="text-lg font-bold text-[#19f9d8] mb-2">{steps[step].title}</h2>
                <p className="text-[#e6e6e6] mb-4 text-sm">{steps[step].content}</p>
                <div className="flex justify-between items-center mb-2">
                    <button
                        className="px-2 py-1 bg-[#222223] text-[#19f9d8] rounded hover:bg-[#19f9d8] hover:text-[#23272e] text-xs"
                        onClick={handlePrev}
                        disabled={step === 0}
                    >
                        Previous
                    </button>
                    <button
                        className="px-2 py-1 bg-[#19f9d8] text-[#23272e] rounded hover:bg-[#222223] hover:text-[#19f9d8] text-xs"
                        onClick={handleNext}
                    >
                        {step === steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
                <label className="flex items-center gap-2 text-xs text-[#e6e6e6] cursor-pointer mb-1">
                    <input
                        type="checkbox"
                        checked={dontShow}
                        onChange={() => setDontShow(!dontShow)}
                        className="accent-[#19f9d8]"
                    />
                    Don't show this again
                </label>
                <button
                    className="absolute top-1 right-2 text-[#e6e6e6] hover:text-[#19f9d8] text-lg"
                    onClick={() => {
                        if (dontShow && onDontShowAgain) onDontShowAgain();
                        onClose();
                    }}
                    aria-label="Close tutorial"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default GuidedTour;