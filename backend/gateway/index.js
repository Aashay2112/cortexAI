import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || "http://localhost:8001";

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
  })
);

app.use(cookieParser());

app.use(
  "/auth",
  proxy(AUTH_SERVICE_URL, {
    proxyReqPathResolver: (req) => {
      return `/auth${req.url}`;
    }
  })
);

app.get("/", (req, res) => {
  res.send("gateway is running");
});

app.listen(PORT, () => {
  console.log(`gateway started at ${PORT}`);
});