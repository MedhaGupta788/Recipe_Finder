import React from "react";

const CategoryCard = ({ category }) => {
  return (
    <div className="relative bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-80">
      {/* Image */}
      <img
        src={category.image}
        alt={category.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {category.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {category.description}
        </p>
      </div>
      {/* Action Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white py-2 text-center font-medium cursor-pointer hover:bg-blue-600 transition-colors">
        Explore
      </div>
    </div>
  );
};

export default CategoryCard;
