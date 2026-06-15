# Brainly

A full-stack note/content management application by [Princeag1310](https://github.com/Princeag1310), featuring a modern React-Typescript-Vite frontend and a Node.js + Express + MongoDB backend. Brainly lets users securely sign up, save and tag content, and generate a shareable “Second Brain” page.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Backend (Brainly1)](#backend-brainly1)
  - [API Endpoints](#api-endpoints)
  - [Database Models](#database-models)
  - [Environment Variables](#environment-variables)
- [Frontend (Brainly)](#frontend-brainly)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 📝 User authentication and JWT-based session management
- 📄 Add, view, and delete personal content with title, link, type, and tags
- 🔗 Get a public, shareable “Second Brain” link for your best content
- 🚀 Modern, fast frontend (React, Vite, TailwindCSS)
- ☁️ Persistent backend with MongoDB Atlas
- 🧩 Modular, extensible codebase

---

## Project Structure

Brainly/ # Frontend (React, Vite, Tailwind, etc.)
Brainly1/ # Backend (Node.js/Express/MongoDB/TypeScript)
.gitignore
README.md

text

---

## Backend (Brainly1)

- Node.js + Express server written in TypeScript
- MongoDB (with Mongoose) for persistence
- JWT authentication middleware
- API logic in `/src/index.ts`
- Models in `/src/db.ts`
- Config and helpers in `/src/config.ts`, `/src/utils.ts`

### API Endpoints

| Method | Route                       | Auth   | Description                                         |
|--------|-----------------------------|--------|-----------------------------------------------------|
| POST   | `/api/v1/signup`            | No     | Register a user (username, password)                |
| POST   | `/api/v1/signin`            | No     | Log in, returns JWT                                 |
| POST   | `/api/v1/content`           | Yes    | Add content (title, link, type, [tags])             |
| GET    | `/api/v1/content`           | Yes    | Get logged-in user's content                        |
| DELETE | `/api/v1/content`           | Yes    | Delete content (by contentId)                       |
| POST   | `/api/v1/brain/share`       | Yes    | Generate / revoke your shareable “brain” link       |
| GET    | `/api/v1/brain/:shareLink`  | No     | Public view of user’s shared “brain” by share hash  |

> ⚠️ Pass your JWT as an `Authorization` header for secured routes.

### Database Models

- **User:** `{ username, password }`
- **Content:** `{ title, link, tags, type, userId }`
- **Link:** `{ hash, userId }`

### Environment Variables

- MongoDB Atlas credentials in `/src/db.ts` (hardcoded; set your cluster details for production)
- JWT secret in `/src/config.ts` (default is `"123123"`, change for security)
- Server port defaults to `3000`

---

## Frontend (Brainly)

- Built with React, TypeScript, Vite, and Tailwind CSS
- App structure includes:
  - `/src/assets`
  - `/src/components`
  - `/src/hooks`
  - `/src/icons`
  - `/src/pages` (e.g., SignIn, SignUp, Dashboard)
- Reusable UI: Button, Card, Sidebar, Input, Icons
- Connects with backend API for user/content management

---

## Getting Started

#### Prerequisites

- Node.js v16+ and npm (or yarn/pnpm)
- MongoDB Atlas cluster (or local Mongo instance)
- Git

#### Installation

1. **Clone the repo:**
    ```
    git clone https://github.com/Princeag1310/Brainly.git
    ```

2. **Install frontend dependencies:**
    ```
    cd Brainly/Brainly
    npm install
    ```

3. **Install backend dependencies:**
    ```
    cd ../Brainly1
    npm install
    ```

#### Run in Development

**Frontend:**
cd Brainly
npm run dev

text
> Defaults to http://localhost:5173

**Backend:**
cd Brainly1
npx ts-node src/index.ts

text
> Defaults to http://localhost:3000

#### Environment Setup

- Edit `src/db.ts` to configure your MongoDB connection string.
- Change JWT secret in `src/config.ts` before production use.

---

## Scripts

| Script                | Where      | What it does                   |
|-----------------------|------------|--------------------------------|
| npm run dev           | Frontend   | Start dev server (Vite)        |
| npm run build         | Frontend   | Production build               |
| npx ts-node src/index.ts | Backend | Start backend (TypeScript)     |

---

## Deployment

- Frontend: Deploy static build with [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), etc.
- Backend: Deploy on [Render](https://render.com/), [Heroku](https://heroku.com/), or your preferred Node host.

---

## Contributing

- Pull requests welcome! For major changes, open an issue for discussion first.

---

**Enjoy organizing, tagging, and sharing your knowledge—your own “Second Brain” with Brainly!**
