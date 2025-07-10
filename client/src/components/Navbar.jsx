import Logo from "../assets/Matrimony-logo-wbg.png"; // Adjust the path based on your project structure

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-3 shadow-md bg-white">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Logo Image */}
        <img src={Logo} alt="Bhavana Logo" className="w-12 h-12 object-contain" />

        {/* Text Section */}
        <div className="flex flex-col leading-tight">
          <div className="text-2xl font-bold text-red-500">Bhavana</div>
          <div className="text-xs text-gray-500">Matrimony.com</div>
        </div>

        {/* Tagline */}
        <div className="text-base sm:text-lg md:text-xl text-gray-600 italic whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
          Connecting Hearts & Families
        </div>
      </div>

      <div className="flex gap-6">
        {/* Optional links */}
      </div>
    </nav>
  );
};

export default Navbar;
