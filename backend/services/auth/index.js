import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());

app.use("/auth", router);

app.get("/", (req, res) => {
  res.send("auth service is running");
});

app.listen(PORT, () => {
  console.log(`auth service started at ${PORT}`);
  connectDB();
});