import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail"); // Set this in login step

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://matrimony-bhavana.onrender.com/api/users/${email}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    if (email) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [email]);

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!userData) return <div className="p-6">No user data found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(userData).map(([key, value]) => (
          <div key={key}>
            <p className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
            <p className="font-medium">{value || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
