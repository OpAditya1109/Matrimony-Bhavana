// models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  txnId: { type: String, required: true, unique: true },
  status: { type: String, default: "pending" }, // pending, verified, rejected
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);
