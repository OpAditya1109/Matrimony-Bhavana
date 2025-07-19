import React, { useState, useEffect } from "react";
import Logo from "../assets/Matrimony-logo-wbg.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter OTP
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Track login status

  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check localStorage for login state on mount
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const check = await axios.post(
        "https://matrimony-bhavana.onrender.com/api/check-user",
        { email }
      );

      if (check.data.exists) {
        await axios.post(
          "https://matrimony-bhavana.onrender.com/api/send-otp",
          { email }
        );
        setStep(2);
      } else {
        setError("User not registered.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://matrimony-bhavana.onrender.com/api/verify-otp",
        { email, otp }
      );

      if (res.data.success) {
        setShowLogin(false);
        localStorage.setItem("userEmail", email);
        setIsLoggedIn(true); // ✅ Set login state
        navigate("/main");
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setError("Verification failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <nav className="flex justify-between items-center px-8 py-3 shadow-md bg-white relative z-10">
        <div className="flex items-center gap-4 flex-wrap">
          <img
            src={Logo}
            alt="Bhavana Logo"
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col leading-tight">
            <div className="text-2xl font-bold text-red-500">Bhavana</div>
            <div className="text-xs text-gray-500">Matrimony.com</div>
          </div>
          <div className="text-base sm:text-lg md:text-xl text-gray-600 italic whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
            Connecting Hearts & Families
          </div>
        </div>

        <button
          onClick={isLoggedIn ? handleLogout : () => setShowLogin(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm relative">
            <button
              onClick={() => {
                setShowLogin(false);
                setStep(1);
                setEmail("");
                setOtp("");
                setError("");
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center text-red-500">
              Login to Bhavana
            </h2>

            <form onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}>
              {step === 1 ? (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter your Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </>
              )}

              {error && (
                <div className="text-red-500 text-sm mb-3">{error}</div>
              )}

              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                {step === 1 ? "Send OTP" : "Verify OTP"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
