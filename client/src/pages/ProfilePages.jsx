import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (email) {
      axios
        .get(`https://matrimony-bhavana.onrender.com/api/users/${email}`)
        .then((res) => {
          const { _id, __v, createdAt, updatedAt, referralCode, ...rest } = res.data;

          // Only include referralCode if it's not "N/A"
          const filteredData = {
            ...rest,
            ...(referralCode && referralCode !== "N/A" && { referralCode })
          };

          setUserData(filteredData);
        })
        .catch((err) => {
          console.error("Error fetching user data", err);
        });
    }
  }, [email]);

  if (!userData) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Profile Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(userData).map(([key, value]) => (
          <div key={key}>
            <p className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
            <p className="text-gray-700">{value || "Not Provided"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
