import express from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js"; // adjust path as per your structure

dotenv.config();
const router = express.Router();

const otps = {}; // Temporarily store OTPs in memory (in-memory store)

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps[email] = otp;

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your OTP for Bhavana Matrimony",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("Email failed:", err);
    res.status(500).json({ success: false, message: "Email failed to send" });
  }
});

// Verify OTP and return JWT token
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!otps[email] || otps[email] !== otp) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  delete otps[email]; // ✅ Remove OTP after use

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // ✅ Generate JWT token
  const token = jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "1d" }
  );

  res.json({ success: true, token });
});

export default router;
