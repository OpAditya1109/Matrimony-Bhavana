import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// Root Route
app.get("/", (req, res) => {
  res.send("Matrimony Server is Running 🚀");
});

// Create User with custom userId
app.post("/api/users", async (req, res) => {
  try {
    const { firstName = "", lastName = "", ...rest } = req.body;

    // Format date as YYYYMMDD
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    // Get initials or fallback to XX
    const initials = `${(firstName[0] || "X")}${(lastName[0] || "X")}`.toUpperCase();

    // Generate final userId like: MAT20250712AY
    const userId = `MAT${yyyy}${mm}${dd}${initials}`;

    const newUser = new User({
      userId,
      firstName,
      lastName,
      ...rest,
    });

    await newUser.save();
    res.status(201).json({ message: "User saved successfully ✅", userId });
  } catch (error) {
    console.error("Error saving user:", error.message);
    res.status(500).json({ message: "Failed to save user ❌" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
