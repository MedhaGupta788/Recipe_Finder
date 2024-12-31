import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

const RecipeOfTheDay = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeOfTheDay = async () => {
      try {
        const response = await fetch(
          "https://api.spoonacular.com/recipes/random?apiKey=bfb6055bfe7c4dbc8b67d99a91c70646"
        );
        const data = await response.json();
        setRecipe(data.recipes[0]); // Set the first random recipe from the API
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeOfTheDay();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
      </div>
    );
  }

  if (!recipe) {
    return <div>Unable to fetch Recipe of the Day.</div>;
  }

  return (
    <>
      <h2 className="text-5xl font-bold text-gray-800 ml-20 mt-14">
        Recipe of the Day
      </h2>

      <div className="p-6 md:p-10 rounded-lg shadow-2xl mb-12 w-full md:w-3/4 lg:w-1/2 mx-auto mt-9">
        <div className="flex flex-col items-center bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-6 text-center space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              {recipe.title}
            </h3>
            <div className="text-gray-600 text-sm md:text-base mb-4">
              {recipe.summary
                ? parse(recipe.summary.slice(0, 150) + "...")
                : "No description available"}
            </div>
            <div className="text-center">
              <a
                href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md"
              >
                Explore Recipe
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeOfTheDay;
