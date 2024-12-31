import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import CategoriesDetail from "./components/Categories/CategoriesDetail";
import DietSpecificRecipes from "./components/DietSpecificRecipes";
import CraveList from "./pages/CraveList";
import ContributeRecipe from "./pages/ContributeRecipe";
import contributeRecipeData from "./data/contributeRecipeData.json";
import RateAndReview from "./pages/RateAndReview";

const App = () => {
  return (
    <div className="">
      {/* Background Image */}

      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 flex justify-center w-full z-10">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div>
        {/* Place BrowserRouter here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/categories/:categoryId"
            element={<CategoriesDetail />}
          />
          <Route
            path="/dietSpecificRecipe/:dietType"
            element={<DietSpecificRecipes />}
          />
          <Route path="/crave-list" element={<CraveList />} />
          <Route
            path="/contribute-recipe"
            element={
              <ContributeRecipe
                Crecipes={contributeRecipeData.contributeRecipeData}
              />
            }
          />

          <Route
            path="/rate-review"
            element={
              <RateAndReview/>
            }
          />
        </Routes>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
