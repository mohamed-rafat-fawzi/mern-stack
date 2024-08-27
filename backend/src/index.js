import cors from "cors";
import path from "path";
import { dirname } from "path";
import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { PORT, mongoDBURL } from "./config/config.js";



const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening to: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });



app.get("/backend/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});



app.use(express.static(path.join(__dirname, "frontend")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
