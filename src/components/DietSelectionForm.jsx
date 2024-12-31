import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const DietSelectionForm = () => {
  const [selectedDiet, setSelectedDiet] = useState("");
  const [showRecipes, setShowRecipes] = useState(false);

  const handleDietChange = (e) => {
    setSelectedDiet(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDiet) {
      setShowRecipes(true); // Show recipes once diet is selected
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-5xl font-bold text-gray-800 ml-20">
        Choose Your Diet Type
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-12"
      >
        <div className="mb-6">
          <label
            htmlFor="dietType"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Select Your Diet
          </label>
          <select
            id="dietType"
            value={selectedDiet}
            onChange={handleDietChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select Diet--</option>
            <option value="keto">Keto</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
            <option value="paleo">Paleo</option>
            <option value="low-carb">Low-Carb</option>
            <option value="high-protein">High-Protein</option>
            <option value="mediterranean">Mediterranean</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Get Recipes
        </button>
      </form>

      {showRecipes && selectedDiet && (
        <div className="mt-8">
          {/* Use Link to navigate to the diet-specific route */}
          <Link
            to={`/dietSpecificRecipe/${selectedDiet}`}
            className="text-blue-500"
          >
            View {selectedDiet} Recipes
          </Link>
        </div>
      )}
    </div>
  );
};

export default DietSelectionForm;
