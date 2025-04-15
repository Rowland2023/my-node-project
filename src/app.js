const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoute"); // Make sure the path is correct

app.use(express.json());
app.use("/employees", userRoutes); // This ensures the route exists

module.exports = app;
