import { useState } from "react";
import statesWithCities from "../data/Indian_Cities_In_States.json";
import indianCities from "../data/cities-name-list.json";

const StartFormModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpStatus, setOtpStatus] = useState("");

  const [formData, setFormData] = useState({
    profileFor: "",
    firstName: "",
    lastName: "",
    dob: "",
    birthTime: "",
    birthPlace: "",
    bloodGroup: "",
    religion: "",
    community: "",
    subCaste: "",
    gotra: "",
    rashi: "",
    nakshatra: "",
    charan: "",
    nadi: "",
    hivTest: "",
    maritalStatus: "",
    motherTongue: "",
    familyStatus: "",
    diet: "",
    physicallyChallenged: "",
    height: "",
    weight: "",
    bodyType: "",
    complexion: "",
    country: "",
    state: "",
    location: "",
    address: "",
    presentAddress: "",
    email: "",
    phone: "",
    fatherName: "",
    fatherPhone: "",
    fatherProfession: "",
    motherName: "",
    motherPhone: "",
    motherProfession: "",
    brotherDetails: "",
    sisterDetails: "",
    work: "",
    education: "",
    income: "",
    referralCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const phoneFields = ["phone", "fatherPhone", "motherPhone"];
    if (phoneFields.includes(name) && !/^\d{0,10}$/.test(value)) return;

    const nameFields = ["firstName", "lastName", "fatherName", "motherName"];
    if (nameFields.includes(name) && !/^[A-Za-z\s]*$/.test(value)) return;

    setFormData({
      ...formData,
      [name]: value,
      ...(name === "state" ? { location: "" } : {}),
    });
  };

  const sendOtp = async () => {
    try {
      const res = await fetch("https://matrimony-bhavana.onrender.com/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setOtpStatus("OTP sent to your email.");
      } else {
        setOtpStatus(data.message || "Failed to send OTP");
      }
    } catch (error) {
      setOtpStatus("Network error while sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch("https://matrimony-bhavana.onrender.com/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpVerified(true);
        setOtpStatus("OTP verified successfully.");
      } else {
        setOtpStatus("Invalid OTP");
      }
    } catch (error) {
      setOtpStatus("Error verifying OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) return alert("Please verify your email first");
    if (!/^\d{10}$/.test(formData.phone)) return alert("Invalid phone number");

    try {
      const res = await fetch("https://matrimony-bhavana.onrender.com/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowThankYou(true);
        setTimeout(() => {
          setShowThankYou(false);
          onClose();
        }, 3000);
      }
    } catch (err) {
      console.error("Submission error", err);
    }
  };

  if (!isOpen) return null;

  const allFields = Object.keys(formData);
  const nonRequiredFields = [
    "fatherName", "fatherPhone", "fatherProfession",
    "motherName", "motherPhone", "motherProfession",
    "brotherDetails", "sisterDetails", "hivTest", "referralCode"
  ];

  const selectOptions = {
    // sample; reuse your original selectOptions block
    profileFor: ["Self", "Son", "Daughter"],
    state: Object.keys(statesWithCities),
    location: formData.state ? statesWithCities[formData.state] || [] : [],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg text-black overflow-y-auto max-h-[90vh]">
        <div className="flex items-center mb-4">
          {step > 1 && !showThankYou && (
            <button onClick={() => setStep(step - 1)} className="mr-4 text-xl">&larr;</button>
          )}
          <h2 className="text-xl font-bold">
            {showThankYou ? "Thank You!" : `Step ${step}`}
          </h2>
        </div>

        {showThankYou ? (
          <div className="text-center p-4">
            <p className="text-green-600 mb-2 font-semibold">
              Thank you! We will contact you once your account is verified.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {allFields.map((fieldName) => {
              const label = fieldName.replace(/([A-Z])/g, " $1");
              const isRequired = !nonRequiredFields.includes(fieldName);

              return (
                <div key={fieldName}>
                  <label className="capitalize">
                    {label} {isRequired && <span className="text-red-500">*</span>}
                  </label>

                  {fieldName === "email" ? (
                    <>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 rounded w-full mb-2"
                        placeholder="Enter Email"
                      />
                      {!otpVerified && (
                        <div className="flex gap-2 items-center">
                          <button
                            type="button"
                            onClick={sendOtp}
                            className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
                          >Send OTP</button>
                          {otpSent && (
                            <>
                              <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="border p-1 rounded w-28"
                                placeholder="Enter OTP"
                              />
                              <button
                                type="button"
                                onClick={verifyOtp}
                                className="text-sm px-3 py-1 bg-green-500 text-white rounded"
                              >Verify</button>
                            </>
                          )}
                        </div>
                      )}
                      {otpStatus && (
                        <p className={`text-sm mt-1 ${otpVerified ? "text-green-600" : "text-red-500"}`}>
                          {otpStatus}
                        </p>
                      )}
                    </>
                  ) : (
                    <input
                      name={fieldName}
                      value={formData[fieldName]}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                      placeholder={`Enter ${label}`}
                    />
                  )}
                </div>
              );
            })}

            <div className="flex justify-between">
              <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">Submit</button>
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default StartFormModal;
