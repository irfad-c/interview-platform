<h1 align="center">✨ Full-Stack Interview Platform ✨</h1>

This is a full-stack MERN coding interview platform for one-on-one interviews. It provides a built-in code editor with secure code execution, real-time video calls, and chat.
Interviews are conducted in locked rooms with automated test-case evaluation and instant feedback

---

**🚀 Features**

🔷 Code Editor: VS Code–style integrated editor

🔷 Authentication: Secure authentication using Clerk

🔷 Video Interviews: One-on-one video interview rooms

🔷 Dashboard: Dashboard with live statistics

🔷 Media Controls: Microphone and camera toggle, screen sharing, recording

🔷 Chat: Real-time messaging

🔷 Code Execution: Secure code execution in an isolated environment

🔷 Evaluation: Automated feedback based on test cases

🔷 Feedback UI: Success animation and failure notifications

🔷 Practice Mode: Practice problems page for solo coding

🔷 Room Control: Room locking with a maximum of two participants

🔷 Background Jobs: Asynchronous background processing with Inngest

🔷 API: RESTful API built with Node.js and Express

🔷 Data Management: Data fetching and caching with TanStack Query

🔷 Code Quality: PR analysis and optimization using CodeRabbit

🔷 Version Control: Git and GitHub workflow with branches and pull requests

🔷 Deployment: Frontend deployed on Netlify and backend deployed on Render

---

**🛠️ Tech Stack**

🔷 Frontend Tools: JSX, React, TanStack Query, Tailwind CSS, DaisyUI

🔷 Backend Tools: Node.js, Express.js, Mongoose

🔷 Database Tools: MongoDB Atlas

🔷 Authentication Tools: Clerk

🔷 Real-Time Communication Tools: Stream SDK (Chat and Video)

🔷 Background Jobs: Inngest

🔷 Code Execution Tools: Isolated code runner (sandboxed execution)

🔷 Version Control Tools: Git, GitHub

🔷 Development Tools: Visual Studio Code, Postman, Nodemon

🔷 Deployment Tools: Netlify (Frontend), Render (Backend)

---
**💻 Screenshots**

📊 Dashboard page

<img width="1848" height="880" alt="Screenshot 2026-02-19 152514" src="https://github.com/user-attachments/assets/9f539085-4961-43cf-a645-371ab4b18abd" />

***
🧩 Problems Page

<img width="1849" height="734" alt="image" src="https://github.com/user-attachments/assets/291be001-f312-430f-bccb-0662cc580d92" />



---
## 🧪 .env Setup

### Backend (`/backend`)

```bash
PORT=5001

DB_URL=your_mongodb_connection_url

INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

CLIENT_URL=http://localhost:5173
```

### Frontend (`/frontend`)

```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

VITE_API_URL=http://localhost:3000/api

VITE_STREAM_API_KEY=your_stream_api_key
```

---

## 🔧 Run the Backend

```bash

cd backend
npm install
npm run dev
```

---

## 🔧 Run the Frontend

```
bash
cd frontend
npm install
npm run dev
```
