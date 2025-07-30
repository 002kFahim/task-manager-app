# Task Manager App

A full-stack task management application built with **Next.js** (frontend) and **Express.js** (backend).  
This application allows users to create, manage, and organize tasks with features like categorization, status tracking, and task filtering.

---

## 🚀 Features

- **User Authentication** (Login/Signup)
- **Task Management**: Create, Read, Update, and Delete tasks
- **Categorization**: Categorize tasks (Work, Personal, Health, etc.)
- **Status Tracking**: Track task status (Pending, In Progress, Done)
- **Filter & Search** tasks easily
- **Dashboard**: Task statistics and overview
- **Random Task Selection**: Spin a wheel to pick a random task

---

## 📂 Project Structure

```
backend/
├── server.js                # Entry point for the server
├── src/
│   ├── app.js               # Express application setup
│   ├── config/              # Database configurations
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Database models
│   └── routes/              # API routes
frontend/
├── app/
│   ├── auth/                # Auth pages
│   ├── dashboard/           # Dashboard pages
│   └── page.js              # Home page
├── components/              # UI components
├── contexts/                # React contexts
├── lib/                     # Utilities
└── public/                  # Static assets
```

---

## 🛠️ Technologies Used

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **helmet** - Security headers
- **dotenv** - Environment variables

### Frontend

- **Next.js** - React framework
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form handling
- **Yup** - Form validation
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **js-cookie** - Cookie handling

---

## ⚡ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database

---

### Backend Setup

# Navigate to backend directory

cd backend

# Install dependencies

npm install

# Create .env file in backend directory

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Start development server

npm run dev

### Frontend Setup

# Navigate to frontend directory

cd frontend

# Install dependencies

npm install

# Create .env.local file in frontend directory

NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start development server

npm run dev

# Now open your browser and navigate to:

http://localhost:3000
