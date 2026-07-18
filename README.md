# Admin Panel Session Storage

> ## 🎥 Project Explanation Video
>
> **Explain Video:**(https://drive.google.com/file/d/111HpZt1HHrmZXpFYlk0ZIRNFgV_EtvlI/view?usp=sharing)

---

# 📌 Project Overview

The **Admin Panel Management System** is a Node.js and Express.js web application that allows administrators to register, log in, manage their profiles, and perform CRUD operations on admin accounts.

The application follows the MVC (Model-View-Controller) architecture and uses MongoDB as the database.

---

# ✨ Features

- 🔐 Admin Authentication
  - Signup
  - Login
  - Logout

- 👤 Profile Management
  - Edit Profile
  - Update Profile Image

- 👥 Admin Management
  - Add Admin
  - View Admins
  - Edit Admin
  - Delete Admin

- 🔒 Password Encryption using Bcrypt

- 🛡 Authentication using Passport.js

- 📂 Image Upload using Multer

- 🍪 Session & Cookie Management

---

# 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- Passport.js
- Passport Local
- Express Session
- Cookie Parser
- Multer
- Bcrypt
- Nodemailer

---

# 📁 Project Structure

```
Admin-panel/
│
├── config/
│   ├── auth.js
│   ├── db.js
│   └── passport.js
│
├── controller/
│   └── adminController.js
│
├── models/
│   └── adminModel.js
│
├── public/
│
├── routes/
│   └── adminRoutes.js
│
├── views/
│   ├── login.ejs
│   ├── signup.ejs
│   ├── dashboard.ejs
│   ├── add-admin.ejs
│   ├── edit-admin.ejs
│   ├── edit-profile.ejs
│   ├── view-admin.ejs
│   ├── header.ejs
│   └── footer.ejs
│
├── app.js
├── package.json
└── README.md
```

---
# 📦 Dependencies

- express
- mongoose
- ejs
- passport
- passport-local
- express-session
- cookie-parser
- bcrypt
- multer
- nodemailer
- nodemon

---

# 🚀 Main Modules

### Authentication

- Signup
- Login
- Logout

### Dashboard

- Secure dashboard after login

### Admin Management

- Add new admin
- View all admins
- Edit admin
- Delete admin

### Profile

- Edit profile information
- Update profile image

---

# 🔐 Security

- Password hashing using **Bcrypt**
- Session authentication
- Passport Local Strategy
- Protected routes

---

# 📷 Screens

- Login Page
- Signup Page
- Dashboard
- Add Admin
- View Admin
- Edit Admin
- Edit Profile

---
