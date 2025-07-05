const PlansSection = () => {
  const plans = [
    { id: 1, name: "Basic Plan", img: "/Basic plan.jpg" },
    { id: 2, name: "Premium Plan", img: "/Premum plan.jpg" },
    { id: 3, name: "Elite Plan", img: "/Elite plan.jpg" },
   
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Choose the Best Plan for You</h2>
      <div className="flex overflow-x-auto gap-6 px-4 scrollbar-hide">
        {plans.map((plan) => (
          <div key={plan.id} className="min-w-[250px] bg-white rounded shadow">
            <img src={plan.img} alt={plan.name} className="rounded-t w-full h-78 object-cover" />
            <div className="p-4 text-center">
              <h3 className="font-semibold">{plan.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlansSection;
