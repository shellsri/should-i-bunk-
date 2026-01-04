🎓 Should I Bunk? live link:https://vercel.com/shellsris-projects/should-i-bunk

A full-stack academic productivity dashboard that helps students track attendance, deadlines, and overall academic health — and decide whether it’s safe to bunk a class or not 😉

🚀 Features

📅 Timetable Management
Create and manage your weekly class schedule.

✅ Attendance Tracker
Track attended vs total classes per subject with minimum attendance rules.

⏰ Deadline Tracker
Add, edit, complete, and monitor academic deadlines with priority levels.

📊 Academic Health Dashboard
Visual insights combining:

Attendance performance

Deadline completion rate

Overall academic health score

🤔 Should I Bunk? Logic
Calculates risk based on attendance thresholds and academic health.

📱 Responsive UI
Works smoothly on desktop and mobile screens.

🧠 How Academic Health Is Calculated

Attendance Health (60%)

Average attendance across all subjects

Deadline Health (40%)

Ratio of completed deadlines vs total deadlines

Overall Score

Overall = (Attendance × 0.6) + (Deadline Completion × 0.4)


Health Status:

🟢 On Track (≥ 75)

🟡 Needs Attention (60–74)

🔴 Critical (< 60)

🛠 Tech Stack
Frontend

React (Vite)

CSS (custom, no UI libraries)

Fetch API

Backend

Node.js

Express.js

MongoDB (Mongoose)

REST APIs

📂 Project Structure
should-i-bunk-/
├── client/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/               # Backend (Express + MongoDB)
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   └── index.js
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/shellsri/should-i-bunk-.git
cd should-i-bunk-

2️⃣ Backend setup
cd server
npm install


Create a .env file inside server/:

MONGO_URI=your_mongodb_connection_string
PORT=5000


Run backend:

npm run dev

3️⃣ Frontend setup
cd ../client
npm install
npm run dev

🎯 Why This Project?

This project was built to:

Solve a real student problem

Practice full-stack development

Work with real data & calculations
👨‍💻 Author

Shelly S
GitHub: https://github.com/shellsri

