🚀 README.md – Node.js Authentication & Role-Based Access API
Project Overview
This project is a Node.js REST API with JWT authentication, role-based access, and MySQL database integration. It allows users to register, log in, view profiles, and manage employees, enforcing access restrictions based on user roles (admin vs. user).

📌 Features Implemented
1️⃣ User Authentication (JWT)

Users can register and log in.

JWT tokens are generated and validated.

Protected endpoints require authentication.

2️⃣ Role-Based Access Control

Users are assigned roles (admin, user).

Admins can create, update, delete employees.

Regular users can only view employees.

3️⃣ MySQL Database Integration

Stores user credentials, roles, and employees.

Queries optimized for performance.

4️⃣ Secure API Endpoints

POST /api/auth/register → Register new users.

POST /api/auth/login → Authenticate users & issue tokens.

GET /api/auth/profile → Get user details (Requires token).

GET /api/users/employees → Fetch paginated employee data (Requires token).

Admin-only: POST, PUT, DELETE /api/users/employees.

5️⃣ Frontend Integration

Simple HTML page fetches API data via JavaScript fetch().

Displays formatted profile data in the browser.

🛠 Technologies Used
✅ Node.js ✅ Express.js ✅ MySQL ✅ JWT (JSON Web Token) ✅ bcryptjs (Password Hashing) ✅ Postman (API Testing) ✅ HTML/CSS (Frontend)

🚀 How to Run the Project
1️⃣ Install Dependencies
sh
npm install
2️⃣ Set Up MySQL Database
Run SQL commands:

sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
3️⃣ Configure .env File
env
PORT=5000
JWT_SECRET=your_secure_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=mydb
4️⃣ Start the Server
sh
npm start
🔎 Testing API in Postman
✅ Register a user → POST /api/auth/register ✅ Login a user → POST /api/auth/login (Copy Token) ✅ Access protected route → GET /api/auth/profile (Use Token) ✅ Fetch employees → GET /api/users/employees ✅ Admin-only actions → POST, PUT, DELETE /api/users/employees

📌 Future Enhancements
🔹 Implement refresh tokens for better session management. 🔹 Improve frontend UI with React or Vue.js. 🔹 Add OAuth support (Google, Facebook login).
