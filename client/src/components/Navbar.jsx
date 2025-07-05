const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-3 shadow-md bg-white">
      <div className="flex flex-col leading-tight">
        <div className="text-2xl font-bold text-red-500">Bhavana</div>
        <div className="text-xs text-gray-500">Matrimony.com</div>
      </div>
      <div className="flex gap-6">
        <a href="#" className="text-gray-700 hover:text-red-500">Login</a>
        <a href="#" className="text-gray-700 hover:text-red-500">Help</a>
      </div>
    </nav>
  );
};

export default Navbar;
