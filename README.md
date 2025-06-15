# Task for Autonomix : AI Transcript Reader

A modern full-stack application featuring Next.js for the frontend and Express.js for the backend, allowing users to get the meaningful and actionable items from the converstation transcript.

## 🚀 Tech Stack

### Frontend (Next.js)

- ⚡️ Next.js 15 with App Router
- 🔥 TypeScript for type safety
- 🎨 TailwindCSS and ShadCN for styling
- 📦 Redux Toolkit for state management
- 🎯 Deployed on Vercel

### Backend (Express.js)

- ⚡️ Express.js 5
- 🔥 TypeScript for type safety
- 🔒 CORS enabled
- 🎯 Deployed on `render` (free version)
- 🪄 AI used : Gemini `gemini-2.0-flash`

<h3 align="center">Hosted Link : <a href="https://task-for-autonomix.vercel.app">https://task-for-autonomix.vercel.app</a></h3>


## Level 1


| Task                              | Status    | Usage             |
| --------                          | -------   | -------           |
| Transcript Submission             |   ✅     | Next.js            |
| AI-Powered Action Item Generation |   ✅     | Gemini             |
| Task Interaction                  |   ✅     | Redux              |
| Progress Visualization            |   ✅     | Recharts           |
| Modern UI                         |   ✅     | Shadcn + Tailwind  |
| Hosting                           |   ✅     | Vercel, Render     |
| Documentation                     |   ✅     | You are here       |

## Level 2

| Task                              | Status    | Usage             |
| --------                          | -------   | -------           |
| Filter and Sort Functionality     |   ✅     | Next.js            |
| AI-Powered Prioritization         |   ✅     | Gemini             |
| Bar Chart Visualization           |   ✅     | Recharts           |
| Database Integration              |   ❌     | basic              |

## Level 3

| Task                              | Status    | Usage             |
| --------                          | -------   | -------           |
| Cloud Deployment                  |   ❌     |                   |
| Authentication                    |   ❌     |                   |
| Testing                           |   ❌     |                   |
| AI Auto-Tagging                   |   ❌     |                   |

# 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/arpittyagi102/task-for-autonomix
   cd task-for-autonomix
   ```

2. Install dependencies for all packages:

   ```bash
   npm run install-all
   ```

3. Set up environment variables:

   - Create `.env.local` file in the `client` directory
   - Add the following variables:
     ```
     NEXT_PUBLIC_API_URL=https://api.backend.com
     ```

   - Create `.env.local` file in the `server` directory
   - Add the following variables:
     ```
     GOOGLE_GENAI_API_KEY=yourgeminiapikey
     ```


4. Start the development servers:

   In separate terminals:

   ```bash
   # Start backend server
   npm run server

   # Start frontend server
   npm run client
   ```

   The frontend will be available at `http://localhost:3000`
   The backend will be available at `http://localhost:5000`
