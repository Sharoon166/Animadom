"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "@/components/CharCard";
import Search from "@/components/CharSearch";

const Page = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const charactersPerPage = 20;

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/top/characters?q=sort=desc&page=${currentPage}&limit=${charactersPerPage}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.data || []);
        setTotalPages(Math.ceil(data.pagination.items.total / charactersPerPage));
        console.log(data.data);
      });
  }, [currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto">
      <div className="w-full px-4">
        <Search />
      </div>
      <h2 className="text-4xl font-bold text-white m-8">
        Top Characters by Favorites
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 justify-items-center p-3 pb-5">
        {characters.map((char) => (
          <AnimeCard
            key={char.mal_id}
            id={char.mal_id}
            name={char.name}
            imageUrl={char.images?.jpg?.image_url}
            favs={`Favorites: ${char.favorites}`}
            nicks={char.name_kanji}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4 mb-8">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNumber = currentPage + i - 2;
          return pageNumber > 0 && pageNumber <= totalPages ? (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              className={`px-4 py-2 mx-1 ${
                currentPage === pageNumber ? 'bg-pink-500' : 'bg-pink-500'
              } hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg`}
            >
              {pageNumber}
            </button>
          ) : null;
        })}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className=" ml-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
