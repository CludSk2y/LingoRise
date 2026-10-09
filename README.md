# Lingorise 🌍

**Lingorise** is a modern, comprehensive language-learning tracking platform designed to help users monitor their daily study habits, manage vocabulary flashcards, set learning goals, and visualize their language acquisition progress over time.

---

## 🚀 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js (REST API)
- **Database:** PostgreSQL
- **Database Driver / Query:** `pg` pool
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt.js
- **Security & Utilities:** Cors, Dotenv

### Frontend *(Planned / Ready for integration)*
- **Library/Framework:** React.js / Next.js
- **Styling:** Tailwind CSS
- **State Management:** React Context / Zustand
- **HTTP Client:** Axios

---

## 📁 Full Project Structure

```text
lingorise/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # PostgreSQL database connection pool
│   │   ├── controllers/
│   │   │   ├── authController.js      # User registration and login logic
│   │   │   ├── goalController.js      # Language learning goals & targets
│   │   │   ├── languageController.js  # Target languages management
│   │   │   ├── progressController.js  # Statistics and tracking logic
│   │   │   ├── studySessionController.js # Study sessions and time tracking
│   │   │   ├── userLanguageController.js # User-language mapping & levels
│   │   │   └── vocabularyController.js   # Vocabulary cards and translation tracker
│   │   ├── middleware/
│   │   │   └── authMiddleware.js      # JWT token verification middleware
│   │   ├── models/
│   │   │   └── User.js                # Database schema / queries helpers
│   │   ├── routes/
│   │   │   ├── authRoutes.js          # Authentication endpoints
│   │   │   ├── goalRoutes.js          # Goals endpoints
│   │   │   ├── languageRoutes.js      # Languages endpoints
│   │   │   ├── progressRoutes.js      # Progress endpoints
│   │   │   ├── studySessionRoutes.js  # Study sessions endpoints
│   │   │   ├── userLanguageRoutes.js  # User languages endpoints
│   │   │   └── vocabularyRoutes.js    # Vocabulary endpoints
│   │   ├── app.js                     # Express app setup and middleware configuration
│   │   └── server.js                  # Entry point to start the HTTP server
│   ├── .env.example                   # Environment variables template
│   ├── package.json                   # Backend dependencies & scripts
│   └── tsconfig.json                  # TypeScript config (if applicable)
│
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── assets/                    # Images, icons, and static illustrations
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                # Reusable UI components (Buttons, Modals, Inputs)
│   │   │   ├── dashboard/             # Stats widgets, streak counters, charts
│   │   │   ├── layout/                # Navbar, Sidebar, Footer, Layout wrapper
│   │   │   └── vocabulary/            # Flashcard components and lists
│   │   ├── context/
│   │   │   └── AuthContext.js         # Global authentication state management
│   │   ├── hooks/
│   │   │   └── useFetch.js            # Custom data fetching hooks
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx          # Main user dashboard & overview
│   │   │   ├── Login.jsx              # User sign-in page
│   │   │   ├── Register.jsx           # User sign-up page
│   │   │   ├── Statistics.jsx         # Detailed progress charts page
│   │   │   ├── StudySession.jsx       # Active study timer & session logger
│   │   │   └── Vocabulary.jsx         # Vocabulary management page
│   │   ├── services/
│   │   │   └── api.js                 # Axios instance configured with baseURL & interceptors
│   │   ├── styles/
│   │   │   └── tailwind.css           # Tailwind CSS directives and custom classes
│   │   ├── App.jsx                    # Root component with route definitions
│   │   └── main.jsx                   # React DOM entry point
│   ├── tailwind.config.js             # Tailwind CSS configuration
│   ├── package.json                   # Frontend dependencies & scripts
│   └── vite.config.js                 # Vite bundler configuration
│
├── .gitignore                         # Git ignore rules for node_modules, env, etc.
└── README.md                          # Project documentation

⚙️ Getting Started & Installation
Prerequisites
Node.js (v18 or higher)

PostgreSQL installed locally or hosted (e.g., Supabase, Neon, Render)

1. Clone the Repository
Bash
git clone [https://github.com/CludSk2y/LingoRise.git](https://github.com/CludSk2y/LingoRise.git)
cd LingoRise

2. Backend Setup
Bash
cd backend
npm install

Start the backend development server:

Bash
npm run dev
📌 Core Features
Secure Authentication: JWT-based signup and signin with password hashing (bcryptjs).

Language Tracking: Add and manage target languages you are currently studying.

Study Sessions: Log your daily practice time and keep track of consecutive daily streaks.

Vocabulary Bank: Store new words, translations, and review them using flashcard logic.

Progress Insights: Analyze learning milestones and growth via dedicated statistics.

📄 License
This project is open-source and available under the MIT License.
by kaoutar kham 
