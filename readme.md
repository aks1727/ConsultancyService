# 🌟 Consultancy Service Web Application

A modern, responsive **Consultancy Service Platform** built with a **full-stack architecture**:

* **Frontend** with **React + Vite**
* **Backend** with **Node.js + Express**

This platform provides a seamless experience for businesses, mentors, and learners, featuring admin management, blogs, FAQs, chats, and more.

---

## 📌 Features

* **User Features:**

  * Browse consultancy services with an elegant UI.
  * Access **blogs, FAQs, and testimonials**.
  * Career guidance with illustrations and images.
  * Secure login & password management.
  * Real-time chat & messaging features.

* **Admin Features:**

  * Admin Dashboard with easy navigation.
  * Accept or reject mentor requests.
  * Manage blogs, FAQs, and consultancy content.
  * Authentication & authorization for admins.

* **Other Highlights:**

  * REST API backend with clean architecture.
  * MongoDB models for users, mentors, chats, and messages.
  * Alerts & modals for smooth frontend interactions.
  * Optimized deployment on **Vercel**.

---

## 🛠 Tech Stack

* **Frontend:** React, Vite, Tailwind CSS / CSS Modules
* **Backend:** Node.js, Express.js, MongoDB
* **Deployment:** Vercel (both frontend & backend)
* **Utilities:** Cloudinary (media upload), Nodemailer (emails)
* **Linting:** ESLint

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* **Node.js** (v16 or above)
* **npm** or **yarn**
* MongoDB (local or cloud e.g., MongoDB Atlas)

---

### ⚡ Running Locally

#### 1. Clone the repository

```bash
git clone [https://github.com/aks1727/ConsultancyService.git](https://github.com/aks1727/ConsultancyService.git)
cd ConsultancyService
```

#### 2. Setup Backend (Server)

```bash
cd server
npm install

# Create a .env file with the following:
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url
EMAIL_USER=your_email
EMAIL_PASS=your_password

# Run server
npm run dev
```

Backend will run at **[http://localhost:5000](http://localhost:5000)**

#### 3. Setup Frontend (Client)

```bash
cd ../client
npm install
npm run dev
```

Frontend will run at **[http://localhost:5173](http://localhost:5173)**

---

## 📂 Project Structure

```
consultancyService/
├── client/                  # Frontend source code
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── Components/
│       │   ├── BlogHighlights.jsx
│       │   ├── FAQ.jsx
│       │   ├── Testimonials.jsx
│       │   ├── admin/
│       │   └── alerts/
│       └── assets/
│
├── server/                  # Backend source code
│   ├── src/
│   │   ├── app.js           # Express app config
│   │   ├── index.js         # Entry point
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middlewares/     # Middlewares (auth, error handling)
│   │   └── utils/           # Helpers (cloudinary, mail, etc.)
│   ├── package.json
│   └── vercel.json          # Deployment config
│
└── readme.md                # Root readme (this file)
```

---

## 🌍 Deployment

The project is configured for **Vercel Deployment**.

* **Frontend:**

  * Connect `client/` folder to Vercel.
  * Build command: `npm run build`
  * Output directory: `dist`

* **Backend:**

  * Connect `server/` folder to Vercel.
  * Add environment variables in Vercel dashboard.
  * Build command: `npm install && npm run build`
  * Start command: `npm start`

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo.
2. Create your branch (`git checkout -b feature/YourFeature`).
3. Commit changes (`git commit -m 'Add feature'`).
4. Push branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the **MIT License**.

---

💡 *Built with ❤️ to connect businesses, mentors, and learners for growth.*
