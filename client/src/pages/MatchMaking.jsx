import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MatchMaking = () => {
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState("matches"); // "matches", "activity", "plan"
  const navigate = useNavigate();
const handleInterest = async (receiverId) => {
  const senderId = localStorage.getItem("userId");

  if (!senderId) {
    alert("Please login first.");
    return;
  }

  try {
    await axios.post("https://matrimony-bhavana.onrender.com/api/users/interested", {
      senderId,
      receiverId,
    });
    alert("Interest sent successfully!");
  } catch (error) {
    console.error("Error sending interest:", error);
    alert("Something went wrong. Try again.");
  }
};

 useEffect(() => {
  const loggedInGenderRaw = localStorage.getItem("gender"); // Get raw value
  if (!loggedInGenderRaw) {
    console.warn("No gender found in localStorage");
    return;
  }

  const loggedInGender = loggedInGenderRaw.toLowerCase(); // Use a new variable name

  axios
    .get("https://matrimony-bhavana.onrender.com/api/users", {
      params: { gender: loggedInGender },
    })
    .then((response) => {
      setMatches(response.data);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}, []);


  const goToProfile = (userId) => {
    navigate(`/UserProfile/${userId}`);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition mb-4"
      >
        ← Back
      </button>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("matches")}
          className={`px-4 py-2 rounded ${
            activeTab === "matches" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Matches
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className={`px-4 py-2 rounded ${
            activeTab === "activity" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Activity
        </button>
        <button
          onClick={() => setActiveTab("plan")}
          className={`px-4 py-2 rounded ${
            activeTab === "plan" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Plan
        </button>
      </div>

      {/* Matches Tab */}
      {activeTab === "matches" && (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">Find Your Match</h1>
          {matches.length === 0 ? (
            <p className="text-center text-gray-600">No matches found yet. Please try again later.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {matches.map((user) => (
               <div
  key={user._id}
  className="border rounded-xl shadow hover:shadow-lg transition duration-300 p-4 bg-white"
>
  <div className="h-40 bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-400 text-sm">
    Photo Unavailable
  </div>
  <h2 className="text-xl font-semibold mb-1">
    {user.firstName} {user.lastName}
  </h2>
  <p className="text-gray-700 text-sm mb-1">
    <strong>Date of Birth:</strong> {user.dob || "N/A"}
  </p>
  <p className="text-gray-700 text-sm mb-1">
    <strong>Caste:</strong> {user.subCaste || "N/A"}
  </p>
  <p className="text-gray-700 text-sm mb-1">
    <strong>City:</strong> {user.location || "N/A"}
  </p>
  <p className="text-gray-700 text-sm mb-1">
    <strong>Education:</strong> {user.education || "N/A"}
  </p>
  <p className="text-gray-700 text-sm">
    <strong>Profession:</strong> {user.work || "N/A"}
  </p>

  {/* 👉 Interested Button */}
  <button
    onClick={(e) => {
      e.stopPropagation(); // prevent navigate
      handleInterest(user.userId);
    }}
    className="mt-4 w-full bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
  >
    Interested
  </button>

  {/* 👉 View Profile */}
  <button
    onClick={() => goToProfile(user.userId)}
    className="mt-2 w-full bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
  >
    View Profile
  </button>
</div>

              ))}
            </div>
          )}
        </>
      )}

      {/* Activity Tab */}
      {activeTab === "activity" && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Your Activity</h2>
          <p>Requests Received: 0</p>
          <p>Requests Sent: 0</p>
          <p>Accepted Matches: 0</p>
          {/* You can populate real data here from backend later */}
        </div>
      )}

      {/* Plan Tab */}
      {activeTab === "plan" && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Choose a Plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-4 shadow">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p>Basic profile view access</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Select</button>
            </div>
            <div className="border rounded-xl p-4 shadow">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p>Unlimited Matches + Chat + Highlighted Profile</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Upgrade</button>
            </div>
            <div className="border rounded-xl p-4 shadow">
              <h3 className="text-xl font-bold mb-2">Gold</h3>
              <p>Priority Matching + Personal Manager</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Upgrade</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchMaking;
