import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios"; // Import axios for API calls
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import categoriesData from "../../data/categoriesData.json"; // Local JSON data
import CategoriesDetail from "./CategoriesDetail";

const CategoriesCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null); // To store the selected category's detailed data
  const navigate = useNavigate(); // To navigate programmatically

  // Handle previous and next buttons
  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex < categoriesData.length - 3 ? prevIndex + 1 : prevIndex
    );
  };

  // Handle Explore button click: fetch data from API
  const handleExplore = async (categoryId) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?category=${categoryId}&apiKey=bfb6055bfe7c4dbc8b67d99a91c70646`
      );
      setSelectedCategoryData(response.data); // Save the data to state
      console.log("Fetched category data:", response.data);

      // Navigate to another page (e.g., CategoriesDetail page)
      navigate(`/categories/${categoryId}`);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  return (
    <div className="w-full max-w-7xl ml-20 mt-14 px-4">
      <h2 className="text-5xl font-bold text-gray-800 mb-6">
        Explore Categories
      </h2>
      <div className="relative flex items-center ml-20 mt-9">
        {/* Left Arrow */}
        {startIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 focus:outline-none"
          >
            <FaChevronLeft />
          </button>
        )}

        {/* Cards */}
        <div className="flex overflow-hidden space-x-4 w-full">
          <div
            className="flex space-x-4 transition-transform duration-500"
            style={{ transform: `translateX(-${startIndex * 33.33}%)` }}
          >
            {categoriesData.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-1/3 sm:w-1/2 lg:w-1/3"
              >
                <div className="bg-gray-100 rounded-lg shadow-lg p-4 hover:shadow-2xl  ">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{category.description}</p>
                  </div>
                  <div className="mt-4 text-center">
                    {/* Button to fetch data and navigate */}
                    <button
                      onClick={() => handleExplore(category.id)} // Fetch data when "Explore" is clicked
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {startIndex < categoriesData.length - 3 && (
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 focus:outline-none"
          >
            <FaChevronRight />
          </button>
        )}
      </div>

      {/* Show Selected Category Data (if available) */}
      {selectedCategoryData && (
        <div className="mt-12 p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold">{selectedCategoryData.title}</h3>
          <p className="mt-4 text-gray-600">
            {selectedCategoryData.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoriesCarousel;
