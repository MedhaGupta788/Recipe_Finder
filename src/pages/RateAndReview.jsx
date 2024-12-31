import React, { useState } from "react";

const RateAndReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState([]);

  // Predefined reviews with usernames, images, and detailed descriptions
  const [existingReviews] = useState([
    {
      username: "Foodie123",
      rating: 5,
      review:
        "This recipe is absolutely amazing! The combination of spices and flavors is spot on. The instructions were easy to follow, and the dish turned out perfect. I made it for a family gathering, and everyone loved it. Definitely making it again!",
      image:
        "https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg", // Replace with your actual image URL
      id: 1,
    },
    {
      username: "CookingQueen",
      rating: 4,
      review:
        "Great recipe! The flavors were fantastic, though I felt it needed just a bit more seasoning. I would recommend adding some extra herbs or spices to suit your taste. Overall, it was delicious, and I will make it again soon.",
      image:
        "https://sweetcsdesigns.com/wp-content/uploads/2024/01/The-Best-Homemade-Pizza-Recipe-Picture2-scaled.jpg", // Replace with your actual image URL
      id: 2,
    },
    {
      username: "HomeChef",
      rating: 3,
      review:
        "The recipe was good, but I wasn’t completely satisfied. It was a bit bland for my liking, and I had to add extra salt and pepper. The steps were easy to follow, and the ingredients were readily available, but I feel it could use some extra flavor.",
      image:
        "https://www.glorioustreats.com/wp-content/uploads/2014/05/best-carrot-cake-recipe-square.jpeg", // Replace with your actual image URL
      id: 3,
    },

    {
      username: "FoodieKing",
      rating: 5,
      review:
        "Absolutely loved this recipe! The texture was just perfect, and the balance of spices was impeccable. I made it for a potluck, and it disappeared within minutes. The dish is simple enough for a weekday meal yet sophisticated enough for a dinner party. Will definitely add this to my go-to recipes.",
      image:
        "https://tastesbetterfromscratch.com/wp-content/uploads/2019/10/Pumpkin-Roll24-1-500x500.jpg",
      id: 4,
    },
    {
      username: "King",
      rating: 4,
      review:
        "This is a solid recipe! It turned out well, but I felt it could use a bit more heat. For spice lovers like me, adding a teaspoon of red chili powder or freshly ground pepper will bring it to the next level. I appreciate how easy and quick it was to prepare. Highly recommended for busy weeknights!",
      image:
        "https://tastesbetterfromscratch.com/wp-content/uploads/2023/10/Chow-Mein-1-500x500.jpg",
      id: 5,
    },
  ]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (rating === 0 || review.trim() === "" || username.trim() === "") {
      alert("Please provide a rating, review, and username.");
      return;
    }

    const newReview = {
      username,
      rating,
      review,
      image,
      id: Date.now(),
    };

    setSubmittedReviews((prevReviews) => [...prevReviews, newReview]);
    setRating(0);
    setReview("");
    setImage(null);
    setUsername("");
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-6 w-6 ${
              star <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 17.75l-6.16 3.24 1.18-7.2-5.23-5.1 7.23-1.05L12 2.25l3.98 7.69 7.23 1.05-5.23 5.1 1.18 7.2L12 17.75z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <>
      <h2 className="text-5xl font-bold text-gray-800 ml-20 mt-32">
        Rate and Review
      </h2>
      <div className="container mx-auto mt-10 p-6">
        {/* Review Submission Form */}
        <form
          onSubmit={handleSubmitReview}
          className="bg-gray-100 p-6 rounded-lg shadow-md max-w-xl mx-auto"
        >
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="rating"
            >
              Rate (1 to 5 stars)
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= rating ? "text-yellow-500" : "text-gray-400"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 17.75l-6.16 3.24 1.18-7.2-5.23-5.1 7.23-1.05L12 2.25l3.98 7.69 7.23 1.05-5.23 5.1 1.18 7.2L12 17.75z"
                  />
                </svg>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="review"
            >
              Write your review
            </label>
            <textarea
              id="review"
              value={review}
              onChange={handleReviewChange}
              placeholder="Share your thoughts about the recipe..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="image"
            >
              Upload an Image (optional)
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Submit Review
            </button>
          </div>
        </form>

        {/* Display Reviews */}
        <div className="mt-10">
          <h3 className="text-5xl font-bold text-gray-800 ml-20 mt-32">
            Reviews
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ml-32 mt-10 mr-36 mb-12">
            {[...existingReviews, ...submittedReviews].map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="mb-4">
                  <strong>{review.username}</strong>
                </div>
                <div className="mb-4">{renderStars(review.rating)}</div>
                {review.image && (
                  <div className="mb-4">
                    <img
                      src={review.image}
                      alt="Review"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                <p className="text-gray-700 mt-4">{review.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RateAndReview;
