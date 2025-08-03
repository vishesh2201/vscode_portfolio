import React, { useState } from "react";
import Sidebar from './components/Sidebar';
import StatusBar from './components/StatusBar';
import EditorArea from './components/EditorArea';
import { files } from './data/files';
import TopMenuBar from "./components/topMenuBar";
import Terminal from './components/Terminal';

function App() {
  const [activeFile, setActiveFile] = useState('about-me.jsx');
  const [openFiles, setOpenFiles] = useState([
    'about-me.jsx',
    'contact.json',
    'projects.js',
    'resume.md'
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle on mobile
  const [temporaryFiles, setTemporaryFiles] = useState({}); // Store temporary file content
  const [tempFileCounter, setTempFileCounter] = useState(1); // Counter for unique temp file names
  const [isTerminalOpen, setIsTerminalOpen] = useState(false); // State for terminal

  const handleCloseFile = (file) => {
    setOpenFiles((prev) => {
      const newOpenFiles = prev.filter((f) => f !== file);
      if (file === activeFile) {
        setActiveFile(newOpenFiles[0] || null);
      }
      return newOpenFiles;
    });

    // Remove temporary file content if it's a temp file
    if (file.startsWith('untitled-')) {
      setTemporaryFiles((prev) => {
        const newTempFiles = { ...prev };
        delete newTempFiles[file];
        return newTempFiles;
      });
    }
  };

  const handleSelectFile = (file) => {
    setActiveFile(file);
    setOpenFiles((prev) => {
      if (!prev.includes(file)) {
        return [...prev, file];
      }
      return prev;
    });
    // Close sidebar on file selection in mobile view
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleNewFile = () => {
    // Check if there's already a temporary file
    const existingTempFile = Object.keys(temporaryFiles)[0];
    if (existingTempFile) {
      // If a temp file already exists, just make it active
      setActiveFile(existingTempFile);
      setOpenFiles((prev) => {
        if (!prev.includes(existingTempFile)) {
          return [...prev, existingTempFile];
        }
        return prev;
      });
      return;
    }

    // Create new temporary file
    const newFileName = `untitled-${tempFileCounter}.py`;
    setTempFileCounter(prev => prev + 1);

    // Add to open files
    setOpenFiles(prev => [...prev, newFileName]);
    setActiveFile(newFileName);

    // Initialize empty content for the new file
    setTemporaryFiles(prev => ({
      ...prev,
      [newFileName]: ''
    }));
  };

  const handleFileContentChange = (fileName, content) => {
    if (fileName.startsWith('untitled-')) {
      setTemporaryFiles(prev => ({
        ...prev,
        [fileName]: content
      }));
    }
  };

  const handleTerminalClick = () => {
    setIsTerminalOpen(true);
  };

  // Python code execution function
  const executePythonCode = (code) => {
    // Open terminal if not already open
    if (!isTerminalOpen) {
      setIsTerminalOpen(true);
    }

    // Simple Python code execution simulation
    const pythonOutput = simulatePythonExecution(code);

    // Pass the output to the terminal component
    if (window.executePythonInTerminal) {
      window.executePythonInTerminal(pythonOutput);
    }
  };

  // Safe mathematical expression evaluator
  const safeEvaluate = (expr) => {
    // Only allow basic mathematical operations
    const allowedChars = /^[0-9+\-*/().\s]+$/;
    if (!allowedChars.test(expr)) {
      return expr; // Return as-is if contains disallowed characters
    }

    try {
      // Simple evaluation for basic math
      const result = Function('"use strict"; return (' + expr + ')')();
      return result.toString();
    } catch (error) {
      return expr; // Return as-is if evaluation fails
    }
  };

  // Simulate Python code execution
  const simulatePythonExecution = (code) => {
    const lines = code.split('\n');
    const output = [];
    const variables = {};

    try {
      // Simple Python interpreter simulation
      for (let line of lines) {
        line = line.trim();

        // Skip comments and empty lines
        if (line.startsWith('#') || line === '') continue;

        // Handle print statements
        if (line.startsWith('print(') && line.endsWith(')')) {
          const content = line.slice(6, -1); // Remove print( and )
          if (content.startsWith("'") && content.endsWith("'")) {
            output.push(content.slice(1, -1)); // Remove quotes
          } else if (content.startsWith('"') && content.endsWith('"')) {
            output.push(content.slice(1, -1)); // Remove quotes
          } else if (content.includes('f"') || content.includes("f'")) {
            // Handle f-strings
            const fStringContent = content.replace(/f['"]/, '').replace(/['"]$/, '');
            output.push(evaluateFString(fStringContent, variables));
          } else {
            // Handle variables in print
            if (variables[content]) {
              output.push(variables[content]);
            } else {
              output.push(content);
            }
          }
        }

        // Handle variable assignments
        else if (line.includes('=') && !line.includes('==')) {
          const [varName, value] = line.split('=').map(s => s.trim());
          if (value.includes('+') || value.includes('-') || value.includes('*') || value.includes('/')) {
            // Mathematical expression
            const result = safeEvaluate(value);
            variables[varName] = result;
            output.push(`Variable ${varName} assigned: ${result}`);
          } else {
            // Simple assignment
            variables[varName] = value.replace(/['"]/g, '');
            output.push(`Variable ${varName} assigned: ${variables[varName]}`);
          }
        }

        // Handle mathematical expressions
        else if (line.includes('+') || line.includes('-') || line.includes('*') || line.includes('/')) {
          const result = safeEvaluate(line);
          output.push(result);
        }
      }
    } catch (error) {
      output.push(`Error: ${error.message}`);
    }

    return output;
  };

  // Evaluate f-strings
  const evaluateFString = (fString, variables = {}) => {
    return fString.replace(/\{([^}]+)\}/g, (match, expr) => {
      try {
        // Check if it's a variable
        if (variables[expr]) {
          return variables[expr];
        }
        // Otherwise evaluate as expression
        return safeEvaluate(expr);
      } catch (error) {
        return expr;
      }
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen w-screen font-mono text-white">
      <TopMenuBar
        toggleSidebar={toggleSidebar}
        onNewFile={handleNewFile}
        onTerminalClick={handleTerminalClick}
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: Hidden on mobile, toggleable */}
        <div
          className={`fixed md:static inset-y-0 left-0 z-50 bg-[#222223] w-60 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
        >
          <Sidebar
            files={files}
            activeFile={activeFile}
            onSelect={handleSelectFile}
            temporaryFiles={Object.keys(temporaryFiles)}
          />
        </div>
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        <EditorArea
          openFiles={openFiles}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          files={files}
          onCloseFile={handleCloseFile}
          temporaryFiles={temporaryFiles}
          onFileContentChange={handleFileContentChange}
          onExecutePython={executePythonCode}
        />
      </div>
      <StatusBar filename={activeFile} />

      {/* Terminal */}
      <Terminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        activeFile={activeFile}
      />
    </div>
  );
}

export default App;