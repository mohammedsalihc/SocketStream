# SocketStream – Real-Time Chat Backend

SocketStream is a real-time messaging backend built with Node.js, Express, and Socket.IO.  
It allows users to chat instantly, manage profiles, and access features like blocking and deleting chats.

This backend supports:
- User authentication via Email and Google OAuth
- Protected routes using JWT
- Real-time messaging with Socket.IO
- Profile management and user moderation
- MongoDB for database storage

## Architecture

SocketStream is built using clean and modular code principles.  
While it does not use microservices or containerization, the structure is scalable and easy to maintain in production environments.

## Postman Collection

Coming soon...

Includes API endpoints for:
- Email and Google login
- Fetching user profiles
- Real-time chat communication
- Blocking and deleting chat records

## Tech Stack

- Node.js  
- TypeScript  
- MongoDB  
- JWT (JSON Web Tokens)  
- Socket.IO

## Services Used

- Amazon S3 Signed URLs  
- MongoDB Atlas

## Installation and Setup

```bash
git clone https://github.com/yourusername/socketstream.git
cd socketstream
npm install
npm run start
