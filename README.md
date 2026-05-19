<div align="center">

# 🎯 CareerBoard — Job Application Tracker

### A full-stack MERN application to manage, track, and optimize your job search

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-View%20App-black?style=for-the-badge)](https://job-application-tracker-lemon-eight.vercel.app)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com/)

</div>

---

## 📌 Overview

**CareerBoard** is a full-stack job application management platform that helps users track every application, manage resumes and cover letters, analyze resume–JD fit using AI-style scoring, and gain insights to improve their job search outcomes.

Built as a real-world MERN project with JWT authentication, file uploads, and REST APIs.

---

## ✨ Features

### 🔐 Authentication
- User registration and login with JWT-based auth
- Personal profile creation and management

### 📋 Job Application Management
- Add and manage multiple job applications
- Manually track application status — Applied, Interview, Offer, Rejected, and more
- Search applications by company, role, or status
- Sort by date, company name, or status
- Filter to quickly find specific entries

### 📄 Resume & Cover Letter Management
- Upload a unique resume and cover letter per application
- View which documents were used for each job
- Download resumes and cover letters for any application
- Manage multiple resume versions across applications

### 🧠 Resume Analyzer
- Upload a resume (PDF / DOCX) and paste a job description
- ATS-style resume scoring
- Skill match analysis against the job description
- Missing skills identification
- Searchability and keyword alignment score
- Actionable improvement suggestions

### 📊 Analytics & Insights
- Total applications overview
- Status-wise distribution breakdown
- Resume match percentage
- Recruiter-friendly resume insights

---

## 🛠️ Tech Stack

**Frontend**

| Tech | Purpose |
|---|---|
| React.js (Vite) | UI framework |
| Ant Design | Component library |
| Tailwind CSS | Utility styling |
| Framer Motion | Animations |
| Axios | HTTP client |
| React Router | Client-side routing |

**Backend**

| Tech | Purpose |
|---|---|
| Node.js + Express.js | Server & REST API |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication |
| Multer | File uploads |
| PDF & DOCX Parsing | Resume analysis |

---

## 📂 Project Structure

```
JobApplicationTracker/
├── Frontend/               # React + Vite client
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   ├── context/        # Auth & global state
│   │   └── utils/          # Axios config, helpers
│   └── package.json
│
├── Backend/                # Node.js + Express server
│   ├── controllers/        # Route handler logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── middleware/         # Auth, file upload middleware
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/Gauri-Nagariya/JobApplicationTracker.git
cd JobApplicationTracker
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in `/Backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

```bash
npm run dev
```

Backend runs on [http://localhost:5000](http://localhost:5000)

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file in `/Frontend`:

```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

Frontend runs on [http://localhost:5173](http://localhost:5173)

---

## 🌐 API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and get JWT token |
| `GET` | `/api/applications` | Get all applications |
| `POST` | `/api/applications` | Add a new application |
| `PUT` | `/api/applications/:id` | Update application status |
| `DELETE` | `/api/applications/:id` | Delete an application |
| `POST` | `/api/resume/analyze` | Analyze resume against a JD |

---

## 🎯 Who Is This For?

- Students and freshers entering the job market
- Job seekers managing multiple applications at once
- Developers who want to optimize their resume against real job descriptions

---

## 📬 Contact

**Gauri Nagariya** — Full-Stack / MERN Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Gauri%20Nagariya-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/gauri-nagariya/)
[![GitHub](https://img.shields.io/badge/GitHub-Gauri--Nagariya-181717?style=flat&logo=github)](https://github.com/Gauri-Nagariya)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit%20Site-ff69b4?style=flat&logo=vercel)](https://gaurinagariyaportfolio.vercel.app/)

---

<div align="center">
  <sub>Built with ❤️ by Gauri Nagariya &nbsp;|&nbsp; ⭐ Star this repo if you found it useful!</sub>
</div>
