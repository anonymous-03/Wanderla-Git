# 🏨 Wanderla - Hotel Booking App

A full-featured **hotel booking platform** built using **Node.js**, **Express**, and **EJS** where users can:

- 📌 List their own properties (hotels/resorts)
- 🛏 Book stays at other properties
- 📝 Add reviews and comments
- 🖼 Upload images and manage listings
- 🔐 Handle user authentication & sessions

---

## 📁 Project Structure

/

├── controllers/ # Route handler logic

├── models/ # DB schemas/models

├── routes/ # Express routes

├── views/ # EJS templates

├── public/ # Static files (CSS, images)

├── Utils/ # Utility functions

├── cloudConfig.js # Cloud image/storage setup

├── index.js # App entry point

├── middleware.js # Auth/middleware

├── schema.js # Validation schemas

└── package.json


---

## 🚀 Features

- User authentication (register/login)
- Host dashboard for listing & managing properties
- Booking system with availability checks
- Property reviews and ratings
- Cloud image uploads (via Cloudinary or similar)
- Responsive EJS templates

---

## 🛠 Built With

| Tool       | Purpose                      |
|------------|------------------------------|
| Node.js    | Server-side runtime          |
| Express    | Web framework                |
| MongoDB    | Database (via Mongoose)      |
| EJS        | Templating engine            |
| Multer     | File uploads                 |
| Cloudinary | Image hosting (via `cloudConfig.js`) |
| Joi        | Validation schemas           |
| bcrypt     | Password hashing             |

---

## ⚙️ Setup Instructions

1. **Clone the repo**  
```bash
git clone https://github.com/anonymous-03/Wanderla-Git.git
cd Wanderla-Git
npm install

PORT=3000
DB_URL=your_mongodb_url
CLOUD_NAME=...
CLOUD_KEY=...
CLOUD_SECRET=...
SESSION_SECRET=your_secret_key

npm run dev
```
📬 Authors

@anonymous-03 (Nikhil Raj)
@mskAtif (Atif)
