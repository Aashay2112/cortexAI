import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("agent service is running");
});

app.listen(PORT, () => {
  console.log(`agent service started at ${PORT}`);
  connectDB();
});