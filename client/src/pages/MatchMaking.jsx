import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MatchMaking = () => {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://matrimony-bhavana.onrender.com/api/users")
      .then((response) => {
        setMatches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const goToProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Find Your Match</h1>

      {matches.length === 0 ? (
        <p className="text-center text-gray-600">No matches found yet. Please try again later.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {matches.map((user) => (
            <div
              key={user._id}
              onClick={() => goToProfile(user.userId)}
              className="cursor-pointer border rounded-xl shadow hover:shadow-lg transition duration-300 p-4 bg-white"
            >
              <div className="h-40 bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-400 text-sm">
                {/* Placeholder image */}
                Photo Unavailable
              </div>
              <h2 className="text-xl font-semibold mb-1">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-700 text-sm mb-1"><strong>Date of Birth:</strong> {user.dob || "N/A"}</p>
              <p className="text-gray-700 text-sm mb-1"><strong>Caste:</strong> {user.subCaste || "N/A"}</p>
              <p className="text-gray-700 text-sm mb-1"><strong>City:</strong> {user.location || "N/A"}</p>
              <p className="text-gray-700 text-sm mb-1"><strong>Education:</strong> {user.education || "N/A"}</p>
              <p className="text-gray-700 text-sm"><strong>Profession:</strong> {user.work || "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchMaking;
