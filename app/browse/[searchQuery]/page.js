"use client";

import React, { useEffect, useState } from "react";
import Trending from "@/components/Trending";
import Pagination from "@/components/Pagination";

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
    <div className="container mx-auto space-y-10 mb-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl mt-6 sm:mt-10 p-4 sm:p-8">
        Search Results for "{searchQuery}"{" "}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 justify-items-center">
        {searchResults.map((search) => {
          const {
            mal_id,
            title_english,
            images: {
              jpg: { image_url },
            },
            year,
          } = search;
          return (
            <Trending
              key={mal_id}
              mal_id={mal_id}
              name={title_english}
              imageUrl={image_url}
              year={year}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default page;
