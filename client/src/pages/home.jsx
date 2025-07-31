import React from "react";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Planssection from "../components/Planssection";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bhavana Matrimony – Trusted Marathi Matchmaking</title>
        <link rel="canonical" href="https://bhavanamatrimony.com/" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bhavana Matrimony – Trusted Marathi Matchmaking" />
        <meta property="og:description" content="Find verified Marathi, Maratha, Brahmin, Jain & Buddhist matches. Free Kundali Matching. Register now!" />
        <meta property="og:url" content="https://bhavanamatrimony.com" />
        <meta property="og:site_name" content="Bhavana Matrimony" />
        <meta property="og:image" content="https://bhavanamatrimony.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bhavana Matrimony – Trusted Marathi Matchmaking" />
        <meta name="twitter:description" content="Verified Marathi profiles, Kundali matching, free registration. Join now!" />
        <meta name="twitter:image" content="https://bhavanamatrimony.com/og-image.jpg" />
      </Helmet>

      <HeroSection />
      <HowItWorks />
      <Planssection />
      {/* <SuccessStories /> */}
    </div>
  );
};

export default Home;
