"use client";

import React, { useEffect, useState } from "react";
import Trending from "@/components/Trending";

function page({ params }) {
  const { searchQuery } = params;
  let [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;

  useEffect(() => {
    console.log(searchQuery);
    fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&order_by=popularity&limit=${resultsPerPage}&page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data?.data);
        console.log(data.data);
      });
  }, [searchQuery, currentPage]);

  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto space-y-10 mb-20">
      <h2 className="text-2xl mt-10 p-8 ">
        Search Results for "{searchQuery}"{" "}
      </h2>
      <div className="grid grid-cols-5 gap-5 justify-items-center">
        {searchResults.map((search) => {
          const {
            mal_id,
            title,
            images: {
              jpg: { image_url },
            },
            year,
          } = search;
          return (
            <Trending
              key={mal_id}
              mal_id={mal_id}
              name={title}
              imageUrl={image_url}
              year={year}
            />
          );
        })}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="ml-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default page;
