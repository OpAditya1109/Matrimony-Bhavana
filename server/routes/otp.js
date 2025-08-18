// routes/auth.js
import express from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Otp from "../models/Otp.js";

dotenv.config();
const router = express.Router();

// Gmail transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

/**
 * ---------------------
 * Send OTP (common)
 * ---------------------
 */
router.post("/send-otp", async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

  try {
    await Otp.deleteMany({ email });
    await new Otp({ email, otp, expiresAt }).save();

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your OTP for Bhavana Matrimony",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

/**
 * ---------------------
 * Verify OTP - Register
 * ---------------------
 */
router.post("/verify-otp/register", async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const inputOtp = req.body.otp?.trim();
  const gender = req.body.gender;

  if (!email || !inputOtp || !gender) {
    return res.status(400).json({ success: false, message: "Email, OTP & Gender are required" });
  }

  try {
    const otpDoc = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!otpDoc || otpDoc.otp !== inputOtp) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    await Otp.deleteOne({ _id: otpDoc._id });

    // check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "User already exists. Please login." });
    }

    // create new user
    user = new User({
      email,
      gender,
      plan: "free", // default plan
    });
    await user.save();

    const token = jwt.sign(
      { email, userId: user.userId },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "15m" }
    );

    res.json({
      success: true,
      token,
      user: { userId: user.userId, gender: user.gender, email: user.email },
    });
  } catch (err) {
    console.error("Register OTP verification failed:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * ---------------------
 * Verify OTP - Login
 * ---------------------
 */
router.post("/verify-otp/login", async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const inputOtp = req.body.otp?.trim();

  if (!email || !inputOtp) {
    return res.status(400).json({ success: false, message: "Email and OTP are required" });
  }

  try {
    const otpDoc = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!otpDoc || otpDoc.otp !== inputOtp) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    await Otp.deleteOne({ _id: otpDoc._id });

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not registered. Please sign up." });
    }

    const token = jwt.sign(
      { email, userId: user.userId },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "15m" }
    );

    res.json({
      success: true,
      token,
      user: { userId: user.userId, gender: user.gender, email: user.email },
    });
  } catch (err) {
    console.error("Login OTP verification failed:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
