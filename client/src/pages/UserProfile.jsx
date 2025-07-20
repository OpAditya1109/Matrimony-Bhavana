import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`https://matrimony-bhavana.onrender.com/api/users/by-id/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to load user", err));
  }, [userId]);

  if (!user) {
    return <p className="text-center mt-10">Loading user profile...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{user.firstName} {user.lastName}</h1>
      <p><strong>Date of Birth:</strong> {user.dob}</p>
      <p><strong>Caste:</strong> {user.subCaste}</p>
      <p><strong>Location:</strong> {user.location}</p>
      <p><strong>Education:</strong> {user.education}</p>
      <p><strong>Profession:</strong> {user.work}</p>
      {/* Add more details if available */}
    </div>
  );
};

export default UserProfile;
