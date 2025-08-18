import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";
import otpRoutes from "./routes/otp.js";
import MatchInterest from "./models/MatchInterest.js"

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
      success: true,
      message: "User saved successfully ✅",
      userId: finalUserId,
    });
  } catch (err) {
    // Duplicate key error handler
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists ❌`
      });
    }

    console.error("Error saving user:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to save user ❌",
      error: err.message,
    });
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
  let { gender, userId } = req.query; // add userId to exclude self

  try {
    let filter = {};
    if (gender) {
      gender = gender.toLowerCase();

      // Correct comparison using lowercase
      const oppositeGender = gender === "male" ? "Female" : "Male";
      filter.gender = oppositeGender;
    }

    // ✅ Exclude current user if userId is provided
    if (userId) {
      filter.userId = { $ne: userId };
    }

    const users = await User.find(filter).select("-__v -password");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
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

app.post("/api/match-interest", async (req, res) => {
  const { senderId, receiverId, plan } = req.body;

  if (!senderId || !receiverId) {
    return res.status(400).json({ message: "Missing user IDs" });
  }

  try {
    // Optional: prevent duplicate interest
    const alreadyExists = await MatchInterest.findOne({ senderId, receiverId });
    if (alreadyExists) {
      return res.status(400).json({ message: "Already expressed interest" });
    }

    const newInterest = new MatchInterest({ senderId, receiverId, plan });
    await newInterest.save();

    res.status(201).json({ message: "Interest saved" });
  } catch (err) {
    console.error("Interest error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/match-activity", async (req, res) => {
  const { userId } = req.query;

  try {
    // Fetch all match records related to the user
    const sent = await MatchInterest.find({ senderId: userId });
    const received = await MatchInterest.find({ receiverId: userId });
    const accepted = await MatchInterest.find({
      status: "accepted",
      $or: [{ senderId: userId }, { receiverId: userId }],
    });

    // Reusable function to map and enrich match entries
    const enrichMatches = async (matches) => {
      return Promise.all(
        matches.map(async (match) => {
          const oppositeUserId =
            match.senderId === userId ? match.receiverId : match.senderId;
          const user = await User.findOne({ userId: oppositeUserId }).select(
            "-password -__v"
          );

          return {
            user,                    // full user details (excluding password)
            matchInfo: {
              plan: match.plan,
              status: match.status,
              interestedAt: match.interestedAt,
            },
          };
        })
      );
    };

    const sentUsers = await enrichMatches(sent);
    const receivedUsers = await enrichMatches(received);
    const acceptedUsers = await enrichMatches(accepted);

    res.json({
      sent: sentUsers,
      received: receivedUsers,
      accepted: acceptedUsers,
    });
  } catch (error) {
    console.error("Error fetching match activity:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
