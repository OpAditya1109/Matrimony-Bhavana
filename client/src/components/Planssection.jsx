const PlansSection = () => {
  const plans = [
    {
      id: 1,
      name: "Basic Plan",
      price: "₹1499 (3 महीने के लिए)",
      features: [
        "आपकी प्रोफ़ाइल सभी उपयोगकर्ताओं को दिखाई देगी",
        "प्रति माह 25 संपर्क नंबर देखने की अनुमति",
        "50 प्रोफाइल्स को इंटरेस्ट भेजने की सुविधा",
        "सीमित चैट एक्सेस (केवल जब दोनों पक्ष इंटरेस्ट भेजें)",
        "ईमेल के माध्यम से ग्राहक सहायता",
        "मुफ्त सामान्य कुंडली मिलान सुविधा",
      ],
    },
    {
      id: 2,
      name: "Premium Plan",
      price: "₹2499 (6 महीने)",
      features: [
        "Basic Plan की सभी सुविधाएं शामिल",
        "प्रति माह 100 संपर्क नंबर देखने की अनुमति",
        "अनलिमिटेड प्रोफाइल्स को इंटरेस्ट भेज सकते हैं",
        "सर्च रिजल्ट में आपकी प्रोफ़ाइल ऊपर दिखाई देगी",
        "सभी सदस्यों से डायरेक्ट चैट करने की सुविधा",
        "WhatsApp और ईमेल द्वारा ग्राहक सहायता",
      ],
    },
    {
      id: 3,
      name: "Elite Plan",
      price: "₹4999 (12 महीने)",
      features: [
        "Premium Plan की सभी सुविधाएं शामिल",
        "अमर्यादित संपर्क नंबर देखने की सुविधा",
        "प्रोफाइल पर वेरीफाइड बैज मिलेगा",
        "सर्च में आपकी प्रोफाइल टॉप पर दिखाई देगी",
        "एक बार रिलेशनशिप मैनेजर से प्रोफाइल गाइडेंस कॉल",
        "पर्सनलाइज्ड मैच सुझाव मिलेंगे",
        "प्राथमिकता ग्राहक सहायता – कॉल, WhatsApp और ईमेल द्वारा",
      ],
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Choose the Best Plan for You
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-pink-50 border border-red-200 rounded-3xl shadow-md p-8 hover:border-red-400 hover:shadow-lg transition duration-300"
          >
            <h3 className="text-2xl font-bold text-center text-red-600 mb-2">
              {plan.name}
            </h3>
            <p className="text-center text-lg font-semibold text-gray-700 mb-6">
              {plan.price}
            </p>
            <ul className="space-y-3 text-gray-700 text-base">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-green-500">✔️</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlansSection;
