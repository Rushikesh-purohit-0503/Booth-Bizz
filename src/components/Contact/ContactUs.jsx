import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrLocation, GrMailOption, GrPhone } from "react-icons/gr";
import { Link } from "react-router-dom";

function ContactUs() {
  return (
    <div  className="min-h-screen  py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          Contact Us
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">BoothBiz</h2>
            <p className="text-gray-600 mb-8">
              Feel free to reach out to us via the contact form. We're here
              to assist you with any inquiries or feedback you may have. We look
              forward to hearing from you!
            </p>
            <div className="flex space-x-6">
              <SocialLink href="https://in.linkedin.com/" icon={<FaLinkedin />} color="text-blue-600 hover:text-blue-800" />
              <SocialLink href="https://in.linkedin.com/" icon={<FaInstagram />} color="text-pink-500 hover:text-pink-700" />
              <SocialLink href="https://x.com/" icon={<FaXTwitter />} color="text-gray-800 hover:text-gray-600" />
              <SocialLink href="https://www.facebook.com/" icon={<FaFacebook />} color="text-blue-700 hover:text-blue-900" />
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <ContactDetail icon={<GrLocation />} text="Surat, Gujarat, India" />
            <ContactDetail icon={<GrMailOption />} text="info@example.com" />
            <ContactDetail icon={<GrPhone />} text="+91 98765 43210" />
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6">
              <Input placeholder="Your Name" type="text" />
              <Input placeholder="Your Email" type="email" />
              <Input placeholder="Subject" type="text" />
              <textarea
                placeholder="Message"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 h-32 resize-none"
              />
              <Link to="/" className="block">
                <button className="w-full py-3 px-4 bg-red-300 text-gray-700 font-semibold rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  Send Message
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const SocialLink = ({ href, icon, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${color} transition-colors duration-300`}
  >
    {React.cloneElement(icon, { className: "w-6 h-6" })}
  </a>
);

const ContactDetail = ({ icon, text }) => (
  <div className="flex items-center space-x-4 mb-6 last:mb-0">
    <div className="bg-gray-100 p-3 rounded-full">
      {React.cloneElement(icon, { className: "w-6 h-6 text-gray-600" })}
    </div>
    <span className="text-gray-700">{text}</span>
  </div>
);

const Input = ({ placeholder, type }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
  />
);

export default ContactUs;