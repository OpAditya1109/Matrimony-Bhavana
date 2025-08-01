import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToMatchMaking = () => {
    navigate("/match-making");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to the Main Page</h1>
      <p className="mt-2 text-gray-700">You are successfully logged in!</p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={goToProfile}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Profile
        </button>

        <button
          onClick={goToMatchMaking}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Match Making
        </button>

        {/* <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default MainPage;
