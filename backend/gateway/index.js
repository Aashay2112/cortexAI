import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getCurrentUser } from "./controllers/user.controller.js";
import protect from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || "http://localhost:8001";

const CHAT_SERVICE_URL =
  process.env.CHAT_SERVICE_URL || "http://localhost:8002";

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

/* ================= AUTH ================= */

app.use(
  "/api/auth",
  proxy(AUTH_SERVICE_URL, {
    proxyReqPathResolver: (req) => {
      return `/auth${req.url}`;
    },
  })
);

/* ================= CHAT ================= */

const proxyWithHeader = (serviceUrl) =>
  proxy(serviceUrl, {
    proxyReqPathResolver: (req) => {
      return req.originalUrl.replace(/^\/api/, "");
    },
  });

app.use(
  "/api/chat",protect,
  proxyWithHeader(process.env.CHAT_SERVICE_URL)
);

app.use(
  "/api/agent",protect,
  proxyWithHeader(process.env.AGENT_SERVICE_URL)
);

/* ================= CURRENT USER ================= */

app.use(
  "/api/me",
  protect,
  getCurrentUser
);

app.get("/", (req, res) => {
  res.send("gateway is running");
});

app.listen(PORT, () => {
  console.log(`gateway started at ${PORT}`);
});