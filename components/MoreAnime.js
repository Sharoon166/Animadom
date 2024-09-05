"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "./Trending";

const MoreAnime = () => {
  const [anime, setAnime] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchAnime(currentPage);
  }, [currentPage]);

  const fetchAnime = (page) => {
    fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setAnime(data.data);
        setTotalPages(data.pagination.last_visible_page);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const topAnimeSection = document.getElementById('top-anime-section');
    if (topAnimeSection) {
      topAnimeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`bg-pink-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-pink-600 transition duration-200 ease-in-out ml-1 sm:ml-2 text-xs sm:text-base ${
            currentPage === i ? 'bg-pink-600' : ''
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <>
      <h2 id="top-anime-section" className="text-4xl font-bold text-white m-8">Top Anime</h2>
      <div className="flex flex-wrap justify-center items-center">
        {anime?.map((anime) => {
          const { mal_id, images, title, year, genres } = anime;
          return (
            <div key={mal_id} className="m-4">
              <AnimeCard
                mal_id={mal_id}
                imageUrl={images.jpg.image_url}
                name={title}
                year={year}
                genre={genres.map((genre) => genre.name).join(", ")}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center mt-8 mb-8">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-pink-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-pink-600 transition duration-200 ease-in-out ml-1 sm:ml-2 text-xs sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {renderPagination()}
        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="bg-pink-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-pink-600 transition duration-200 ease-in-out ml-1 sm:ml-2 text-xs sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MoreAnime;
