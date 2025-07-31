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
import Otp from "../models/Otp.js"; // add this import

router.post("/send-otp", async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  try {
    // Remove any previous OTPs for this email
    await Otp.deleteMany({ email });

    // Save new OTP
    await new Otp({ email, otp, expiresAt }).save();

    // Send email
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


// Verify OTP and return JWT token
// verify-otp route
router.post("/verify-otp", async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const inputOtp = req.body.otp.trim();

  try {
    const otpDoc = await Otp.findOne({ email });

    if (!otpDoc) {
      return res.status(400).json({ success: false, message: "OTP not found or expired" });
    }

    if (otpDoc.otp !== inputOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Delete OTP after use
    await Otp.deleteOne({ _id: otpDoc._id });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );

    res.json({ success: true, token, user });
  } catch (err) {
    console.error("OTP verification failed:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


export default router;
