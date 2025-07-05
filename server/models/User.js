import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  profileFor: String,
  firstName: String,
  lastName: String,
  dobDay: String,
  dobMonth: String,
  dobYear: String,
  religion: String,
  community: String,
  location: String,
  email: String,
  phone: String,
  fatherName: String,
  fatherPhone: String,
  fatherProfession: String,
  motherName: String,
  motherPhone: String,
  motherProfession: String,
  brotherDetails: String,
  sisterDetails: String,
  work: String,
  education: String,
  income: String,
  diet: String,
});

export default mongoose.model("User", userSchema);
