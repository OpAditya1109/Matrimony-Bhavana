import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import TermsOfUse from './pages/TermsOfUse';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
