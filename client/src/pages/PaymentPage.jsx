import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PaymentPage() {
  const location = useLocation();
  const plan = location.state?.plan; // get plan from navigation
  const [txnId, setTxnId] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins countdown

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSubmit = async () => {
    if (!txnId) {
      setMessage("Please enter transaction ID");
      return;
    }

    try {
      const res = await axios.post("https://matrimony-bhavana.onrender.com/api/payments/verify", {
        userId: localStorage.getItem("userId"),
        txnId,
        plan: plan.name,
        amount: plan.price.replace("₹", "").replace(" /-", ""), // numeric value
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error verifying payment");
    }
  };

  if (!plan) {
    return <p className="text-center mt-10">No plan selected. Please go back and choose a plan.</p>;
  }

  if (timeLeft <= 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-600">Payment Expired</h2>
        <p className="mt-4">Please try again.</p>
      </div>
    );
  }

  // Dynamic UPI link
// Dynamic UPI link using selected plan
const amount = plan.price.replace(/[^\d.]/g, ""); // removes ₹, commas, /-, etc.

// Dynamic UPI link
const upiLink = `upi://pay?pa=9270096633@okbizaxis&pn=${encodeURIComponent(
  "BhavanaMatrimony"
)}&am=${amount}&cu=INR&tn=${encodeURIComponent(
  plan.name
)}&tr=ORD${Date.now()}`;

  return (
    <div className="flex flex-col items-center py-10 min-h-screen">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <p className="mt-2 text-gray-600">Time Remaining: {formatTime(timeLeft)}</p>

      {/* Show selected plan */}
      <div className="mt-6 border-2 border-gray-300 rounded-xl p-4 w-80 text-center">
        <h3 className="text-lg font-semibold">{plan.name}</h3>
        <p className="mt-2 text-xl font-bold text-green-600">{plan.price}</p>
      </div>

      {/* UPI Payment Button */}
      <a
        href={upiLink}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
      >
        Pay with UPI
      </a>

      {/* Transaction ID input */}
      <input
        type="text"
        placeholder="Enter Transaction ID"
        className="mt-6 border rounded-lg p-2 w-64"
        value={txnId}
        onChange={(e) => setTxnId(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        Submit Payment
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}

export default PaymentPage;
