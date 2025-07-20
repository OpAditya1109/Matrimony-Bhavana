import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ import useNavigate
import axios from "axios";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate(); // ✅ initialize navigate
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`https://matrimony-bhavana.onrender.com/api/users/by-id/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load user", err));
  }, [userId]);

  if (!user) return <p className="text-center mt-10">Loading user profile...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-800 space-y-6">
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        ← Back
      </button>
    <div className="p-6 max-w-5xl mx-auto text-gray-800 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        {user.firstName} {user.lastName}
      </h1>

      {/* Personal Details */}
      <section>
        <h2 className="text-xl font-semibold mb-2">🧍 Personal Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Profile For:</strong> {user.profileFor}</p>
          <p><strong>DOB:</strong> {user.dob}</p>
          <p><strong>Birth Time:</strong> {user.birthTime}</p>
          <p><strong>Birth Place:</strong> {user.birthPlace}</p>
          <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
          <p><strong>Religion:</strong> {user.religion}</p>
          <p><strong>Community:</strong> {user.community}</p>
          <p><strong>Sub Caste:</strong> {user.subCaste}</p>
          <p><strong>Gotra:</strong> {user.gotra}</p>
          <p><strong>Rashi:</strong> {user.rashi}</p>
          <p><strong>Nakshatra:</strong> {user.nakshatra}</p>
          <p><strong>Charan:</strong> {user.charan}</p>
          <p><strong>Nadi:</strong> {user.nadi}</p>
          <p><strong>HIV Test:</strong> {user.hivTest}</p>
          <p><strong>Marital Status:</strong> {user.maritalStatus}</p>
          <p><strong>Mother Tongue:</strong> {user.motherTongue}</p>
          <p><strong>Family Status:</strong> {user.familyStatus}</p>
          <p><strong>Diet:</strong> {user.diet}</p>
          <p><strong>Physically Challenged:</strong> {user.physicallyChallenged}</p>
          <p><strong>Height:</strong> {user.height}</p>
          <p><strong>Weight:</strong> {user.weight}</p>
          <p><strong>Body Type:</strong> {user.bodyType}</p>
          <p><strong>Complexion:</strong> {user.complexion}</p>
        </div>
      </section>

      {/* Location Info */}
      <section>
        <h2 className="text-xl font-semibold mb-2">📍 Location Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Country:</strong> {user.country}</p>
          <p><strong>State:</strong> {user.state}</p>
          <p><strong>City/Location:</strong> {user.location}</p>
          <p><strong>Permanent Address:</strong> {user.address}</p>
          <p><strong>Present Address:</strong> {user.presentAddress}</p>
        </div>
      </section>

      {/* Career */}
      <section>
        <h2 className="text-xl font-semibold mb-2">💼 Career & Education</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Profession:</strong> {user.work}</p>
          <p><strong>Education:</strong> {user.education}</p>
          <p><strong>Income:</strong> {user.income}</p>
        </div>
      </section>

      {/* Family Info */}
      <section>
        <h2 className="text-xl font-semibold mb-2">👪 Family Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Father's Name:</strong> {user.fatherName}</p>
          <p><strong>Father's Phone:</strong> {user.fatherPhone}</p>
          <p><strong>Father's Profession:</strong> {user.fatherProfession}</p>
          <p><strong>Mother's Name:</strong> {user.motherName}</p>
          <p><strong>Mother's Phone:</strong> {user.motherPhone}</p>
          <p><strong>Mother's Profession:</strong> {user.motherProfession}</p>
          <p><strong>Brother Details:</strong> {user.brotherDetails}</p>
          <p><strong>Sister Details:</strong> {user.sisterDetails}</p>
        </div>
      </section>

      {/* Contact Info */}
      <section>
        <h2 className="text-xl font-semibold mb-2">📞 Contact Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
      </section>

      {/* Referral */}
      <section>
        <h2 className="text-xl font-semibold mb-2">🎁 Referral Info</h2>
        <p><strong>Referral Code:</strong> {user.referralCode || "N/A"}</p>
      </section>
    </div>
    </div>
  );
};

export default UserProfile;
