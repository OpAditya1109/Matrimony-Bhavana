import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">🔁 Refund Policy – Bhavana Matrimony</h1>
      <p className="mb-4">
        At <strong>Bhavana Matrimony</strong>, we aim to provide transparent and trustworthy services to help you find your life partner.
        Please read our refund policy carefully before making any purchase.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Free Plan</h2>
      <p className="mb-4">
        Our Free Plan is completely free of cost. There are no charges, hence no refunds applicable.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Paid Plans (Premium/Gold)</h2>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>100% Refund</strong> within <strong>24 hours</strong> of purchase, provided no matches or services have been used.</li>
        <li><strong>No refund</strong> will be issued if:
          <ul className="list-disc ml-6 mt-2">
            <li>You have already used messaging, contact views, or sent interest.</li>
            <li>The refund request is made after 24 hours of purchase.</li>
            <li>The plan was purchased using a promotional discount or offer.</li>
          </ul>
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Cancellation</h2>
      <p className="mb-4">
        You may cancel your subscription at any time, but cancellation does not entitle you to a refund.
        Your plan will remain active until its expiry date.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Special Offers & Campaigns</h2>
      <p className="mb-4">
        Refunds are <strong>not applicable</strong> on discounted or special promotional plans unless clearly mentioned otherwise.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. How to Request a Refund</h2>
      <p className="mb-4">
        If you are eligible, email us at <a href="mailto:support@bhavanamatrimony.in" className="text-blue-600 underline">
        support@bhavanamatrimony.in</a> within 24 hours of purchase with the subject line: 
        <em> Refund Request – [Your User ID]</em>.
      </p>
    </div>
  );
};

export default RefundPolicy;
