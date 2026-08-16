const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const { connectDB } = require("./config/db");
const errorHandler = require("./middleware/error.middleware");

dotenv.config();

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = (
  process.env.CORS_ORIGIN || "http://localhost:5173,http://localhost:8080"
)
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV !== "production"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." },
});

app.use("/api/auth/login", formLimiter);
app.use("/api/auth/signup", formLimiter);
app.use("/api/inquiries", formLimiter);
app.use("/api/newsletter", formLimiter);
app.use("/api/subscribers", formLimiter);

app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "alikohub-foundation-backend",
    health: "/api/health",
    hint: "This is an API server. Try GET /api/health",
  });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "alikohub-foundation-backend" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/inquiries", require("./routes/inquiry"));
app.use("/api/newsletter", require("./routes/newsletter"));
app.use("/api/subscribers", require("./routes/subscribers"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/public", require("./routes/publicCms"));

app.use(errorHandler);

const start = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env");
    }
    if (
      !process.env.DATABASE_URL &&
      !(process.env.DB_NAME && process.env.DB_USER) &&
      !(process.env.DB_DIALECT === "mysql" && process.env.DB_NAME)
    ) {
      throw new Error("DATABASE_URL or DB_NAME/DB_USER missing in .env");
    }

    await connectDB();

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

start();
