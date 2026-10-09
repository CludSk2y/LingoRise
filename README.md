# Lingorise 🌍

**Lingorise** is a modern, comprehensive language-learning tracking platform designed to help users monitor their daily study habits, manage vocabulary flashcards, set learning goals, and visualize their language acquisition progress over time.

---

## 🚀 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js (REST API)
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt.js
- **Security & Utilities:** Cors, Dotenv

### Frontend *(Planned / Ready for integration)*
- **Library/Framework:** React.js / Next.js
- **Styling:** Tailwind CSS
- **State Management:** React Context / Zustand
- **HTTP Client:** Axios

---

## 🏗️ Database Design & Schema (Tables)

Le projet contient 6 tables principales conçues pour assurer l'intégrité des données et des relations propres via Sequelize :

### 1. Table `users` (Utilisateurs)
| Colonne | Type | Contraintes / Règles |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key (Default UUIDv4) |
| `name` | VARCHAR(100) | Required |
| `email` | VARCHAR(255) | Required, Unique, Lowercase |
| `password_hash` | VARCHAR(255) | Required (Hashed via bcrypt) |
| `timezone` | VARCHAR(60) | Default: 'UTC' |

### 2. Table `languages` (Langues suivies)
| Colonne | Type | Contraintes / Règles |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `user_id` | UUID | Foreign Key $\rightarrow$ `users.id` |
| `name` | VARCHAR(80) | Required (e.g., French, Spanish) |
| `code` | VARCHAR(10) | Nullable (e.g., fr, es) |
| `current_level` | ENUM | 'A1', 'A2', 'B1', 'B2', 'C1', 'C2' |
| `target_level` | ENUM | 'A1', 'A2', 'B1', 'B2', 'C1', 'C2' |
| `status` | ENUM | 'active', 'paused', 'completed' |
| `started_at` | DATEONLY | Date de début |

### 3. Table `study_sessions` (Sessions d'étude)
| Colonne | Type | Contraintes / Règles |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `user_id` | UUID | Foreign Key $\rightarrow$ `users.id` |
| `language_id` | UUID | Foreign Key $\rightarrow$ `languages.id` |
| `activity_type` | ENUM | 'grammar', 'vocabulary', 'listening', 'speaking', 'reading', 'writing', 'other' |
| `duration_minutes` | INTEGER | Obligatoire (> 0) |
| `studied_at` | TIMESTAMP | Horodatage de la session |
| `notes` | TEXT | Optionnel |

### 4. Table `goals` (Objectifs d'apprentissage)
| Colonne | Type | Contraintes / Règles |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `user_id` | UUID | Foreign Key $\rightarrow$ `users.id` |
| `language_id` | UUID | Nullable FK (Si NULL = objectif général pour toutes les langues) |
| `period` | ENUM | 'daily', 'weekly' |
| `target_minutes` | INTEGER | Obligatoire (> 0) |
| `start_date` | DATEONLY | Date de début |
| `end_date` | DATEONLY | Date de fin |

### 5. Table `user_settings` (Paramètres utilisateur)
| Colonne | Type | Contraintes / Règles |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `user_id` | UUID | Foreign Key $\rightarrow$ `users.id` (Unique) |
| `preferred_language` | VARCHAR(10) | Default: 'en' |
| `theme` | ENUM | 'light', 'dark', 'system' |
| `notifications_enabled` | BOOLEAN | Default: true |

### 6. Table `daily_activity` (Cache des activités journalières - Optionnel)
| Colonne | Type | Contraintes / Règles |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `user_id` | UUID | Foreign Key $\rightarrow$ `users.id` |
| `activity_date` | DATEONLY | Date locale |
| `total_minutes` | INTEGER | Default: 0 |
| `session_count` | INTEGER | Default: 0 |

---

## 🔌 API Endpoints Overview (`/api/v1`)

- **Authentication (`/auth`):** Register, Login, Logout, GET `/me`, Password reset.
- **Languages (`/languages`):** CRUD operations for user target languages.
- **Study Sessions (`/sessions`):** Logging and filtering study practice sessions.
- **Goals (`/goals`):** Managing learning targets and tracked progress.
- **Dashboard & Analytics:** Summary overview, recent sessions, and growth metrics.

---

## 📁 Full Project Structure

```text
lingorise/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # PostgreSQL database connection pool & Sequelize setup
│   │   ├── controllers/
│   │   │   ├── authController.js      # User registration and login logic
│   │   │   ├── goalController.js      # Language learning goals & targets
│   │   │   ├── languageController.js  # Target languages management
│   │   │   ├── sessionController.js   # Study sessions and time tracking
│   │   │   └── dashboardController.js # Analytics & summary data
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js      # JWT token verification middleware
│   │   │   ├── errorHandler.js        # Centralized error handling
│   │   │   └── validateRequest.js     # Input validation middleware
│   │   ├── models/
│   │   │   ├── User.js                # User Sequelize model
│   │   │   ├── Language.js            # Language Sequelize model
│   │   │   ├── StudySession.js        # Study session Sequelize model
│   │   │   ├── Goal.js                # Goal Sequelize model
│   │   │   ├── UserSetting.js         # User settings Sequelize model
│   │   │   └── index.js               # Model relationships & associations
│   │   ├── routes/
│   │   │   ├── authRoutes.js          # Authentication endpoints
│   │   │   ├── goalRoutes.js          # Goals endpoints
│   │   │   ├── languageRoutes.js      # Languages endpoints
│   │   │   ├── sessionRoutes.js       # Study sessions endpoints
│   │   │   └── dashboardRoutes.js     # Dashboard & Analytics endpoints
│   │   ├── services/
│   │   │   └── analyticsService.js    # Streaks, time calculation, and stats
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

📌 Core Features
Secure Authentication: JWT-based signup and signin with password hashing (bcryptjs).

Language Tracking: Add and manage target languages you are currently studying with specific proficiency levels.

Study Sessions: Log your daily practice time, activity types, and keep track of consecutive daily streaks.

Vocabulary Bank: Store new words, translations, and review them using flashcard logic.

Progress Insights: Analyze learning milestones, daily goals, and growth via dedicated statistics.

