import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true }, // <-- Custom ID like MAT20250712AY

  // Personal Details
  profileFor: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: String, required: true },
  age:{type: String, required: true},
  gender:{type: String, required: true},
  birthTime: { type: String },
  birthPlace: { type: String },
  bloodGroup: { type: String },
  religion: { type: String, required: true },
  community: { type: String, required: true },
  subCaste: { type: String },
  gotra: { type: String },
  rashi: { type: String },
  nakshatra: { type: String },
  charan: { type: String },
  nadi: { type: String },
  hivTest: { type: String },
  maritalStatus: { type: String },
  motherTongue: { type: String },
  familyStatus: { type: String },
  diet: { type: String, required: true },
  physicallyChallenged: { type: String },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  bodyType: { type: String },
  complexion: { type: String },

  // Location Info
  country: { type: String },
  state: { type: String },
  location: { type: String, required: true },
  address: { type: String, required: true },
  presentAddress: { type: String },

  // Contact Info
  email: { type: String, required: true },
  phone: { type: String, required: true },

  // Family Info
fatherName: { type: String, required: false },
fatherPhone: { type: String, required: false },
fatherProfession: { type: String, required: false },
motherName: { type: String, required: false },
motherPhone: { type: String, required: false },
motherProfession: { type: String, required: false },

  brotherDetails: { type: String },
  sisterDetails: { type: String },

  // Career
  work: { type: String, required: true },
  education: { type: String, required: true },
  income: { type: String, required: true },

  referralCode: { type: String },
}, { timestamps: true });

export default mongoose.model("User", userSchema);