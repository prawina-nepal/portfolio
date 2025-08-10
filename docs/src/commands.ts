import { Command } from './types';

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Show available commands',
    execute: () => `
Available commands:

  help      - Show this help message
  about     - Learn more about me
  projects  - View my cybersecurity projects
  skills    - See my technical skills
  contact   - Get my contact information
  clear     - Clear the terminal
  
Type any command and press Enter to execute.`
  },

  about: {
    name: 'about',
    description: 'Display bio information',
    execute: () => `
About Navya Nepal
================

Hi! I'm Navya Nepal, a cybersecurity enthusiast currently studying at 
Softwarica College. I love solving Capture the Flag (CTF) challenges, 
analyzing malware, and building security tools to make the digital 
world a safer place.

When I'm not diving deep into security research, you can find me 
experimenting with new tools, participating in CTF competitions, 
and contributing to open-source security projects.`
  },

  projects: {
    name: 'projects',
    description: 'List cybersecurity projects',
    execute: () => `
Recent Projects
===============

[1] Steganography Tool
    └── Language: Python
    └── Hide and extract secret messages in images
    └── Features AES encryption and LSB technique
    
[2] Encrypted Chat System
    └── Secure real-time messaging application
    └── End-to-end encryption implementation
    └── Built with modern cryptographic standards
    
[3] Vulnerability Scanner
    └── Automated security assessment tool
    └── Identifies common web vulnerabilities
    └── Generates detailed security reports

Each project showcases different aspects of cybersecurity 
and demonstrates practical security implementations.`
  },

  skills: {
    name: 'skills',
    description: 'Show technical skills',
    execute: () => `
Technical Arsenal
=================

Network Analysis:
  ├── Wireshark     [████████████] Expert
  └── Nmap          [██████████  ] Advanced
  
Security Testing:
  ├── Burp Suite    [████████████] Expert
  └── Metasploit    [████████    ] Intermediate
  
Programming:
  ├── Python        [████████████] Expert
  ├── JavaScript    [██████████  ] Advanced
  ├── Bash/Shell    [████████    ] Intermediate
  └── C/C++         [██████      ] Intermediate

Specializations: Penetration Testing, Malware Analysis, 
Digital Forensics, Secure Code Review`
  },

  contact: {
    name: 'contact',
    description: 'Display contact information',
    execute: () => `
Contact Information
===================

GitHub:   https://github.com/navyanepal
LinkedIn: https://linkedin.com/in/navyanepal
Email:    Available upon request

═══════════════════════════════════════════════════

Feel free to reach out for collaboration opportunities,
CTF team invitations, or cybersecurity discussions!

PGP Key: Available on request for secure communications`
  },

  clear: {
    name: 'clear',
    description: 'Clear the terminal screen',
    execute: () => 'CLEAR_SCREEN'
  }
};