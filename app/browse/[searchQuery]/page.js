"use client";

import React, { useEffect, useState } from "react";
import Trending from "@/components/Trending";
import Pagination from "@/components/Pagination";
import { useLanguage } from "@/components/useLanguage";

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
  const { useJapanese } = useLanguage();

  return (
    <div className="container mx-auto space-y-6 sm:space-y-10 mb-10 sm:mb-20 px-2 sm:px-4 md:px-6 lg:px-8">
      <h2 className="text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6 md:mt-10 p-2 sm:p-4 md:p-8">
        Search Results for "{searchQuery}"{" "}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5 justify-items-center">
        {searchResults.map((anime) => (
          <Trending
            key={anime.mal_id}
            mal_id={anime.mal_id}
            name={useJapanese ? anime.title : (anime.title_english || anime.title)}
            imageUrl={anime.images.jpg.image_url}
            year={new Date(anime.aired.from).getFullYear()}
            genre={anime.genres[0]?.name || 'N/A'}
          />
        ))}
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
