export interface Command {
  name: string;
  description: string;
  execute: () => string;
}

export interface TerminalLine {
  type: 'input' | 'output' | 'prompt';
  content: string;
  timestamp?: number;
}