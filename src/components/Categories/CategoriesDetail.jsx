import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CategoriesDetail = () => {
  const { categoryId } = useParams(); // Get categoryId from URL params
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true); // Set loading state to true when the API is called
      setError(null); // Reset error state

      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?category=${categoryId}&apiKey=bfb6055bfe7c4dbc8b67d99a91c70646`
        );

        // Log the response to see its structure
        console.log(response.data);

        // Assuming the response contains a list of recipes or data, handle it accordingly
        if (response.data.results && response.data.results.length > 0) {
          setCategoryData(response.data.results); // Store the whole list of results
        } else {
          setCategoryData([]); // If no data found for the category
        }
      } catch (error) {
        console.error("Error fetching category details:", error);
        setError("Failed to fetch category data");
      } finally {
        setLoading(false); // Stop loading after the API call is finished
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  // Loading and error handling
  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="mt-12 p-6 bg-gray-100 rounded-lg shadow-md">
      {categoryData.length > 0 ? (
        <div>
          <h2 className="text-3xl font-bold">Category: {categoryId}</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Loop through the recipes */}
            {categoryData.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="mt-4 text-xl font-semibold">{recipe.title}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No recipes found in this category.</p>
      )}
    </div>
  );
};

export default CategoriesDetail;
