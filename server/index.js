import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";
import otpRoutes from "./routes/otp.js";


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
app.post("/api/check-user", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  res.json({ exists: !!user });
});
// Create User with custom userId
app.post("/api/users", async (req, res) => {
  try {
    const { firstName = "", lastName = "", ...rest } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).json({ message: "First and last name are required." });
    }

    // Get current date in YYYYMMDD
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const datePrefix = `${yyyy}${mm}${dd}`;

    const baseUserId = `MAT${datePrefix}`;

    // Find how many users already exist with this date
    const regex = new RegExp(`^${baseUserId}`);
    const count = await User.countDocuments({ userId: { $regex: regex } });

    // Generate next number with leading zeroes (e.g., 0001, 0002)
    const suffix = String(count + 1).padStart(4, "0");

    const finalUserId = `${baseUserId}${suffix}`;

    const newUser = new User({
      userId: finalUserId,
      firstName,
      lastName,
      ...rest,
    });

    await newUser.save();

    res.status(201).json({
      message: "User saved successfully ✅",
      userId: finalUserId,
    });
  } catch (error) {
    console.error("Error saving user:", error.message);
    res.status(500).json({ message: "Failed to save user ❌", error: error.message });
  }
});

app.use("/api", otpRoutes);
// GET user by email
app.get("/api/users/:email", async (req, res) => {
  const start = Date.now();
  try {
    const user = await User.findOne({ email: req.params.email })
      .select("-_id -__v -password")
      .lean();
    if (!user) return res.status(404).json({ message: "User not found" });
    const end = Date.now();
    console.log(`User fetch took ${end - start}ms`);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get ALL users for MatchMaking
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().select("-__v -password"); // exclude sensitive data
    res.json(users);
  } catch (err) {
    console.error("Error fetching all users:", err.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Get user by userId
app.get("/api/users/by-id/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }).select("-__v -password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
