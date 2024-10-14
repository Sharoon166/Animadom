"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "@/components/CharCard";
import Pagination from "@/components/Pagination";

const Page = ({ params }) => {
  const [characters, setCharacters] = useState([]);
  const [anime, setAnime] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 15;

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${params.id}/characters`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.data);
      });
    fetch(`https://api.jikan.moe/v4/anime/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnime(data.data);
      });
  }, []);

  const { title } = anime;

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(characters.length / charactersPerPage);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white my-4 sm:my-6 md:my-8">
        All Characters Featured in {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {currentCharacters.map((char) => (
          <AnimeCard
            key={char.character.mal_id}
            id={char.character.mal_id}
            name={char.character.name}
            imageUrl={char.character.images.jpg.image_url}
            favs={`Favorites: ${char.favorites}`}
            nicks={char.role}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
    </div>
  );
};

export default Page;
