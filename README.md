## 🌐 Frontend Preview

![Frontend Screenshot](https://github.com/user-attachments/assets/4498a4f3-08fd-42cb-9df5-ae80160da813)


# BeyondChats – Full Stack Web Developer Intern Assignment

This project is a full-stack application built as part of the BeyondChats
Full Stack Web Developer Intern assignment.

It demonstrates:
- Web scraping
- Backend API development
- Automation using Node.js
- AI-inspired content updating (Mock LLM)
- React frontend for content visualization

---

## 📁 Project Structure
```
beyondchats-assignment/
├── backend/
│ ├── server.js
│ ├── routes/
│ ├── models/
│ ├── scraper/
│ ├── script/
│ ├── .env.example
│ └── package.json
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
└── README.md
```

---

## ⚙️ Local Setup Instructions

### 1️⃣ Prerequisites
Make sure you have the following installed:
- Node.js (v18+ recommended)
- MongoDB (local installation)
- Git

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/ShivamKr-T/beyondchats-assignment.git
cd beyondchats-assignment
```

### 3️⃣ Backend Setup
```
cd backend
npm install
```

Create a .env file (refer .env.example):
MONGO_URI=mongodb://your_URI/beyondchats

Start MongoDB locally, then run:
```
node server.js
```

Backend will run at:
http://localhost:5000

### 4️⃣ Scrape Original Articles
```
node scraper/scrapeBlogs.js
```

### 5️⃣ Run Automation Script
Run Automation Script

### 6️⃣ Frontend Setup
```
cd frontend
npm install
npm start
```

Frontend will run at:
http://localhost:3000

---

## 🧠 Architecture & Data Flow Diagram
```
┌────────────┐
│ BeyondChats│
│   Blogs    │
└─────┬──────┘
      │ (Scraping)
      ▼
┌──────────────┐
│  Scraper     │
│ (Node.js)    │
└─────┬────────┘
      │
      ▼
┌──────────────┐
│ MongoDB      │
│ Articles DB  │
└─────┬────────┘
      │
      ▼
┌──────────────┐
│ Express APIs │
│ (/articles)  │
└─────┬────────┘
      │
      ▼
┌──────────────┐
│ Automation   │
│ Script       │
│ - Mock Google│
│ - Mock LLM   │
└─────┬────────┘
      │ (Update)
      ▼
┌──────────────┐
│ MongoDB      │
│ Updated Data │
└─────┬────────┘
      │
      ▼
┌──────────────┐
│ React Frontend│
│ Original vs  │
│ Updated View │
└──────────────┘
```
---

## 🤖 LLM & Search Abstraction

To keep the project self-contained and easy to evaluate:
- Google Search is mocked
- LLM-based rewriting is mocked

These layers are abstracted and can be easily replaced with real services
(OpenAI, Gemini, SerpAPI) by adding API keys and updating the respective modules.

---

## 🌐 Live Demo Link

**Frontend**
https://beyond-chats-assignement-ehxbgdeqg-shivamkr-ts-projects.vercel.app/

**Backend**
https://beyondchats-assignement.onrender.com/articles

---

## 👨‍💻 Author

**Shivam Kumar**  
Full Stack Developer | Backend & Systems Enthusiast
