import React, { useState } from "react";
import axios from "axios";

const CraveList = () => {
  const [sections, setSections] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
    Desserts: [],
  }); // State for multiple crave sections
  const [newItem, setNewItem] = useState(""); // State for the new item input
  const [selectedSection, setSelectedSection] = useState("Breakfast"); // Current section
  const [recipes, setRecipes] = useState({}); // State to store recipes for each item
  const [loading, setLoading] = useState(false); // State to track loading

  // Add item to a specific section
  const addItem = () => {
    if (newItem.trim() !== "") {
      setSections((prevSections) => ({
        ...prevSections,
        [selectedSection]: [...prevSections[selectedSection], newItem],
      }));
      setNewItem(""); // Clear the input
    }
  };

  // Remove item from a specific section
  const removeItem = (section, index) => {
    const updatedSection = sections[section].filter((_, i) => i !== index);
    setSections((prevSections) => ({
      ...prevSections,
      [section]: updatedSection,
    }));
    const updatedRecipes = { ...recipes };
    delete updatedRecipes[sections[section][index]];
    setRecipes(updatedRecipes);
  };

  // Fetch recipes for an item
  const fetchRecipes = async (item) => {
    setLoading(true);
    try {
      const apiKey = "bfb6055bfe7c4dbc8b67d99a91c70646";
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${item}&apiKey=${apiKey}`
      );
      setRecipes((prev) => ({
        ...prev,
        [item]: response.data.results,
      }));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-5xl font-bold text-gray-800 ml-20 mt-32">
        Your Crave List
      </h2>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10 mb-10">
        {/* Section Selector */}
        <div className="flex justify-center mb-6">
          {Object.keys(sections).map((section) => (
            <button
              key={section}
              onClick={() => setSelectedSection(section)}
              className={`px-4 py-2 mx-2 rounded-lg ${
                selectedSection === section
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } transition duration-200`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Input to Add a New Item */}
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Add an item to ${selectedSection}...`}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addItem}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add
          </button>
        </div>

        {/* Display Crave List for the Selected Section */}
        {sections[selectedSection].length > 0 ? (
          <ul className="space-y-4">
            {sections[selectedSection].map((item, index) => (
              <li
                key={index}
                className="p-4 bg-white rounded-lg shadow-md space-y-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">{item}</span>
                  <button
                    onClick={() => removeItem(selectedSection, index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
                <button
                  onClick={() => fetchRecipes(item)}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Find Recipes
                </button>

                {/* Display Recipes */}
                {recipes[item] && (
                  <div className="mt-4 space-y-2">
                    <h3 className="text-gray-700 font-semibold">
                      Recipes for "{item}":
                    </h3>
                    <ul className="list-disc ml-4">
                      {recipes[item].map((recipe) => (
                        <li key={recipe.id}>
                          <a
                            href={`https://spoonacular.com/recipes/${recipe.title.replace(
                              /\s+/g,
                              "-"
                            )}-${recipe.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {recipe.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">
            Your {selectedSection} list is empty.
          </p>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center mt-4">
            <span className="text-gray-600">Fetching recipes...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default CraveList;
