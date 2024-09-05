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

  const pageCount = Math.ceil(characters.length / charactersPerPage);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(pageCount, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <button key="first" onClick={() => paginate(1)} className="bg-pink-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-pink-600 transition duration-200 ease-in-out ml-1 sm:ml-2 text-sm sm:text-base">
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="px-1 sm:px-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`${currentPage === i ? 'bg-pink-600' : 'bg-pink-500'} text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-pink-600 transition duration-200 ease-in-out ml-1 sm:ml-2 text-sm sm:text-base`}
        >
          {i}
        </button>
      );
    }

    if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
        buttons.push(<span key="ellipsis2" className="px-1 sm:px-2">...</span>);
      }
      buttons.push(
        <button key="last" onClick={() => paginate(pageCount)} className="bg-pink-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-pink-600 transition duration-200 ease-in-out ml-1 sm:ml-2 text-sm sm:text-base">
          {pageCount}
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      <div className="pb-3 px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white my-4 sm:my-6 md:my-8">
          All Characters Featured in {title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 justify-items-center container mx-auto">
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
        <div className="flex justify-center mt-6 sm:mt-8">
          {renderPaginationButtons()}
        </div>
      </div>
    </>
  );
};

export default Page;
