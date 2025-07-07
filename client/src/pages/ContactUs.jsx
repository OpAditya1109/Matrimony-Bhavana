const ContactUs = () => {
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-6">Contact Us</h1>
      <p className="text-gray-700 text-lg mb-4">
        We'd love to hear from you! Whether you have questions, feedback, or need assistance,
        feel free to get in touch.
      </p>

      <div className="text-left mt-8">
        <p className="mb-2"><strong>Email:</strong> matrimonybhavana@gmail.com </p>
        <p className="mb-2"><strong>Phone:</strong> +91 92700 96633</p>
        {/* <p className="mb-2"><strong>Office Address:</strong> 123, Wedding Street, Pune, India</p> */}
      </div>

      {/* <form className="mt-8 max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Your Message"
          className="w-full border p-2 rounded h-32"
          required
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Send Message
        </button>
      </form> */}
    </section>
  );
};

export default ContactUs;
