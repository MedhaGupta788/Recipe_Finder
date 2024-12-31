import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // to get route params

const DietSpecificRecipes = () => {
  const { dietType } = useParams(); // Get the dietType from URL
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error

      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?diet=${dietType}&number=12&apiKey=bfb6055bfe7c4dbc8b67d99a91c70646`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setRecipes(data.results || []); // Ensure we handle empty results gracefully
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (dietType) {
      fetchRecipes();
    }
  }, [dietType]);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Delicious {dietType.charAt(0).toUpperCase() + dietType.slice(1)} Recipes
      </h2>

      {loading ? (
        <div className="text-center text-gray-700">Loading recipes...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={recipe.image || "/placeholder-image.jpg"} // Fallback for missing image
                alt={recipe.title || "Recipe"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 h-16">
                  {recipe.title || "Untitled Recipe"}
                </h3>

                <a
                  href={`/recipe-details/${recipe.id}`}
                  className="text-blue-500 font-semibold hover:underline "
                >
                  <div className="">View Full Recipe</div>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center text-gray-700">
          No recipes found for this diet.
        </div>
      )}
    </div>
  );
};

export default DietSpecificRecipes;
