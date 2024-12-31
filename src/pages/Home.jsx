import React from "react";
import { FaSearch } from "react-icons/fa"; // For search icon

import CategoriesCarousel from "../components/Categories/CategoriesCarousel";
import TrendingRecipes from "../components/TrendingRecipes";
import image from "../assets/picture.jpg";
import RecipeOfTheDay from "../components/RecipeOfTheDay";
import DietSelectionForm from "./../components/DietSelectionForm";
const Home = () => {
  return (
    <div className=" w-full ">
      <img
        src={image}
        className="h-screen w-screen object-cover relative top-0 left-0 z-0"
        alt="Background"
      />
      <div className="absolute top-64 w-full ">
        {/* Hero Section */}
        <div className="bg-cream p-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800">
            Welcome to the Recipe Finder...
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover amazing recipes and share your own!
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Search for recipes..."
            className="p-3 border border-gray-300 rounded-l-lg w-1/3"
          />
          <button className="p-3 bg-blue-600 text-white rounded-r-lg">
            <FaSearch className="text-xl" />
          </button>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="mt-12">
        <CategoriesCarousel />
      </div>
      <div className=""> <TrendingRecipes  /> </div>
      <div>
              <RecipeOfTheDay/>
          </div>
      <div>
           <DietSelectionForm
       
      />
    
      </div>
      
     

    </div>
  );
};

export default Home;


















