import { useState } from "react";
import statesWithCities from "../data/Indian_Cities_In_States.json";
import allindiacities from "../data/cities-name-list.json"
import Select from "react-select";

const StartFormModal = ({ isOpen, onClose }) => {
  const [formError, setFormError] = useState("");

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
    age: "",
    gender:"",
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
    phone: "",
    email: "",
  });
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

  const selectOptions = {
    profileFor: ["Self", "Son", "Daughter", "Brother", "Sister", "Relative", "Friend"],
   religion: [
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Buddhist",
  "Jain",
  "Parsi (Zoroastrian)",
  "Jewish"],
gender:["Male","Female"],
hivTest:["Yes","No"],
  community: [
  "Agarwal",
  "Arora",
  "Baniya",
  "Brahmin",
  "Chamar",
  "Chhetri",
  "Gujjar",
  "Jain",
  "Jat",
  "Kayastha",
  "Khatri",
  "Koli",
  "Kshatriya",
  "Kumar",
  "Kurmi",
  "Lingayat",
  "Lohana",
  "Maratha",
  "Mochi",
  "Mudalier",
  "Mukkulathor",
  "Nadar",
  "Naidu",
  "Nair",
  "OBC",
  "Patel",
  "Patil",
  "Rajput",
  "Reddy",
  "SC",
  "ST",
  "Sharma",
  "Shetty",
  "Sindhi",
  "Soni",
  "Teli",
  "Vellalar",
  "Vysya",
  "Yadav",
  "Other"
],

    bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    maritalStatus: ["Never Married", "Divorced", "Widowed"],
   motherTongue: [
  "Hindi",
  "Bengali",
  "Marathi",
  "Telugu",
  "Tamil",
  "Gujarati",
  "Urdu",
  "Kannada",
  "Odia",
  "Malayalam",
  "Punjabi",
  "Assamese",
  "Maithili",
  "Santali",
  "Kashmiri",
  "Nepali",
  "Konkani",
  "Sindhi",
  "Dogri",
  "Manipuri (Meitei)",
  "Bodo",
  "Sanskrit",
  "Bhili/Bhilodi",
  "Gondi",
  "Tulu",
  "Lepcha",
  "Ladakhi",
  "Mundari",
  "Khasi",
  "Garhwali",
  "Kumaoni",
  "Rajasthani",
  "Chhattisgarhi",
  "Banjari",
  "Magahi",
  "Bhojpuri",
  "Other"
],
    familyStatus: ["Middle Class", "Upper Middle Class", "Rich", "Affluent"],
    diet: ["Vegetarian", "Non-Vegetarian", "Eggetarian"],
    physicallyChallenged: ["No", "Yes"],
    bodyType: ["Slim", "Athletic", "Average", "Heavy"],
    complexion: ["Very Fair", "Fair", "Wheatish", "Dark"],
    country: ["India", "Other"],
    state: Object.keys(statesWithCities),
    location: formData.state ? statesWithCities[formData.state] || [] : [],
subCaste: [
  "96 Kuli Maratha",
  "Agarwal",
  "Anglo Indian",
  "Ansari",
  "Baiga",
  "Balmiki",
  "Baniya",
  "Bhil",
  "Bhumihar",
  "Bohras",
  "Bundela",
  "Chamar",
  "Chettiar",
  "Chitpavan Brahmin",
  "Chitrapur Saraswat Brahmin",
  "CSI",
  "Daivadnya Brahmin",
  "Devrukhe Brahmin",
  "Deshastha Brahmin",
  "Deshastha Rigvedi Brahmin",
  "Deshastha Yajurvedi Brahmin",
  "Digambar Jain",
  "Ezhava",
  "Gaud Saraswat Brahmin",
  "Gaur Brahmin",
  "Gond",
  "Gurav Brahmin",
  "Gupta",
  "Havyaka Brahmin",
  "Hoysala Brahmin",
  "Iyengar",
  "Iyer",
  "Jat",
  "Jat Sikh",
  "Jatav",
  "Kamakubja Brahmin", // (Duplicate of "Kanyakubja Brahmin", original misspelled — corrected below)
  "Kanyakubja Brahmin",
  "Karhade Brahmin",
  "Kayastha",
  "Khandelwal",
  "Khatri",
  "Khatri Sikh",
  "Khoja",
  "Kokanastha Brahmin",
  "Koli",
  "Konkanastha Brahmin",
  "Kurmi",
  "Kunbi",
  "Latin Catholic",
  "Lingayat",
  "Lepcha",
  "Lodha",
  "Lohar",
  "Madiga",
  "Maithil Brahmin",
  "Mahar",
  "Maheshwari",
  "Mali",
  "Mazhabhi Sikh",
  "Memon",
  "Mughal",
  "Nadar",
  "Nagar Brahmin",
  "Nair",
  "Namboothiri",
  "Navayana",
  "Niyogi Brahmin",
  "Oraon",
  "Other",
  "Parmara",
  "Paswan",
  "Pathan",
  "Panchal Karhade",
  "Protestant",
  "Punjabi Brahmin",
  "Qureshi",
  "Rajapur Saraswat Brahmin",
  "Rajguru Brahmin",
  "Ramgarhia",
  "Rathore",
  "Ravidasia Sikh",
  "Reddy",
  "Rigvedi Karhade",
  "Sanadhya Brahmin",
  "Santhal",
  "Saraswat Brahmin",
  "Shaikh",
  "Shwetambar Jain",
  "Sisodia",
  "Solanki",
  "Sthanakvasi",
  "SubCaste",
  "Sutar",
  "Syed",
  "Syro Malabar",
  "Syro Malankara",
  "Teli",
  "Theravada",
  "Tomar",
  "Valmiki",
  "Vaidiki Brahmin",
  "Vishwakarma",
  "Vokkaliga",
  "Yadav"
],


   gotra: [
  "Atri",
  "Angiras",
  "Bharadwaj",
  "Bhrigu",
  "Gautam",
  "Jamadagni",
  "Kashyap",
  "Vashistha",
  "Vishwamitra",
  "Agastya",
  "Shandilya",
  "Kaushik",
  "Parashara",
  "Pulastya",
  "Pulaha",
  "Kratu",
  "Vatsa",
  "Vishnu",
  "Kanva",
  "Harita",
  "Mandavya",
  "Saunaka",
  "Moudgalya",
  "Garga",
  "Kapila",
  "Kutsa",
  "Lomasha",
  "Kaundinya",
  "Durvasa",
  "Markandeya",
  "Yajnavalkya",
  "Chyavana",
  "Devadatta",
  "Sankrithi",
  "Srivatsa",
  "Sutar",
  "Sankhyayana",
  "Other"
],

    rashi: ["Mesh", "Vrishabh", "Mithun", "Kark", "Singh", "Kanya", "Tula", "Vrishchik", "Dhanu", "Makar", "Kumbh", "Meen"],
    nakshatra: ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"],
    charan: ["1", "2", "3", "4"],
    nadi: ["Aadi", "Madhya", "Antya"],
    education: [
  "Below 10th",
  "10th Pass",
  "12th Pass",
  "Diploma (Polytechnic/ITI)",
  "Undergraduate (Pursuing)",
  "Bachelor of Arts (BA)",
  "Bachelor of Science (BSc)",
  "Bachelor of Commerce (BCom)",
  "Bachelor of Business Administration (BBA)",
  "Bachelor of Computer Applications (BCA)",
  "Bachelor of Engineering (BE)",
  "Bachelor of Technology (BTech)",
  "Bachelor of Architecture (BArch)",
  "Bachelor of Design (B.Des)",
  "Bachelor of Pharmacy (B.Pharm)",
  "MBBS (Bachelor of Medicine)",
  "BDS (Bachelor of Dental Surgery)",
  "BAMS (Ayurvedic Medicine)",
  "BHMS (Homeopathy)",
  "BUMS (Unani Medicine)",
  "LLB (Bachelor of Law)",
  "Graduate (General)",
  "Postgraduate (Pursuing)",
  "Master of Arts (MA)",
  "Master of Science (MSc)",
  "Master of Commerce (MCom)",
  "Master of Business Administration (MBA)",
  "Master of Computer Applications (MCA)",
  "Master of Engineering (ME)",
  "Master of Technology (MTech)",
  "Master of Architecture (MArch)",
  "Master of Design (M.Des)",
  "Master of Pharmacy (M.Pharm)",
  "MPhil (Master of Philosophy)",
  "LLM (Master of Law)",
  "PhD / Doctorate",
  "CA (Chartered Accountant)",
  "CS (Company Secretary)",
  "CFA (Chartered Financial Analyst)",
  "ICWA (Cost Accountant)",
  "Professional Certification",
  "Others"
],

    income: ["< ₹1 Lakh", "₹1 - ₹3 Lakh", "₹3 - ₹5 Lakh", "₹5 - ₹10 Lakh", "₹10 - ₹20 Lakh", "> ₹20 Lakh"],
      birthPlace: allindiacities,
  };

  const groupedSections = [
    { title: "Basic Info", fields: ["profileFor", "firstName", "lastName", "dob", "gender", "age","birthTime", "birthPlace"] },
    { title: "Religious Info", fields: ["religion", "community", "subCaste", "gotra", "rashi", "nakshatra", "charan", "nadi"] },
    { title: "Physical & Lifestyle", fields: ["bloodGroup", "maritalStatus", "motherTongue", "familyStatus", "diet", "physicallyChallenged", "height", "weight", "bodyType", "complexion","hivTest"] },
    { title: "Location", fields: ["country", "state", "location", "address", "presentAddress"] },
    { title: "Family Details", fields: ["fatherName", "fatherPhone", "fatherProfession", "motherName", "motherPhone", "motherProfession", "brotherDetails", "sisterDetails"] },
    { title: "Education & Work", fields: ["work", "education", "income", "referralCode"] },
    { title: "Contact Details", fields: ["email", "phone"] }
  ];

  const nonRequiredFields = [
    // "fatherName", "fatherPhone", "fatherProfession", "motherName", "motherPhone", "motherProfession", "brotherDetails", "sisterDetails", "hivTest",
     "referralCode"
  ];

  const handleChange = (e) => {
  const { name, value } = e.target;
  const phoneFields = ["phone", "fatherPhone", "motherPhone"];
  if (phoneFields.includes(name) && !/^[0-9]{0,10}$/.test(value)) return;

  const nameFields = ["firstName", "lastName", "fatherName", "motherName"];
  if (nameFields.includes(name) && !/^[A-Za-z\s]*$/.test(value)) return;

  let updatedFormData = { ...formData, [name]: value };

  if (name === "dob") {
    const age = calculateAge(value);
    updatedFormData.age = age;
  }

  if (name === "state") {
    updatedFormData.location = ""; // reset location when state changes
  }

  setFormData(updatedFormData);
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
   setFormError("");

  // Validate required fields
  const requiredFields = groupedSections.flatMap(section => section.fields)
    .filter((field) => !nonRequiredFields.includes(field));

  for (const field of requiredFields) {
    if (!formData[field]) {
      setFormError("Please fill all required fields before submitting the form.");
      return;
    }
  }
    if (!otpVerified) return ;
    if (!/^[0-9]{10}$/.test(formData.phone)) return alert("Invalid phone number");

    try {
      const res = await fetch("https://matrimony-bhavana.onrender.com/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
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

return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-3xl text-black h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        {step > 1 && (
          <button type="button" onClick={() => setStep(step - 1)} className="text-blue-500">&larr; Back</button>
        )}
        <h2 className="text-xl font-bold text-center w-full">
          Step {step}: {groupedSections[step - 1].title}
        </h2>
        {step < groupedSections.length && (
          <button type="button" onClick={() => setStep(step + 1)} className="text-blue-500">Next &rarr;</button>
        )}
      </div>

      {showThankYou ? (
        <div className="text-center p-4">
          <p className="text-green-600 mb-2 font-semibold">
            Thank you! We will contact you once your account is verified.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 border rounded-lg shadow">
            <div className="grid md:grid-cols-2 gap-4">
              {groupedSections[step - 1].fields.map((field) => {
                const label = field.replace(/([A-Z])/g, " $1");
                const isRequired = !nonRequiredFields.includes(field);

                if (field === "email") {
                  return (
                    <div key={field} className="col-span-2">
                      <label>Email <span className="text-red-500">*</span></label>
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
                          >
                            Send OTP
                          </button>
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
                              >
                                Verify
                              </button>
                            </>
                          )}
                        </div>
                      )}
                      {otpStatus && (
                        <p className={`text-sm mt-1 ${otpVerified ? "text-green-600" : "text-red-500"}`}>
                          {otpStatus}
                        </p>
                      )}
                    </div>
                  );
                } else if (field === "phone") {
                  return (
                    <div key={field}>
                      <label>Phone <span className="text-red-500">*</span></label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        placeholder="Enter Phone Number"
                        maxLength={10}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={field}>
                      <label className="capitalize block mb-1">
                        {label} {isRequired && <span className="text-red-500">*</span>}
                      </label>
                    {field === "birthPlace" ? (
  <Select
    name="birthPlace"
    value={
      formData.birthPlace
        ? { value: formData.birthPlace, label: formData.birthPlace }
        : null
    }
    onChange={(selectedOption) =>
      setFormData({ ...formData, birthPlace: selectedOption?.value || "" })
    }
    options={allindiacities.map((city) => ({ value: city, label: city }))}
    placeholder="Select Birth Place"
    isClearable
    className="w-full"
    filterOption={(option, inputValue) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    }
  />
) : selectOptions[field] ? (
  <select
    name={field}
    value={formData[field]}
    onChange={handleChange}
    className="border p-2 rounded w-full"
  >
    <option value="">Select {label}</option>
    {selectOptions[field].map((option) => (
      <option key={option} value={option}>{option}</option>
    ))}
  </select>
) : field === "dob" ? (
  <input
    name="dob"
    type="date"
    value={formData.dob}
    onChange={handleChange}
    className="border p-2 rounded w-full"
  />
) : field === "birthTime" ? (
  <input
    name="birthTime"
    type="time"
    value={formData.birthTime}
    onChange={handleChange}
    className="border p-2 rounded w-full"
  />
) :
field === "height" ? (
  <div className="flex items-center gap-2">
    <input
      name="height"
      type="number"
      min="50"
      max="250"
      value={formData.height}
      onChange={handleChange}
      className="border p-2 rounded w-full"
      placeholder="Enter Height"
    />
    <span className="text-gray-600 whitespace-nowrap">cm</span>
  </div>
) : field === "weight" ? (
  <div className="flex items-center gap-2">
    <input
      name="weight"
      type="number"
      min="20"
      max="200"
      value={formData.weight}
      onChange={handleChange}
      className="border p-2 rounded w-full"
      placeholder="Enter Weight"
    />
    <span className="text-gray-600 whitespace-nowrap">kg</span>
  </div>
) : (
  <input
    name={field}
    value={formData[field]}
    onChange={handleChange}
    className="border p-2 rounded w-full"
    placeholder={`Enter ${label}`}
  />
)}


                    </div>
                  );
                }
              })}
            </div>
          </div>
{formError && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
    {formError}
  </div>
)}

        
        </form>
        
      )}
        <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border rounded"
              >
                Previous
              </button>
            )}
            {step < groupedSections.length ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            ) : (
              <button type="submit" onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">
                Submit
              </button>
            )}
          </div>
    </div>
  </div>
);

};

export default StartFormModal;
