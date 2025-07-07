import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  profileFor: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: String, required: true },
  religion: { type: String, required: true },
  community: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  fatherName: { type: String, required: true },
  fatherPhone: { type: String, required: true },
  fatherProfession: { type: String, required: true },
  motherName: { type: String, required: true },
  motherPhone: { type: String, required: true },
  motherProfession: { type: String, required: true },
  brotherDetails: { type: String },
  sisterDetails: { type: String },
  work: { type: String, required: true },
  education: { type: String, required: true },
  income: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  diet: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
