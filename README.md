# Rock Paper Scissors React Application

A modern, interactive Rock Paper Scissors game built with React, Vite, and Tailwind CSS. This application features a responsive design, dynamic animations, and an intelligent difficulty system.

## Features

### Modern User Interface
- **Glassmorphism Design**: The application utilizes a sleek, translucent aesthetic with backdrop blurs and gradient backgrounds.
- **Dynamic Animations**: Transitions and interactions are smoothed using Framer Motion, providing a polished user experience.
- **Responsive Layout**: fully compatible with desktop, tablet, and mobile devices.

### Intelligent Difficulty System
The game includes three distinct difficulty levels to challenge players of all skill levels:
1.  **Easy**: The bot plays completely randomly, simulating a fair match.
2.  **Medium**: The bot has a 50% chance of predicting your move and countering it, providing a moderate challenge.
3.  **Impossible (Hard)**: The bot reads your move with 90% accuracy, making it extremely difficult to win.

### Technical Highlights
-   **Tech Stack**: React 18, Vite, Tailwind CSS, Lucide React, Framer Motion.
-   **State Management**: efficient use of React hooks (useState, useEffect) for game logic.
-   **Persistence**: Game scores and history are saved to local storage.
-   **Clean Code**: Modular component structure with separate logic for game mechanics and UI rendering.

## How to Play

1.  **Select Difficulty**: Upon loading the application, choose your desired difficulty level (Easy, Medium, or Impossible).
2.  **Make Your Move**: Select Rock, Paper, or Scissors from the options displayed on the screen.
3.  **View Result**: The application will instantly reveal the bot's choice and the round winner.
4.  **Track Score**: Your wins, losses, and draw counts are tracked at the bottom of the screen.
5.  **Change Difficulty**: Use the back arrow button in the top left corner to return to the main menu and select a different difficulty level. Note that this will reset your current session score.

## Installation

1.  Clone the repository.
2.  Run `npm install` to install dependencies.
3.  Run `npm run dev` to start the development server.
