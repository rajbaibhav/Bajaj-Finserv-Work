# 🚀 Bajaj Finserv Health Challenge (BFHL) 

👋 **Welcome to my Full-Stack Application for the BFHL Coding Challenge!** 
This project is a complete, production-ready full-stack application built to process complex graph data, featuring cycle detection and tree traversal logic. It brings together a powerful Node.js backend and a beautiful, glassmorphic React frontend to provide a seamless user experience. 

--- 

## 🔗 Live Demos 
You can check out the live, deployed versions of the application right here: 
- **🎨 Frontend (Vercel):** [https://bajaj-finserv-work.vercel.app/](https://bajaj-finserv-work.vercel.app/) 
- **⚙️ Backend API (Render):** [https://bajaj-bfhl-api-gxt3.onrender.com/](https://bajaj-bfhl-api-gxt3.onrender.com/) 

--- 

## ✨ What's Inside? 

### The Frontend 🎨 
Built with **React**, **Vite**, and **Tailwind CSS**. 
The user interface is designed with a premium, modern glassmorphism aesthetic. It's not just functional; it's designed to look great and feel incredibly responsive. 

### The Backend ⚙️ 
Powered by **Node.js**, **Express**, and **MongoDB**. 
The RESTful API is the brains of the operation. It handles complex graph processing utilities, robust input validation, and secure cross-origin resource sharing (CORS) to communicate effortlessly with the frontend. 

--- 

## 🛠️ Tech Stack 
- **Frontend:** React, Vite, Tailwind CSS, Axios 
- **Backend:** Node.js, Express, MongoDB, Mongoose, dotenv, cors 
- **Deployment:** Vercel (Frontend), Render (Backend) 

--- 

## 💻 Want to run it locally? 
No problem! Just follow these simple steps to get the app running on your own machine. 

### 1. Clone the repository
```bash
git clone https://github.com/rajbaibhav/Bajaj-Finserv-Work.git
cd Bajaj-Finserv-Work
```

### 2. Set up the Backend 
1. Make sure you are in the root directory. 
2. Install the backend dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory and add your MongoDB URI:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```
4. Start the backend server:
```bash
npm run dev
```
*The backend will now be running on http://localhost:3000* 

### 3. Set up the Frontend 
1. Open a new terminal tab and navigate into the frontend folder:
```bash
cd frontend
```
2. Install the frontend dependencies:
```bash
npm install
```
3. Open `src/utils/api.js` and change the API_URL to point to your local server if you want to test locally:
```javascript
const API_URL = 'http://localhost:3000';
```
4. Start the frontend development server:
```bash
npm run dev
```
*The frontend will now be running (usually on http://localhost:5173).* 

--- 

## 🤝 Contributing & Feedback 
This project was built for the Bajaj Finserv Health role-specific challenge. Feel free to explore the code, test the endpoints, and reach out if you have any questions or feedback!
