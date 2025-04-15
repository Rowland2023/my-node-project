const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
// Middleware setup
app.use(express.json());
app.use(require("cors")());
app.use(require("morgan")("dev"));

// Import Routes
const userRoutes = require("./src/routes/userRoute");
app.use("/api/users", userRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// This file is:
//   It’s the brain of your backend, ensuring requests are properly routed. 
// ✔ It connects middleware, routes, and configurations together. 
// ✔ It allows scalability, making it easy to add more features like authentication