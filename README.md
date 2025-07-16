# 🚀 SocketStream – Real-Time Chat Backend

SocketStream is a real-time messaging backend built with Node.js, Express, and Socket.IO.  
It allows users to chat instantly, manage profiles, and access features like blocking and deleting chats.

This backend supports:
- 🔐 **User authentication** via Email and Google OAuth
- 🛡️ **Protected routes** using JWT
- 💬 **Live chat** with Socket.IO
- 🧑‍💼 **Profile management** and user moderation
- 🗂️ **MongoDB** for database storage

---

## 🧠 Architecture

Built using clean and modular code principles.  
While it doesn’t follow a microservice or Docker setup, the structure is scalable and maintainable for production environments.

---

## 📬 Postman Collection

> Coming soon...

Includes APIs for:
- Email & Google Login
- Fetching user profile
- Real-time messaging
- Blocking / Deleting chats

---

## 🛠️ Tech Stack

- **Node.js**  
- **TypeScript**  
- **MongoDB**  
- **JWT (JSON Web Tokens)**  
- **Socket.IO**

---

## 🌐 Services Used

- ☁️ **Amazon S3 Signed URLs**  
- 🍃 **MongoDB Atlas**

---

## 📦 Installation & Setup

```bash
git clone https://github.com/yourusername/socketstream.git
cd socketstream
npm install
npm run start
