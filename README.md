# NEXORA - Modern EdTech Platform

A production-quality coding learning platform built with React, TypeScript, and TanStack Start.

## Features

- 📚 **Comprehensive Curriculum**: Data Structures, Java, Python, C Language
- 🎥 **Embedded Learning**: YouTube video integration
- 📝 **Notes System**: Long-form content with syntax highlighting
- 💻 **Practice Lab**: Hands-on coding exercises
- 🧪 **Quiz Engine**: 60-second timed quizzes with scoring
- ⭐ **Review System**: Public reviews and ratings
- 🏆 **XP & Streak System**: Gamified learning progression
- 👤 **User Profile**: Track progress and achievements
- 🌙 **Dark/Light Theme**: Full theme support
- 📱 **Responsive Design**: Desktop, tablet, and mobile optimized

## Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Routing**: TanStack Router
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui inspired
- **Data Persistence**: LocalStorage

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/srivaishnavi1409-tech/NEXORA.git
cd NEXORA

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable React components
├── hooks/              # Custom React hooks
├── stores/             # Zustand state stores
├── data/               # Curriculum and quiz data
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── styles/             # Global styles
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## LocalStorage Schema

```typescript
// Authentication
localStorage['users']          // Array of user objects
localStorage['currentUser']    // Current session user

// Preferences
localStorage['theme']          // 'light' | 'dark'
localStorage['activeSubject']  // Current subject

// Progress
localStorage['xpTotal']        // Total XP earned
localStorage['streak']         // { count, lastDate }
localStorage['progress_*']     // Module-specific progress

// Content
localStorage['reviews']        // User reviews
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Learning Paths

1. **Data Structures**: Fundamentals and advanced concepts
2. **Java**: OOP principles and practical applications
3. **Python**: Syntax, libraries, and scripting
4. **C Language**: Low-level programming and memory management

## Features

### Authentication
- Email/password login and signup
- Password strength validation
- Session management via localStorage
- Simulated Google OAuth

### Learning Views
- **Video**: YouTube embedded lessons
- **Notes**: Rich text with code syntax highlighting
- **Practice**: Coding challenges with starter templates
- **Quiz**: Timed assessments with instant feedback

### Gamification
- XP rewards for completing content
- Streak tracking for daily learning
- Achievement badges
- Progress visualization

### Social Features
- Public reviews and ratings
- Subject-specific feedback
- Helpful vote tracking

## License

MIT

## Author

Built with ❤️ by [Your Name]
