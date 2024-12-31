import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-auto ">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {/* About Us Section */}
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold">Recipe Finder</h2>
            <p className="text-sm">
              Recipe Finder is your go-to platform for discovering diet-specific
              recipes. We aim to make healthy eating easy and fun by providing
              you with a wide variety of recipes suited to your dietary
              preferences. Whether you're looking for Keto, Vegan, or
              Gluten-Free options, we have you covered!
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4 m-auto ">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-400">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-gray-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-gray-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Media Section */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm">
              Have any questions or feedback? We would love to hear from you!
              Reach out to us through our social media channels or contact page.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                Twitter
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Legal Section */}
        <div className="border-t border-gray-700 pt-6 mt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Recipe Finder. All rights reserved. |{" "}
            <Link to="/privacy-policy" className="hover:text-gray-400">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link to="/terms-of-service" className="hover:text-gray-400">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
