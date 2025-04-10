import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./Config/db.js";
import router from "./Routes/router.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Handles form-urlencoded data
app.use(cors()); // Enable CORS for frontend communication

// MongoDB Connection
app.use("/api", router);

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 E-Learning Platform API is Running...");
});

// Server Listening


// chat demo
const generateResponse = (userInput) => {
  const responses = {
      "hello": "Hi there! How can I help you?",
      "how are you": "I'm a bot, but I'm doing great! What about you?",
      "bye": "Goodbye! Have a great day!"
  };
  return responses[userInput.toLowerCase()] || "Sorry, I don't understand.";
};

// Chat endpoint
app.post("/api/chat", (req, res) => {
  
  const { message } = req.body;
  const reply = generateResponse(message);
  res.json({ reply });
});




const PORT = process.env.PORT || 5000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1); // Exit process on DB connection failure
  });