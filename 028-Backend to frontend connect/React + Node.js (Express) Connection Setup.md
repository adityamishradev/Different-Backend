# 🚀 React + Node.js (Express) Connection Setup  

This guide shows how to connect a **React.js frontend** (using Vite) with a **Node.js (Express)** backend using **CORS**.  

---

## 📁 Folder Structure  

```
project/
│
├── backend/
│   ├── server.js
│   ├── package.json
│
└── frontend/
    ├── src/
    │   └── App.js
    ├── package.json
```

---

## ⚙️ Backend Setup (Node + Express + CORS)

### 1️⃣ Go to backend folder  
```bash
cd backend
```

### 2️⃣ Install dependencies  
```bash
npm install express cors
```

### 3️⃣ Create `server.js` file  

```js
// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Enable CORS (so frontend can access backend)
app.use(cors());
app.use(express.json());

// Sample route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Express backend with CORS!' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
```

---

### 4️⃣ Start backend server  
```bash
node server.js
```

### 5️⃣ (Optional) Add scripts in `package.json`  
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Now you can run:  
```bash
npm run dev
```

Server will start on → [http://localhost:5000](http://localhost:5000)

---

## ⚛️ Frontend Setup (React with Vite)

### 1️⃣ Go to frontend folder  
```bash
cd frontend
```

### 2️⃣ Create a new Vite project  
```bash
npm create vite@latest
```
(Choose React or React + JavaScript template)

---

### 3️⃣ Edit `src/App.js`  

```jsx
// frontend/src/App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/product/get-item') // 👈 backend port check karo
      .then((res) => res.json())
      .then((data) => {
        console.log("Products from backend:", data); // 👈 ab yahan sahi jagah pe hai
        setMessage(data.message || "Data received successfully!");
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
```

---

### 4️⃣ Start React app  
```bash
npm run dev
```

App will run on → [http://localhost:5173](http://localhost:5173)

---

## 🧠 Important Notes  

✅ Run backend and frontend **in separate terminals**  

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

⚠️ Don’t close backend terminal while frontend is running.  

🚫 If you see a **CORS error**, ensure this line is in your backend:
```js
app.use(cors());
```
