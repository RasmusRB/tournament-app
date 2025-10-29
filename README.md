# 🏆 Pétanque Tournament Manager

A modern, user-friendly tournament management application for Pétanque competitions.

## ✨ Features

- **Team Management** - Create teams and add players with custom names/aliases
- **Tournament Bracket** - Automatic bracket generation for even-numbered teams (2, 4, 8, etc.)
- **Match Tracking** - Click to record winners and automatically progress through rounds
- **Persistent State** - All data saved locally with Redux Persist
- **Dark/Light Mode** - Toggle between themes with persistent preference
- **Bilingual** - Full support for English and Danish (🇬🇧/🇩🇰)
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎮 How to Use

1. **Add Teams** - Create teams with custom names
2. **Add Players** - Assign players to each team
3. **Start Tournament** - Begin when you have an even number of teams with players
4. **Record Results** - Click the winning team to advance them
5. **View History** - See all previous rounds and results

## 🛠️ Tech Stack

- **React** + **TypeScript**
- **Redux Toolkit** - State management
- **Redux Persist** - Data persistence
- **i18next** - Internationalization
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI components
- **Vite** - Build tool

## 📝 License

This project is open source and available for personal and educational use.
