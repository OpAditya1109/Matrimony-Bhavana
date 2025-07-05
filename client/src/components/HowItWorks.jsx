const HowItWorks = () => {
  const steps = [
    { id: 1, title: "Sign Up", desc: "Register for free & put up your Matrimony Profile" },
    { id: 2, title: "Connect", desc: "Select & Connect with Matches you like" },
    { id: 3, title: "Interact", desc: "Become a Premium Member & Start a Conversation" },
  ];

  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-8 text-red-500">Find your Special Someone</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {steps.map((step) => (
          <div key={step.id} className="bg-white p-6 rounded shadow-md w-72">
            <div className="text-5xl mb-4 text-red-500">{step.id}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
