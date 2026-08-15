const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const connectDB = require("./src/config/database");
const healthRoutes = require("./src/routes/health.routes");
const authRoutes = require("./src/routes/auth.routes");
const bookRoutes = require("./src/routes/book.routes");
const borrowingRoutes = require("./src/routes/borrowing.routes");
const userRoutes = require("./src/routes/user.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const errorHandler = require("./src/middleware/error.middleware");


const app = express();
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrowings", borrowingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.use(errorHandler);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Library Management API is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});