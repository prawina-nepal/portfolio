import React, { useState, useEffect, useRef } from 'react';
import { commands } from '../commands';
import { TerminalLine } from '../types';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const typeWriter = (text: string, callback?: () => void) => {
    setIsTyping(true);
    const lines = text.split('\n');
    let currentLineIndex = 0;
    let currentCharIndex = 0;

    const addLine = () => {
      if (currentLineIndex >= lines.length) {
        setIsTyping(false);
        callback?.();
        return;
      }

      const currentLine = lines[currentLineIndex];
      
      if (currentCharIndex === 0) {
        setHistory(prev => [...prev, {
          type: 'output',
          content: '',
          timestamp: Date.now()
        }]);
      }

      if (currentCharIndex < currentLine.length) {
        setHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].content = currentLine.substring(0, currentCharIndex + 1);
          return newHistory;
        });
        currentCharIndex++;
        setTimeout(addLine, Math.random() * 20 + 10);
      } else {
        setHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].content = currentLine;
          return newHistory;
        });
        currentLineIndex++;
        currentCharIndex = 0;
        setTimeout(addLine, 100);
      }
    };

    addLine();
  };

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    
    // Add input to history
    setHistory(prev => [...prev, {
      type: 'input',
      content: `navya@terminal:~$ ${input}`,
      timestamp: Date.now()
    }]);

    // Add to command history
    if (trimmedInput && !commandHistory.includes(trimmedInput)) {
      setCommandHistory(prev => [...prev, trimmedInput]);
    }

    // Execute command
    if (commands[trimmedInput]) {
      const output = commands[trimmedInput].execute();
      if (output === 'CLEAR_SCREEN') {
        setHistory([]);
      } else {
        typeWriter(output);
      }
    } else if (trimmedInput === '') {
      // Empty command, just add a new prompt
    } else {
      typeWriter(`Command not found: ${trimmedInput}\nType 'help' for available commands.`);
    }

    setCurrentInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isTyping) return;

    if (e.key === 'Enter') {
      executeCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  useEffect(() => {
    // Initial welcome message
    const welcomeMessage = `
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ███╗   ██╗ █████╗ ██╗   ██╗██╗   ██╗ █████╗               │
│  ████╗  ██║██╔══██╗██║   ██║╚██╗ ██╔╝██╔══██╗              │
│  ██╔██╗ ██║███████║██║   ██║ ╚████╔╝ ███████║              │
│  ██║╚██╗██║██╔══██║╚██╗ ██╔╝  ╚██╔╝  ██╔══██║              │
│  ██║ ╚████║██║  ██║ ╚████╔╝    ██║   ██║  ██║              │
│  ╚═╝  ╚═══╝╚═╝  ╚═╝  ╚═══╝     ╚═╝   ╚═╝  ╚═╝              │
│                                                             │
│                    navya.nepal [ Version 1.0.0 ]           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Welcome to my cybersecurity terminal portfolio!

System initialized... Loading user profile...
Security protocols activated... ✓
Firewall status: ACTIVE ✓
Intrusion detection: ENABLED ✓

Type 'help' to see available commands or explore on your own.
Happy hacking! 🔐`;

    typeWriter(welcomeMessage);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Focus input when not typing
    if (!isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="control-btn close"></div>
          <div className="control-btn minimize"></div>
          <div className="control-btn maximize"></div>
        </div>
        <div className="terminal-title">navya@terminal: ~</div>
      </div>
      
      <div 
        ref={terminalRef}
        className="terminal-body"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, index) => (
          <div key={index} className={`terminal-line ${line.type}`}>
            <pre>{line.content}</pre>
          </div>
        ))}
        
        {!isTyping && (
          <div className="terminal-input-line">
            <span className="prompt">navya@terminal:~$ </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              autoComplete="off"
              spellCheck="false"
            />
            <span className="cursor">█</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;