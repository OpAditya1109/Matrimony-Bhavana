import React from "react";

const FraudAlert = () => {
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
      <h1 className="text-3xl font-bold mb-4">Fraud & Alert Policy</h1>

      <p className="mb-4">
        At <strong>Bhavna Matrimony</strong>, we are committed to providing a safe and secure platform for all our users. However, online platforms may sometimes attract fraudulent individuals. This page provides important information to help you stay protected.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Be Cautious of Suspicious Activities</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Never share your bank account, OTPs, UPI PINs, or passwords with anyone.</li>
        <li>Do not send money or personal items to anyone claiming emergencies or financial needs.</li>
        <li>Be cautious of profiles asking for money, personal favors, or confidential details.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Common Online Frauds</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Fake profiles asking for financial help.</li>
        <li>Claims of overseas work opportunities or immigration assistance.</li>
        <li>Lottery or prize-winning scams.</li>
        <li>Emotional manipulation to extort money.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. How to Stay Safe</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Communicate within our platform as much as possible.</li>
        <li>Verify personal and financial details before taking any serious step.</li>
        <li>Meet in public places for initial meetings.</li>
        <li>Use video calls to verify identity before in-person meetings.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Report Suspicious Profiles</h2>
      <p className="mb-4">
        If you suspect any fraudulent activity or encounter suspicious profiles, please report them immediately to us via:
      </p>
      <ul className="list-disc pl-6 space-y-2">
       <li><strong>Email:</strong> matrimonybhavana@gmail.com</li>
        <li><strong>Phone:</strong> 92700 96633</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Disclaimer</h2>
      <p>
        While we make every effort to prevent misuse, users are advised to remain vigilant. Bhavna Matrimony is not responsible for losses incurred through unauthorized dealings outside our platform.
      </p>
    </div>
  );
};

export default FraudAlert;
