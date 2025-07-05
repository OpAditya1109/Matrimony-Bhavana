import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 text-center">
      <h3 className="text-red-500 text-lg mb-2">Bhavanamatrimony.com - Trusted by over 1 Million Members</h3>
      <p className="text-sm mb-4">
        Bhavanamatrimony.com is one of India's leading matrimony services with a simple objective - helping people find happiness.
      </p>
      <div className="flex justify-center flex-wrap gap-6 mb-4">
          <a href="/" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Privacy</a>
        <a href="#" className="hover:underline">Help</a>
        <a href="#" className="hover:underline">Contact</a>
        <a href="/founder-letter" className="hover:underline">Founder Letter</a>
       <Link to="/terms-of-use" className="hover:underline">Terms of Use</Link>
              <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                 <Link to="/fraud-alert" className="hover:underline">Fraud Alert</Link>


      </div>
      <p className="text-xs text-gray-500">&copy; 2025 Bhavanamatrimony.com | All rights reserved</p>
    </footer>
  );
};

export default Footer;
