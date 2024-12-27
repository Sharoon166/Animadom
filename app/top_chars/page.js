"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "@/components/CharCard";
import Search from "@/components/CharSearch";
import Pagination from "@/components/Pagination";

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
      <div className="relative mb-6 md:mb-0">
                <h1 className="text-3xl p-6 md:text-4xl font-bold text-white tracking-widest">
                  Top Characters
                  <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-transparent bg-clip-text ml-2 md:ml-4 animate-gradient text-shadow-xl">
                    By Favourites
                  </span>
                </h1>
               
              </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-6 md:gap-8 justify-items-center">
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default Page;
