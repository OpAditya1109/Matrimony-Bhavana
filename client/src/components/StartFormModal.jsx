import { useState } from "react";
import statesWithCities from "../data/Indian_Cities_In_States.json";
import indianCities from "../data/cities-name-list.json";

const StartFormModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);

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
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "state" ? { location: "" } : {}),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://matrimony-bhavana.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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

  if (!isOpen) return null;

  const allFields = Object.keys(formData);

  const selectOptions = {
    profileFor: ["Self", "Son", "Daughter", "Brother", "Sister", "Relative", "Friend", "Other"],
    birthPlace: indianCities.sort(),
    bloodGroup: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    religion: ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Parsi (Zoroastrian)", "Jewish", "Other"],
    community: ["Brahmin", "Rajput", "Maratha", "Kayastha", "Baniya", "Kshatriya", "Vaishya", "Yadav", "Jat", "Kurmi", "Gupta", "Agarwal", "Khatri", "Arora", "Sindhi", "Punjabi", "Lingayat", "Reddy", "Naidu", "Chettiar", "Nair", "Ezhava", "Vokkaliga", "Gounder", "Patel", "Lohana", "Koli", "Scheduled Caste (SC)", "Scheduled Tribe (ST)", "OBC (Other Backward Class)", "Shudra", "Other"],
    subCaste: ["Deshastha", "Chitpavan", "Karhade", "Saraswat", "Gaur", "Maithil", "Kanyakubja", "Iyer", "Iyengar", "Namboodiri", "Anavil", "Smarta", "Rigvedi", "Yajurvedi", "Agrawal", "Oswal", "Maheshwari", "Khandelwal", "Modh", "Lohana", "Bania", "Vaishnav", "Jain Bania", "Poddar", "Teli", "Sisodia", "Chauhan", "Rathore", "Solanki", "Parmar", "Bundela", "Gahlot", "Tomar", "Yaduvanshi", "Suryavanshi", "Chandravanshi", "Ahir", "Yadav", "Thakur", "Jat", "Kurmi", "Kushwaha", "Koeri", "Lodh", "Nai", "Sahu", "Gupta", "Saini", "Gurjar", "Agri", "Gawli", "Golla", "Kuruba", "Vanniyar", "Gounder", "Nadar", "Lingayat", "Devanga", "Vishwakarma", "Mochi", "Koli", "Kamma", "Reddy", "Naidu", "Kapu", "Jatav", "Chamar", "Dhobi", "Valmiki", "Mahar", "Madiga", "Mala", "Dhanuk", "Bhangi", "Dom", "Paswan", "Pasi", "Bairwa", "Mehtar", "Gond", "Bhil", "Santhal", "Oraon", "Munda", "Meena", "Kharia", "Ho", "Baiga", "Pillai", "Chettiar", "Thevar", "Nair", "Ezhava", "Vokkaliga", "Rohit", "Panwar", "Banjaras", "Maratha", "Kunbi", "Koshti", "Vanika", "Chaurasia", "Other"],
    gotra: ["Aatreya", "Agastya", "Alambayana", "Angirasa", "Aupamanyava", "Bharadwaja", "Bhrigu", "Chyavana", "Dhananjaya", "Durvasa", "Garga", "Gautam", "Galava", "Harita", "Jamadagni", "Kakshivat", "Kanva", "Kapi", "Kaushik", "Kashyap", "Kutsa", "Lomasha", "Maitreya", "Mandavya", "Markandeya", "Mudgala", "Nabhanedishta", "Parashar", "Pulaha", "Pulastya", "Rathitara", "Rohinya", "Rishyashringa", "Saandilya", "Samavartta", "Samkriti", "Sankrithi", "Savarni", "Shaunak", "Sharabhanga", "Shatamarshana", "Shandilya", "Shringi", "Srivatsa", "Sudhanvan", "Suyajna", "Traivaruni", "Taittiriya", "Upamanyu", "Uttamayana", "Vadhula", "Vagbhava", "Valmiki", "Vamadeva", "Vashishtha", "Vatsya", "Vishnuvardhana", "Vishwamitra", "Vyaghrapada", "Vyasa", "Yajnavalkya", "Other"],
    rashi: ["Mesh", "Vrishabh", "Mithun", "Karka", "Simha", "Kanya", "Tula", "Vrishchik", "Dhanu", "Makar", "Kumbh", "Meen"],
    nakshatra: ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"],
    charan: ["1", "2", "3", "4"],
    nadi: ["Adi", "Madhya", "Antya"],
    maritalStatus: ["Single", "Divorced", "Widowed"],
    motherTongue: ["Assamese", "Bengali", "Bhojpuri", "Brij", "Chhattisgarhi", "Dogri", "English", "Garhwali", "Gujarati", "Hindi", "Kannada", "Kashmiri", "Konkani", "Maithili", "Malayalam", "Manipuri", "Marathi", "Marwari", "Nepali", "Odia", "Punjabi", "Rajasthani", "Sanskrit", "Sindhi", "Tamil", "Telugu", "Urdu", "Other"],
    familyStatus: ["Middle Class", "Upper Middle Class", "Rich"],
    diet: ["Veg", "Non-Veg", "Eggetarian", "Jain"],
    physicallyChallenged: ["Yes", "No"],
    bodyType: ["Slim", "Average", "Athletic", "Heavy"],
    complexion: ["Fair", "Wheatish", "semi-Dark", "Dark"],
    country: ["India", "USA", "Canada", "UK", "Australia", "Other"],
    state: Object.keys(statesWithCities),
    location: formData.state ? statesWithCities[formData.state] || [] : [],
    education: [
      "Below 10th", "10th Pass", "12th Pass", "Diploma", "Graduate - B.A.", "Graduate - B.Com",
      "Graduate - B.Sc", "Graduate - BBA/BMS", "Graduate - B.Tech/B.E.", "Graduate - Other",
      "Post Graduate - M.A.", "Post Graduate - M.Com", "Post Graduate - M.Sc",
      "Post Graduate - MBA/PGDM", "Post Graduate - M.Tech/M.E.", "Post Graduate - Other",
      "PhD", "CA/CS/ICWA", "LLB", "LLM", "MBBS", "MD/MS", "Other"
    ],
    income: [
      "< ₹25,000", "₹25,000 - ₹50,000", "₹50,000 - ₹1 Lakh", "₹1 - ₹3 Lakh",
      "₹3 - ₹5 Lakh", "₹5 - ₹7.5 Lakh", "₹7.5 - ₹10 Lakh", "₹10 - ₹15 Lakh",
      "₹15 - ₹20 Lakh", "₹20 - ₹30 Lakh", "₹30 - ₹50 Lakh", "> ₹50 Lakh"
    ]
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
              Thank you! We will contact you once your account is verified by us.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {allFields.map((fieldName) => (
              <div key={fieldName}>
                <label className="capitalize">{fieldName.replace(/([A-Z])/g, ' $1')}</label>
                {fieldName === "height" || fieldName === "weight" ? (
                  <input
                    type="number"
                    name={fieldName}
                    min={fieldName === "height" ? 50 : 20}
                    max={fieldName === "height" ? 250 : 200}
                    step="1"
                    placeholder={`Enter ${fieldName} in ${fieldName === "height" ? "cm" : "kg"}`}
                    value={formData[fieldName]}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                ) : selectOptions[fieldName] ? (
                  <select
                    name={fieldName}
                    value={formData[fieldName]}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select {fieldName.replace(/([A-Z])/g, ' $1')}</option>
                    {selectOptions[fieldName].map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={fieldName}
                    value={formData[fieldName]}
                    onChange={handleChange}
                    type={fieldName === "dob" ? "date" : fieldName === "birthTime" ? "time" : "text"}
                    className="border p-2 rounded w-full"
                    placeholder={`Enter ${fieldName.replace(/([A-Z])/g, ' $1')}`}
                    max={fieldName === "dob" ? new Date().toISOString().split("T")[0] : undefined}
                  />
                )}
              </div>
            ))}

            <div className="flex justify-between">
              <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">
                Submit
              </button>
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
