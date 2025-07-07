import { useState } from "react";

const StartFormModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);

  const [formData, setFormData] = useState({
    profileFor: "",
    firstName: "",
    lastName: "",
    dob: "",
    religion: "",
    community: "",
    location: "",
    address: "",
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
    height: "",
    weight: "",
    diet: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const nameRegex = /^[a-zA-Z\s.'-]*$/;
    const numberRegex = /^[0-9]*$/;

    const nameFields = [
      "firstName",
      "lastName",
      "fatherName",
      "motherName",
      "fatherProfession",
      "motherProfession",
      "community",
      "work",
      "education",
    ];

    const numericFields = ["phone", "fatherPhone", "motherPhone", "height", "weight"];

    if (nameFields.includes(name)) {
      if (value === "" || nameRegex.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (numericFields.includes(name)) {
      if (value === "" || numberRegex.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://matrimony-bhavana.onrender.com/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("User saved successfully");
        setShowThankYou(true);
        setTimeout(() => {
          setShowThankYou(false);
          onClose();
        }, 3000);
      } else {
        console.error("Failed to save user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.profileFor !== "";
    }
    if (step === 2) {
      return (
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.dob.trim() !== ""
      );
    }
    if (step === 3) {
      return (
        formData.religion.trim() !== "" &&
        formData.community.trim() !== "" &&
        formData.location.trim() !== ""
      );
    }
    if (step === 4) {
      return (
        formData.email.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.fatherName.trim() !== "" &&
        formData.fatherPhone.trim() !== "" &&
        formData.fatherProfession.trim() !== "" &&
        formData.motherName.trim() !== "" &&
        formData.motherPhone.trim() !== "" &&
        formData.motherProfession.trim() !== "" &&
        formData.work.trim() !== "" &&
        formData.education.trim() !== "" &&
        formData.income.trim() !== "" &&
        formData.height.trim() !== "" &&
        formData.weight.trim() !== "" &&
        formData.diet.trim() !== "" &&
        formData.address.trim() !== ""
      );
    }
    return false;
  };

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Kolkata",
    "Chennai",
    "Jaipur",
    "Lucknow",
    "Other",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg text-black overflow-y-auto max-h-[90vh]">
        <div className="flex items-center mb-4">
          {step > 1 && !showThankYou && (
            <button onClick={prevStep} className="mr-4 text-xl">&larr;</button>
          )}
          <h2 className="text-xl font-bold">
            {showThankYou
              ? "Thank You!"
              : step === 1
              ? "This Profile is for"
              : step === 2
              ? "Your Name & Date of Birth"
              : step === 3
              ? "Religion, Community & Location"
              : "Contact & Family Details"}
          </h2>
        </div>

        {showThankYou ? (
          <div className="text-center p-4">
            <p className="text-green-600 mb-2 font-semibold">
              Thank you! We will contact you once your account is verified by us.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <div className="flex flex-wrap gap-3">
                {[
                  "Myself",
                  "My Son",
                  "My Daughter",
                  "My Brother",
                  "My Sister",
                  "My Friend",
                  "My Relative",
                ].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData({ ...formData, profileFor: option })}
                    className={`border rounded-full px-4 py-2 ${
                      formData.profileFor === option
                        ? "bg-red-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <>
                <div>
                  <label>
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    max={new Date().toISOString().split("T")[0]}
                    onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                    className="border p-2 rounded w-full"
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <label>
                    Religion <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select</option>
                    <option>Hindu</option>
                    <option>Muslim</option>
                    <option>Christian</option>
                    <option>Sikh</option>
                    <option>Jain</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label>
                    Community (Caste) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="community"
                    value={formData.community}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>
                    Location (City) <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                {[
                  { label: "Email ID", name: "email", type: "email" },
                  { label: "Phone Number", name: "phone", type: "tel", maxLength: 10 },
                  { label: "Father's Name", name: "fatherName" },
                  { label: "Father's Phone", name: "fatherPhone", type: "tel", maxLength: 10 },
                  { label: "Father's Profession", name: "fatherProfession" },
                  { label: "Mother's Name", name: "motherName" },
                  { label: "Mother's Phone", name: "motherPhone", type: "tel", maxLength: 10 },
                  { label: "Mother's Profession", name: "motherProfession" },
                  { label: "Brother Details (Optional)", name: "brotherDetails" },
                  { label: "Sister Details (Optional)", name: "sisterDetails" },
                  { label: "Work", name: "work" },
                  { label: "Education", name: "education" },
                  { label: "Income", name: "income" },
                  { label: "Height (in cm)", name: "height" },
                  { label: "Weight (in kg)", name: "weight" },
                  { label: "Address", name: "address" },
                  { label: "Diet", name: "diet" },
                ].map((field) => (
                  <div key={field.name}>
                    <label>
                      {field.label}{" "}
                      {field.name !== "brotherDetails" && field.name !== "sisterDetails" && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    {field.name === "diet" ? (
                      <select
                        name="diet"
                        value={formData.diet}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded w-full"
                      >
                        <option value="">Select</option>
                        <option>Veg</option>
                        <option>Non-Veg</option>
                        <option>Jain</option>
                        <option>Eggetarian</option>
                      </select>
                    ) : (
                      <input
                        name={field.name}
                        type={field.type || "text"}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.name !== "brotherDetails" && field.name !== "sisterDetails"}
                        maxLength={field.maxLength || undefined}
                        className="border p-2 rounded w-full"
                      />
                    )}
                  </div>
                ))}
              </>
            )}

            <div className="flex justify-between">
              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`px-4 py-2 rounded ${
                    isStepValid() ? "bg-red-500 text-white" : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                  disabled={!isStepValid()}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className={`px-4 py-2 rounded ${
                    isStepValid() ? "bg-red-500 text-white" : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                  disabled={!isStepValid()}
                >
                  Submit
                </button>
              )}
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default StartFormModal;
