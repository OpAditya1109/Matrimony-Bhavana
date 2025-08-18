import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MatchMaking = () => {
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState("matches"); // "matches", "activity", "plan"
  const navigate = useNavigate();
const [activity, setActivity] = useState({ sent: [], received: [], accepted: [] });

const handleInterest = async (receiverId) => {
  const senderId = localStorage.getItem("userId");
  const plan = localStorage.getItem("plan") || "Free"; // fallback if not set

  if (!senderId) {
    alert("Please log in first.");
    return;
  }

  try {
  await axios.post("https://matrimony-bhavana.onrender.com/api/match-interest", {
      senderId,
      receiverId,
      plan
    });

    alert("Interest sent successfully!");
  } catch (error) {
    console.error("Error sending interest:", error);
    alert(error.response?.data?.message || "Something went wrong.");
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
useEffect(() => {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  axios
    .get(`https://matrimony-bhavana.onrender.com/api/match-activity`, {
      params: { userId }
    })
    .then((res) => {
      setActivity(res.data); // ✅ this will populate sent/received/accepted tabs
    })
    .catch((err) => {
      console.error("Failed to fetch activity:", err);
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
  <div>
    <h2 className="text-2xl font-semibold mb-4 text-center">Your Activity</h2>

    {/* Received Interests */}
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-2">Requests Received</h3>
      {activity.received.length === 0 ? (
        <p className="text-gray-600">No received requests</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activity.received.map((user) => (
            <div key={user._id} className="border p-4 rounded-lg shadow bg-white">
              <p className="font-semibold">{user.firstName} {user.lastName}</p>
              <button className="mr-2 px-3 py-1 bg-green-500 text-white rounded">Accept</button>
              <button className="px-3 py-1 bg-red-500 text-white rounded">Reject</button>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Sent Interests */}
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-2">Requests Sent</h3>
      {activity.sent.length === 0 ? (
        <p className="text-gray-600">No sent requests</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activity.sent.map((user) => (
            <div key={user._id} className="border p-4 rounded-lg shadow bg-white">
              <p className="font-semibold">{user.firstName} {user.lastName}</p>
              <button className="px-3 py-1 bg-yellow-600 text-white rounded">Cancel</button>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Accepted Matches */}
    <div>
      <h3 className="text-xl font-bold mb-2">Accepted Matches</h3>
      {activity.accepted.length === 0 ? (
        <p className="text-gray-600">No accepted matches</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activity.accepted.map((user) => (
            <div key={user._id} className="border p-4 rounded-lg shadow bg-white">
              <p className="font-semibold">{user.firstName} {user.lastName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}


 {/* Plan Tab */}
{activeTab === "plan" && (
  <div className="text-center">
    <h2 className="text-2xl font-semibold mb-4">Choose a Plan</h2>
    <div className="grid grid-cols-4 gap-6 overflow-x-auto">
      
      {/* Free Plan */}
      <div className="border rounded-xl p-4 shadow min-w-[250px]">
        <h3 className="text-xl font-bold mb-2">Free</h3>
        <p>Includes 0 Matches</p>
        <p className="mt-2 text-lg font-semibold">₹0 /-</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Select</button>
      </div>

      {/* Premium Plan */}
      <div className="border rounded-xl p-4 shadow min-w-[250px]">
        <h3 className="text-xl font-bold mb-2">Premium</h3>
        <p>Includes 5 Matches</p>
        <p className="mt-2 text-lg font-semibold">₹1,500 /-</p>
   
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Upgrade</button>
      </div>

      {/* Gold Plan */}
      <div className="border rounded-xl p-4 shadow min-w-[250px]">
        <h3 className="text-xl font-bold mb-2">Gold</h3>
        <p>Includes 15 Matches</p>
        <p className="mt-2 text-lg font-semibold">₹5,000 /-</p>
     
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Upgrade</button>
      </div>

      {/* Platinum Plan */}
      <div className="border rounded-xl p-4 shadow min-w-[250px]">
        <h3 className="text-xl font-bold mb-2">Platinum</h3>
        <p>Includes 30 Matches</p>
        <p className="mt-2 text-lg font-semibold">₹15,000 /-</p>
     
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Upgrade</button>
      </div>

    </div>
  </div>
)}


    </div>
  );
};

export default MatchMaking;
