"use client";
import React, { useEffect, useState } from "react";
import Trending from "@/components/Trending";

const recs = ({ params }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${params.id}/recommendations`)
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data.data);
        console.log(data.data);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recommendations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(recommendations.length / itemsPerPage);

  return (
    <>
      <h2 className="text-4xl font-bold text-white m-8">
        Anime Recommendations
      </h2>

      <div className="grid grid-cols-5 gap-5 container mx-auto justify-items-center">
        {currentItems.map((recommendation) => {
          const { entry, url, votes } = recommendation;
          const { mal_id, title, images } = entry;
          const imageUrl = images.jpg.image_url; 
          return (
            <Trending
              key={mal_id}
              mal_id={mal_id}
              name={title}
              imageUrl={imageUrl}
            />
          );
        })}
      </div>
      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className="ml-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg"
          >
            Previous
          </button>
        )}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNumber = currentPage - 2 + i;
          if (pageNumber > 0 && pageNumber <= totalPages) {
            return (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`ml-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg ${
                  currentPage === pageNumber ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentPage === pageNumber}
              >
                {pageNumber}
              </button>
            );
          }
          return null;
        })}
        {currentPage < totalPages && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className="ml-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default recs;
