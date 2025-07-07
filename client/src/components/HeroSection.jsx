import { useState } from "react";
import StartFormModal from "./StartFormModal";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative h-[90vh] bg-cover bg-center" style={{ backgroundImage: "url('/Harini-Aswin-MCC-Hall-Chennai-0609+-+Copy.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold mb-4 text-center">The India's No.1 Matchmaking Service</h1>
        <p className="mb-6 text-center">Start Your Search for Life Partner</p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 text-white px-6 py-2 rounded"
        >
          Let's Begin
        </button>

        {isModalOpen && <StartFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
};

export default HeroSection;
