import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import TermsOfUse from './pages/TermsOfUse';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy ";
import FraudAlert from "./pages/FraudAlert";
import FounderLetter from "./pages/FounderLetter";
import Aboutus from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blogs"
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePages"
import MatchMaking from "./pages/MatchMaking";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/fraud-alert" element={<FraudAlert />} />
        <Route path="/founder-letter" element={<FounderLetter />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/Match-Making" element={<MatchMaking />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
