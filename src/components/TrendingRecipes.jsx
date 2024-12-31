import React, { useState, useEffect } from "react";

const TrendingRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingRecipes = async () => {
      try {
        const response = await fetch(
          "https://api.spoonacular.com/recipes/complexSearch?sort=random&apiKey=bfb6055bfe7c4dbc8b67d99a91c70646"
        );
        const data = await response.json();
        setRecipes(data.results); // Set the recipes data from API response
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-8 px-4 rounded-lg shadow-md mt-20">
      <h2 className="text-5xl font-bold text-gray-800 ml-20 ">
        Trending Recipes
      </h2>
      <div className="flex overflow-x-auto space-x-6 pb-4 ml-36 mr-40 mt-10">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden w-80 flex-shrink-0 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl
            "
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 truncate">
                {recipe.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                {recipe.summary?.slice(0, 100) || "No description available."}
              </p>
            </div>
            <div className="p-4 text-center">
              <a
                href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                Explore Recipe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingRecipes;
