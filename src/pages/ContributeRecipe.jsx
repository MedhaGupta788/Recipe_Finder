import React, { useState, useEffect } from "react";

const ContributeRecipe = ({ Crecipes }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contributedRecipes, setContributedRecipes] = useState([]);

  useEffect(() => {
    if (Array.isArray(Crecipes)) {
      setContributedRecipes(Crecipes);
    } else {
      setContributedRecipes([]);
    }
  }, [Crecipes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newRecipe = {
      title,
      ingredients: ingredients.split(","),
      instructions,
      image,
      likes: 0,
      dislikes: 0,
      id: Date.now(),
    };

    setContributedRecipes((prevRecipes) => [...prevRecipes, newRecipe]);

    setTitle("");
    setIngredients("");
    setInstructions("");
    setImage(null);
    setIsSubmitting(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleLike = (id) => {
    setContributedRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, likes: recipe.likes + 1 } : recipe
      )
    );
  };

  const handleDislike = (id) => {
    setContributedRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, dislikes: recipe.dislikes + 1 } : recipe
      )
    );
  };

  const handleShare = (id) => {
    const recipe = contributedRecipes.find((recipe) => recipe.id === id);
    const recipeLink = window.location.href + `/recipe/${id}`;
    navigator.clipboard.writeText(recipeLink).then(() => {
      alert("Recipe link copied to clipboard!");
    });
  };

  return (
    <>
      <h2 className="text-5xl font-bold text-gray-800 ml-20 mt-32">
        Contribute Your Recipe
      </h2>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10 mb-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700"
              htmlFor="title"
            >
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter recipe title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700"
              htmlFor="ingredients"
            >
              Ingredients (comma separated)
            </label>
            <input
              type="text"
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter ingredients, separated by commas"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700"
              htmlFor="instructions"
            >
              Instructions
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Describe the recipe steps"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700"
              htmlFor="image"
            >
              Upload Recipe Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageUpload}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            {image && (
              <div className="mt-4">
                <img
                  src={image}
                  alt="Recipe Preview"
                  className="max-w-xs h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Recipe"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-16 mb-20">
        <h3 className="text-5xl font-bold text-gray-800 ml-20 mt-16">
          Contributed Recipes
        </h3>

        {contributedRecipes.length === 0 ? (
          <p className="text-center text-gray-600">
            No recipes contributed yet!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ml-32 mr-32 mt-14">
            {contributedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {recipe.title}
                </h4>
                <p className="text-gray-700 mb-4">
                  {recipe.ingredients.join(", ")}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {recipe.instructions.slice(0, 100)}...
                </p>

                <div className="flex items-center justify-between text-sm text-gray-700">
                  <div className="flex items-center space-x-2 bg-blue-100 p-2 rounded-lg hover:bg-blue-200 cursor-pointer px-5">
                    <button
                      onClick={() => handleLike(recipe.id)}
                      className="hover:text-blue-500"
                    >
                      👍 {recipe.likes}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 bg-red-100 p-2 rounded-lg hover:bg-red-200 cursor-pointer ml-[-100px] px-5">
                    <button
                      onClick={() => handleDislike(recipe.id)}
                      className="hover:text-red-500"
                    >
                      👎 {recipe.dislikes}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-100 p-2 rounded-lg hover:bg-green-200 cursor-pointer px-5">
                    <button
                      onClick={() => handleShare(recipe.id)}
                      className="hover:text-green-500"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ContributeRecipe;
