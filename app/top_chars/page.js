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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-6 md:gap-8 justify-items-center">
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
