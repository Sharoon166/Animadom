"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "@/components/CharCard";

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

  return (
    <>
      <div className="pb-3">
        <h2 className="text-4xl font-bold text-white m-8">
          All Characters Featured in {title}
        </h2>
        <div className="grid grid-cols-5 gap-5 justify-items-center container mx-auto">
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
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(characters.length / charactersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition duration-200 ease-in-out ml-2"
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
