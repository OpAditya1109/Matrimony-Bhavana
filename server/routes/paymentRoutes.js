// routes/paymentRoutes.js
import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();

router.post("/verify", async (req, res) => {
  const { userId, txnId } = req.body;

  if (!userId || !txnId) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }

  try {
    // Save txn ID for manual verification later
    const payment = new Payment({ userId, txnId });
    await payment.save();

    res.json({
      success: true,
      message: "Transaction submitted. Admin will verify shortly.",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({
        success: false,
        message: "This transaction ID is already submitted.",
      });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
