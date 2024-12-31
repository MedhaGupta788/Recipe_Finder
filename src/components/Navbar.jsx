import React, { useState } from "react";
import { FaHome, FaList, FaHeart, FaUpload, FaStar } from "react-icons/fa"; // React Icons
import { FiChevronDown } from "react-icons/fi"; // Dropdown Icon
import { Link } from "react-router-dom"; // For navigation links

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false); // State for toggling the dropdown

  // List of categories with their links
  const categories = [
    { name: "Keto", path: "/categories/keto" },
    { name: "Vegan", path: "/categories/vegan" },
    { name: "Vegetarian", path: "/categories/vegetarian" },
    { name: "Gluten-Free", path: "/categories/gluten-free" },
    { name: "Paleo", path: "/categories/paleo" },
    { name: "Mediterranean", path: "/categories/mediterranean" },
    { name: "Low-Carb", path: "/categories/low-carb" },
    { name: "High-Protein", path: "/categories/high-protein" },
  ];

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-full max-w-5xl mx-auto">
      <div className="flex justify-evenly items-center relative">
        {/* Home */}
        <Link
          to="/"
          className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-blue-600 hover:text-yellow-400 hover:rounded-lg transition-all duration-200"
        >
          <FaHome className="text-xl" />
          <span className="text-lg font-medium">Home</span>
        </Link>

        {/* Categories with Dropdown */}
        <div
          className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-blue-600 hover:text-yellow-400 hover:rounded-lg transition-all duration-200 relative"
          onClick={() => setShowCategories((prev) => !prev)} // Toggle dropdown
        >
          <FaList className="text-xl" />
          <span className="text-lg font-medium">Categories</span>
          <FiChevronDown className="text-lg" />
          {showCategories && (
            <div className="absolute top-12 left-0 bg-white text-gray-800 rounded-lg shadow-md mt-2 w-48 z-50">
              <ul className="flex flex-col">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      to={category.path}
                      className="block px-4 py-2 hover:bg-gray-200 hover:text-blue-600 transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Crave List */}
        <Link
          to="/crave-list"
          className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-blue-600 hover:text-yellow-400 hover:rounded-lg transition-all duration-200"
        >
          <FaHeart className="text-xl" />
          <span className="text-lg font-medium">Crave List</span>
        </Link>

        {/* Contribute Recipe */}
        <Link
          to="/contribute-recipe"
          className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-blue-600 hover:text-yellow-400 hover:rounded-lg transition-all duration-200"
        >
          <FaUpload className="text-xl" />
          <span className="text-lg font-medium">Contribute Recipe</span>
        </Link>

        {/* Rate & Review */}
        <Link
          to="/rate-review"
          className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-blue-600 hover:text-yellow-400 hover:rounded-lg transition-all duration-200"
        >
          <FaStar className="text-xl" />
          <span className="text-lg font-medium">Rate & Review</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
