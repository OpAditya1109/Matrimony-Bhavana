import React from "react";

const FounderLetter = () => {
  return (
    <div
      className="max-w-3xl mx-auto p-6 text-gray-800 select-none"
      onContextMenu={(e) => e.preventDefault()}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <h1 className="text-3xl font-bold mb-6">
        Founder&apos;s Letter – From the Heart of Bhavana Matrimony
      </h1>

      <p className="mb-4">Dear Member,</p>
      <p className="mb-4">
        Warm greetings to you.
      </p>
      <p className="mb-4">
        I am <strong>Bhavana Madhav</strong>, the founder of <strong>Bhavana Matrimony</strong>.
        I welcome you to a platform that is not just about finding a life partner — but about building
        meaningful, lasting relationships rooted in values, culture, and trust.
      </p>
      <p className="mb-4">
        At Bhavana Matrimony, we believe that <strong>marriage is more than a union of two individuals</strong> — 
        it is the coming together of two families, two traditions, and two hearts. In today’s fast-paced digital age, 
        where depth in relationships is often overlooked, our mission is to restore the essence of <strong>commitment, 
        understanding, and emotional bonding</strong> in matrimonial connections.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">🔹 Our Purpose:</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>To guide today’s youth toward meaningful, responsible relationships</li>
        <li>To provide a <strong>safe, transparent, and accessible</strong> matrimonial platform for every community</li>
        <li>To combine <strong>technology with tradition</strong>, offering online tools along with offline support like horoscope matching, personalized suggestions, and relationship counseling</li>
        <li>To promote <strong>equality, harmony, and long-term compatibility</strong></li>
      </ul>

      <p className="mt-4">
        We understand that the younger generation seeks more than just a profile — they seek <strong>understanding, respect, and true companionship</strong>. Bhavana Matrimony is designed to deliver just that, with empathy at its core.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">💠 Our Social Commitment:</h2>
      <p className="mb-4">
        Bhavana Matrimony is not just a business — it is a <strong>social movement</strong> that stands for:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Promoting dowry-free marriages</strong></li>
        <li><strong>Supporting economically and socially weaker sections</strong></li>
        <li><strong>Conducting awareness drives, premarital counseling, and community engagement</strong></li>
      </ul>

      <p className="mt-4">
        We invite you to be a part of this journey — a journey where marriages are not just arranged, but nurtured; 
        where matches are not just made, but guided by values and trust.
      </p>

      <p className="mt-4">
        Let’s together build a society where <strong>relationships are not only formed but truly lived</strong>.
      </p>

      <p className="mt-6">
        With warmth and gratitude,
      </p>
      <p className="mb-2"><strong>Bhavana Madhav</strong></p>
      <p className="mb-4">Founder</p>
      <p className="mb-2"><strong>Bhavana Matrimony</strong></p>
    </div>
  );
};

export default FounderLetter;
