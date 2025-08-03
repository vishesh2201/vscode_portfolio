import React, { useState, useRef, useEffect } from 'react';
import TransparentButton from './TransparentButton';

function Terminal({ isOpen, onClose, activeFile }) {
    const [terminalHistory, setTerminalHistory] = useState([
        { type: 'output', content: 'Microsoft Windows [Version 10.0.19045.3693]' },
        { type: 'output', content: '(c) Microsoft Corporation. All rights reserved.' },
        { type: 'output', content: '' },
        { type: 'output', content: 'C:\\Users\\Vishesh\\Documents\\Awesome_Projects\\vishesh_portfolio>' }
    ]);
    const [currentInput, setCurrentInput] = useState('');
    const [inputHistory, setInputHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const terminalRef = useRef(null);

    // Auto-scroll to bottom when new content is added
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [terminalHistory]);

    // Focus input when terminal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Handle Python execution from outside
    useEffect(() => {
        window.executePythonInTerminal = (pythonOutput) => {
            if (pythonOutput && pythonOutput.length > 0) {
                setTerminalHistory(prev => [
                    ...prev,
                    { type: 'output', content: 'python ' + (activeFile || 'untitled.py') },
                    { type: 'output', content: '' },
                    ...pythonOutput.map(line => ({ type: 'output', content: line })),
                    { type: 'output', content: '' },
                    { type: 'output', content: 'C:\\Users\\Vishesh\\Documents\\Awesome_Projects\\vishesh_portfolio>' }
                ]);
            }
        };

        return () => {
            delete window.executePythonInTerminal;
        };
    }, [activeFile]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            executeCommand(currentInput);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateHistory('up');
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateHistory('down');
        }
    };

    const navigateHistory = (direction) => {
        if (direction === 'up' && historyIndex < inputHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCurrentInput(inputHistory[inputHistory.length - 1 - newIndex]);
        } else if (direction === 'down' && historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentInput(inputHistory[inputHistory.length - 1 - newIndex]);
        } else if (direction === 'down' && historyIndex === 0) {
            setHistoryIndex(-1);
            setCurrentInput('');
        }
    };

    const executeCommand = (command) => {
        if (!command.trim()) {
            addToHistory('');
            setCurrentInput('');
            return;
        }

        // Add command to history
        addToHistory(command);
        setCurrentInput('');

        // Simulate command execution
        const output = getCommandOutput(command);
        setTerminalHistory(prev => [
            ...prev,
            { type: 'input', content: command },
            ...output.map(line => ({ type: 'output', content: line }))
        ]);
    };

    const addToHistory = (command) => {
        if (command.trim()) {
            setInputHistory(prev => [...prev, command]);
        }
        setHistoryIndex(-1);
    };

    const getCommandOutput = (command) => {
        const cmd = command.toLowerCase().trim();

        switch (cmd) {
            case 'help':
                return [
                    'Available commands:',
                    '  help          - Show this help message',
                    '  clear         - Clear the terminal',
                    '  ls            - List files and directories',
                    '  pwd           - Show current directory',
                    '  whoami        - Show current user',
                    '  date          - Show current date and time',
                    '  echo [text]   - Echo text to terminal',
                    '  cat [file]    - Display file contents',
                    '  cd [dir]      - Change directory',
                    '  mkdir [dir]   - Create directory',
                    '  rm [file]     - Remove file',
                    '  exit          - Close terminal',
                    ''
                ];

            case 'clear':
                setTerminalHistory([
                    { type: 'output', content: 'Microsoft Windows [Version 10.0.19045.3693]' },
                    { type: 'output', content: '(c) Microsoft Corporation. All rights reserved.' },
                    { type: 'output', content: '' },
                    { type: 'output', content: 'C:\\Users\\Vishesh\\Documents\\Awesome_Projects\\vishesh_portfolio>' }
                ]);
                return [];

            case 'ls':
            case 'dir':
                return [
                    ' Directory of C:\\Users\\Vishesh\\Documents\\Awesome_Projects\\vishesh_portfolio',
                    '',
                    '2024-01-15  14:30    <DIR>          .',
                    '2024-01-15  14:30    <DIR>          ..',
                    '2024-01-15  14:30    <DIR>          vishesh-portfolio',
                    '2024-01-15  14:30             1,234  README.md',
                    '2024-01-15  14:30            45,678  package.json',
                    '2024-01-15  14:30    <DIR>          node_modules',
                    '2024-01-15  14:30    <DIR>          src',
                    '2024-01-15  14:30    <DIR>          public',
                    '               5 File(s)         46,912 bytes',
                    '               5 Dir(s)  123,456,789 bytes free',
                    ''
                ];

            case 'pwd':
                return ['C:\\Users\\Vishesh\\Documents\\Awesome_Projects\\vishesh_portfolio', ''];

            case 'whoami':
                return ['Vishesh', ''];

            case 'date':
                return [new Date().toString(), ''];

            case 'exit':
                onClose();
                return [];

            default:
                if (cmd.startsWith('echo ')) {
                    return [cmd.substring(5), ''];
                } else if (cmd.startsWith('cat ') || cmd.startsWith('type ')) {
                    return [
                        `'${cmd.substring(4)}' is not recognized as an internal or external command,`,
                        'operable program or batch file.',
                        ''
                    ];
                } else if (cmd.startsWith('cd ')) {
                    return [
                        `'${cmd}' is not recognized as an internal or external command,`,
                        'operable program or batch file.',
                        ''
                    ];
                } else if (cmd.startsWith('mkdir ')) {
                    return [
                        `'${cmd}' is not recognized as an internal or external command,`,
                        'operable program or batch file.',
                        ''
                    ];
                } else if (cmd.startsWith('rm ')) {
                    return [
                        `'${cmd}' is not recognized as an internal or external command,`,
                        'operable program or batch file.',
                        ''
                    ];
                } else {
                    return [
                        `'${command}' is not recognized as an internal or external command,`,
                        'operable program or batch file.',
                        ''
                    ];
                }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#292a2b] border-t border-white border-opacity-20 z-50 h-64">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-3 py-1 bg-[#2d2d30] border-b border-[#373b41]">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-2 text-[#e6e6e6] text-xs font-medium">Terminal</span>
                </div>
                <TransparentButton
                    onClick={onClose}
                    className="text-[#e6e6e6] hover:text-white text-sm"
                    title="Close Terminal"
                >
                    ×
                </TransparentButton>
            </div>

            {/* Terminal Content */}
            <div
                ref={terminalRef}
                className="flex-1 p-3 font-mono text-xs text-[#e6e6e6] overflow-y-auto bg-[#292a2b] h-56"
                style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
            >
                {terminalHistory.map((item, index) => (
                    <div key={index} className={`${item.type === 'input' ? 'text-[#19f9d8]' : 'text-[#e6e6e6]'}`}>
                        {item.content}
                    </div>
                ))}

                {/* Current Input Line */}
                <div className="flex items-center">
                    <span className="text-[#19f9d8]">C:\\Users\\Vishesh\\Documents\\Awesome_Projects\\vishesh_portfolio&gt;</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 ml-2 bg-transparent outline-none text-[#e6e6e6] caret-[#19f9d8]"
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
}

export default Terminal; 