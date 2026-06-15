# Second-Brain 🧠

A beautiful, high-performance full-stack web application designed to help you organize your digital life. 
Save links, embed videos, store tweets, and share your entire "Second Brain" with the world.

Built by [Princeag1310](https://github.com/Princeag1310).

---

## 🌟 Features

- **Rich Content Management:** Save standard links, YouTube videos, and X (Twitter) posts.
- **Native Embeds:** YouTube videos and Tweets render as fully interactive native embeds.
- **Rich Link Previews:** Generic URLs are automatically scraped to extract Open Graph metadata, rendering beautiful visual preview cards with images and descriptions.
- **Smart Auto-Categorization:** Accidentally pasted a YouTube link as a standard link? The app automatically detects the URL and upgrades it to the correct content type.
- **Masonry Grid Layout:** A seamless Pinterest-style layout that perfectly handles tall Twitter embeds without breaking the grid or causing gaps.
- **Premium Dark UI:** Designed with a stunning minimalist dark theme featuring glassmorphism, subtle micro-animations, and responsive design.
- **Shareable Brain:** Generate a secure, read-only public link to share your curated content library with others.
- **Secure Authentication:** Robust JWT-based session management and encrypted passwords.

---

## 🏗️ Project Structure

This is a monolithic repository containing both the frontend and backend applications:

```text
├── Second-Brain-Frontend/  # React, Vite, Tailwind CSS
├── Second-Brain-Backend/   # Node.js, Express, MongoDB, TypeScript
└── README.md
```

---

## 💻 Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS (with arbitrary value support and custom utilities)
- Framer Motion (for micro-animations and page transitions)
- Axios & React Router
- Lucide React (Icons)

**Backend:**
- Node.js & Express
- TypeScript
- MongoDB (Mongoose)
- Zod (Input Validation)
- JWT (Authentication)
- bcrypt (Password Hashing)
- link-preview-js (Open Graph Scraping with SSRF protection)

---

## 🔌 API Endpoints (Backend)

| Method | Route                       | Auth | Description                                         |
|--------|-----------------------------|------|-----------------------------------------------------|
| POST   | `/api/v1/signup`            | No   | Register a new user                                 |
| POST   | `/api/v1/signin`            | No   | Authenticate and return JWT token                   |
| POST   | `/api/v1/content`           | Yes  | Add content (title, link, type)                     |
| GET    | `/api/v1/content`           | Yes  | Get all content for the authenticated user          |
| DELETE | `/api/v1/content`           | Yes  | Delete a specific content item                      |
| POST   | `/api/v1/preview`           | No   | Securely scrape a URL and return Open Graph data    |
| POST   | `/api/v1/brain/share`       | Yes  | Generate or revoke your public shareable link       |
| GET    | `/api/v1/brain/:shareLink`  | No   | Fetch a user's public content via their share hash  |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB URI (Local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/Princeag1310/Second-Brain.git
cd Second-Brain
```

### 2. Backend Setup
```bash
cd Second-Brain-Backend
npm install
```

Create a `.env` file in the `Second-Brain-Backend` directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_PASSWORD=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm run dev
```
*The server will start on http://localhost:3000*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd Second-Brain-Frontend
npm install
```

Create a `.env` file in the `Second-Brain-Frontend` directory if you need to override the API URL:
```env
VITE_BACKEND_URL=http://localhost:3000
```

Start the frontend development server:
```bash
npm run dev
```
*The app will be available at http://localhost:5173*

---

## 🌍 Deployment

**Frontend:**
Optimized for deployment on [Vercel](https://vercel.com/) or Netlify. Make sure to set the `VITE_BACKEND_URL` environment variable to your deployed backend URL.

**Backend:**
Optimized for deployment on [Render](https://render.com/) or Heroku. The application uses `npm run build` to compile TypeScript to JavaScript, and `npm start` to run the compiled output. Make sure to set `MONGODB_URI` and `JWT_PASSWORD` in your hosting provider's environment settings.

---

## 📝 License
This project is licensed under the MIT License.
