import React from "react";

const PrivacyPolicy = () => {
  return (
    <div
      className="max-w-3xl mx-auto p-6 text-gray-800 select-none"
      onContextMenu={(e) => e.preventDefault()} // Disable right click
      style={{
        userSelect: "none", // Extra protection
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Effective Date: [Date]</p>

      <p className="mb-4">
        Welcome to <strong>Bhavna Matrimony</strong> ("we," "our," "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Personal Details:</strong> Name, date of birth, gender, religion, community/caste, marital status, education, profession, income, diet, and similar details.</li>
        <li><strong>Contact Information:</strong> Email address, phone number, and location.</li>
        <li><strong>Family Details:</strong> Parent's names, professions, sibling details.</li>
        <li><strong>Profile Information:</strong> Photos, biodata, and partner preferences you choose to provide.</li>
        <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage data via cookies or analytics tools.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Create and manage your profile.</li>
        <li>Help you connect with suitable matches.</li>
        <li>Communicate via email, phone, SMS, or WhatsApp.</li>
        <li>Improve website functionality and user experience.</li>
        <li>Send notifications and promotional offers (opt-out available).</li>
        <li>Prevent fraud and ensure safety.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing of Information</h2>
      <p className="mb-4">
        We respect your privacy and do <strong>not</strong> sell your personal data. We may share your data:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>With other users for matchmaking.</li>
        <li>With trusted service providers (payment, communication, etc.).</li>
        <li>To comply with legal obligations or government requests.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We take appropriate security measures to protect your data. However, no digital platform can guarantee absolute security.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>View and update your personal information.</li>
        <li>Delete your profile anytime.</li>
        <li>Withdraw consent for promotional messages.</li>
        <li>Request deletion of your data (subject to legal needs).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Cookies & Tracking</h2>
      <p className="mb-4">
        We use cookies to enhance your experience. You can adjust your cookie preferences via your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Data Retention</h2>
      <p className="mb-4">
        We retain your data as long as your account is active or as needed to provide services. You may request deletion anytime.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Third-Party Links</h2>
      <p className="mb-4">
        Our website may contain links to other sites. We are not responsible for their privacy practices.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">9. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy at any time. Updates will be posted on this page, and we recommend reviewing it periodically.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">10. Contact Us</h2>
      <p>
        For any questions or concerns about this Privacy Policy, please contact us:
      </p>
      <ul className="list-disc pl-6 mt-2">
        <li><strong>Email:</strong> support@bhavnamatrimony.com</li>
        <li><strong>Phone:</strong> [Your Support Phone Number]</li>
        <li><strong>Address:</strong> [Your Business Address]</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
