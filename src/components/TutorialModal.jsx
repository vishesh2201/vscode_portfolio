import React, { useState } from 'react';

const tutorialSteps = [
    {
        title: 'Welcome to the Portfolio Editor!',
        content: 'This is an interactive portfolio. Here are some tips to get started.'
    },
    {
        title: 'Run Code or Preview',
        content: 'Click the play ▶️ button in the top bar to run code or preview files.'
    },
    {
        title: 'Create a New File',
        content: 'Click on File → New File to create a new file and try writing some code.'
    },
    {
        title: 'Open the Terminal',
        content: 'Click on the Terminal button to open a new terminal and see output.'
    },
    {
        title: 'Explore the Sidebar',
        content: 'Browse files and projects using the sidebar on the left.'
    }
];

const TutorialModal = ({ isOpen, onClose, onDontShowAgain }) => {
    const [step, setStep] = useState(0);
    const [dontShow, setDontShow] = useState(false);

    if (!isOpen) return null;

    const handleNext = () => {
        if (step < tutorialSteps.length - 1) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-[#23272e] rounded-lg shadow-2xl p-8 max-w-md w-full text-center relative animate-fade-in">
                <h2 className="text-2xl font-bold text-[#19f9d8] mb-4">{tutorialSteps[step].title}</h2>
                <p className="text-[#e6e6e6] mb-6">{tutorialSteps[step].content}</p>
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="px-4 py-2 bg-[#222223] text-[#19f9d8] rounded hover:bg-[#19f9d8] hover:text-[#23272e] transition"
                        onClick={handlePrev}
                        disabled={step === 0}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-2 bg-[#19f9d8] text-[#23272e] rounded hover:bg-[#222223] hover:text-[#19f9d8] transition"
                        onClick={handleNext}
                    >
                        {step === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                    {tutorialSteps.map((_, idx) => (
                        <span
                            key={idx}
                            className={`w-2 h-2 rounded-full ${idx === step ? 'bg-[#19f9d8]' : 'bg-[#676b79]'}`}
                        />
                    ))}
                </div>
                <label className="flex items-center justify-center gap-2 text-xs text-[#e6e6e6] cursor-pointer">
                    <input
                        type="checkbox"
                        checked={dontShow}
                        onChange={() => setDontShow(!dontShow)}
                        className="accent-[#19f9d8]"
                    />
                    Don't show this tutorial again
                </label>
                <button
                    className="absolute top-2 right-4 text-[#e6e6e6] hover:text-[#19f9d8] text-xl"
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

export default TutorialModal;