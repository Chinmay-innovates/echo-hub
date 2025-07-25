# 💬 Full-Stack Real-Time Discord Clone

A complete end-to-end **Discord clone** built with modern web technologies.
Includes real-time chat, video/audio calls, server/channel management, member
roles, and a responsive, beautiful UI. Perfect for learning how to build
production-ready, full-stack, real-time applications.

---

## 🚀 Features

### 🔗 Real-Time Communication

- Real-time messaging with **Socket.io**
- Live message editing and deletion for all users
- WebSocket fallback with polling and alerts

### 🗂️ Channels & Conversations

- Create **Text**, **Audio**, and **Video Call** channels
- 1:1 conversations with real-time messaging and video calls
- Infinite scroll for messages (batches of 10 via **TanStack Query**)

### 🎥 Media & Messaging

- Send attachments via **UploadThing**
- Edit and delete messages with live sync across clients

### 🛠️ Server & Invite System

- Create and customize servers
- Generate unique invite links with a working invite system

### 👥 Member Roles & Moderation

- Role management: Guest / Moderator
- Kick users and update roles in real time

### 💻 UI/UX

- Built with **TailwindCSS** and **shadcn/ui**
- Fully responsive and mobile-ready
- Light and Dark mode support

---

## 🧩 Tech Stack

| Tech               | Purpose                        |
| ------------------ | ------------------------------ |
| **Next.js**        | Fullstack React framework      |
| **Socket.io**      | Real-time communication        |
| **Prisma**         | Type-safe ORM                  |
| **Planetscale**    | Serverless MySQL database      |
| **Clerk**          | Authentication & user sessions |
| **UploadThing**    | File uploads                   |
| **TanStack Query** | Data fetching & caching        |
| **TailwindCSS**    | Utility-first CSS styling      |
| **shadcn/ui**      | Component library              |

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/discord-clone.git
cd discord-clone
```

```
npm install
```

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=''
CLERK_SECRET_KEY=''
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
DATABASE_URL=''
UPLOADTHING_TOKEN=''
NEXT_PUBLIC_SITE_URL='http://localhost:3000'
```

```
npx prisma db push
```

```
npm run dev
```
