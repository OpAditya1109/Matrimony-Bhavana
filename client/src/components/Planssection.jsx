const ServicesSection = () => {
  const services = [
    {
      id: 1,
      name: "Corporate Parties",
      image: "corporate.jpg", // Replace with actual image paths
      description: "Professional event management for corporate meetings, conferences, and celebrations.",
    },
    {
      id: 2,
      name: "Wedding Planner",
      image: "wedding_planner.jpg",
      description: "Complete wedding planning services including decor, catering, and logistics.",
    },
    {
      id: 3,
      name: "Private Party",
      image: "private_party.jpg",
      description: "Exclusive private party planning for birthdays, anniversaries, and special occasions.",
    },
    {
      id: 4,
      name: "Destination Wedding",
      image: "destination_wedding.jpg",
      description: "Exotic destination wedding planning for an unforgettable celebration.",
    },
    {
      id: 5,
      name: "Astrology",
      image: "astrology.jpg",
      description: "Astrology consultations for marriage compatibility and life guidance.",
    },
    {
      id: 6,
      name: "Marriage Counseling",
      image: "marriage_counselling.webp",
      description: "Expert marriage counseling services to strengthen relationships and resolve issues.",
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Our Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 max-w-7xl mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className="relative rounded-3xl overflow-hidden shadow-lg group"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center px-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                {service.name}
              </h3>
              <p className="text-white text-base">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
