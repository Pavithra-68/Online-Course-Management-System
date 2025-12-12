const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env
dotenv.config();

// Create express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/enroll", require("./routes/enrollmentRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/certificate", require("./routes/certificateRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Default route
app.get("/", (req, res) => {
  res.send("Online Course Management System Backend Running");
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
