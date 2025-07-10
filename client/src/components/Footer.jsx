import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaYoutube,
  FaTumblr,
  FaMedium,
  FaWhatsapp,
} from "react-icons/fa6";
import { SiBlogger } from "react-icons/si"; // Blogger icon from simple-icons

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 text-center">
      <h3 className="text-red-500 text-lg mb-2">
        Bhavanamatrimony.com - Trusted by over 1 Million Members
      </h3>
      <p className="text-sm mb-4">
        Bhavanamatrimony.com is one of India's leading matrimony services with a
        simple objective - helping people find happiness.
      </p>

      <div className="flex justify-center flex-wrap gap-6 mb-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/aboutus" className="hover:underline">
          About
        </a>
        <a href="/contactus" className="hover:underline">
          Contact
        </a>
        <a href="/founder-letter" className="hover:underline">
          Founder Letter
        </a>
        <Link to="/terms-of-use" className="hover:underline">
          Terms of Use
        </Link>
        <Link to="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
        <Link to="/fraud-alert" className="hover:underline">
          Fraud Alert
        </Link>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-4 mb-4 text-xl text-gray-600 flex-wrap">
        <a
          href="https://www.instagram.com/bhavanamatrimony?igsh=N3owcWppeWl2b243"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500"
        >
          <FaInstagram />
        </a>
        <a
          href="https://x.com/BhavanaMatri9?t=kfFutu1A1DXaCDLciIAXpw&s=09"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.facebook.com/share/1B1JrsibiU/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-700"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.youtube.com/@BhavanaMatrimony"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-600"
        >
          <FaYoutube />
        </a>
        <a
          href="https://www.tumblr.com/bhavanamatrimony?source=share"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          <FaTumblr />
        </a>
        <a
          href="https://bhavanamat.blogspot.com/2025/07/marriage.html"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-600"
        >
          <SiBlogger />
        </a>
        <a
          href="https://medium.com/@matrimonybhavana/आधुनिक-live-in-रिलेशनशिप-व-पारंपरिक-विवाह-एक-तुलनात्मक-दृष्टिकोन-56c1b94b7979"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
        >
          <FaMedium />
        </a>
        <a
          href="https://whatsapp.com/channel/0029Vb5m22o59PwaieoXOA2M" // Replace with your actual WhatsApp number (in international format)
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-500"
        >
          <FaWhatsapp />
        </a>
      </div>

      <p className="text-xs text-gray-500">
        &copy; 2025 Bhavanamatrimony.com | All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
