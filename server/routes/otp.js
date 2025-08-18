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

// Send OTP route
router.post("/send-otp", async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Valid for 5 mins

  try {
    // Optional: Prevent spamming OTP requests
    const existingOtp = await Otp.findOne({ email });
    if (existingOtp && existingOtp.expiresAt > new Date(Date.now() + 4 * 60 * 1000)) {
      return res.status(429).json({ success: false, message: "Please wait before requesting another OTP" });
    }

    await Otp.deleteMany({ email }); // remove existing OTPs
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

// ✅ Verify OTP (only verify, don't create user)
router.post("/verify-otp-register", async (req, res) => {
  try {
   const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "OTP not found" });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP valid → just return success
    return res.json({ success: true, message: "OTP verified successfully" });

  } catch (err) {
    console.error("Error verifying OTP for register:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.post("/verify-otp-login", async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const inputOtp = req.body.otp?.trim();

  if (!email || !inputOtp) {
    return res.status(400).json({ success: false, message: "Email and OTP are required" });
  }

  try {
    const otpDoc = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!otpDoc) {
      return res.status(400).json({ success: false, message: "OTP not found or expired" });
    }

    if (otpDoc.otp !== inputOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // ✅ OTP valid – delete OTP entry
    await Otp.deleteOne({ _id: otpDoc._id });

    // ✅ Find existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Create token
    const token = jwt.sign(
      { email, userId: user.userId },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "15m" }
    );

    res.json({
      success: true,
      token,
      user: {
        userId: user.userId,
        gender: user.gender,
        email: user.email,
        plan: user.plan,
      },
    });
  } catch (err) {
    console.error("Login OTP verification failed:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




export default router;
