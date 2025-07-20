import mongoose from "mongoose";

const MatchInterestSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  plan: {
    type: String,
    enum: ["Free", "Premium", "Gold"],
    default: "Free"
  },
  status: { type: String, default: "pending" },
  interestedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("MatchInterest", MatchInterestSchema);
