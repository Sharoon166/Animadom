"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "@/components/Trending";
import Pagination from "@/components/Pagination";
import { useLanguage } from "@/components/useLanguage";

const Upcoming = () => {
  const [anime, setAnime] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20;
  const { useJapanese } = useLanguage();

  useEffect(() => {
    fetch(
      `https://api.jikan.moe/v4/seasons/upcoming?page=${currentPage}&limit=${itemsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAnime(data.data);
        setTotalPages(Math.ceil(data.pagination.items.total / itemsPerPage));
      });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="">
      <div className="relative mb-6 md:mb-0">
                <h1 className="text-3xl p-4 md:text-4xl font-bold text-white tracking-widest">
                  Upcoming
                  <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-transparent bg-clip-text ml-2 md:ml-4 animate-gradient text-shadow-xl">
                    Anime
                  </span>
                </h1>
               
              </div>
        <div className="flex flex-wrap gap-6 justify-center mt-10">
          {anime?.map((anime) => (
            <div key={anime.mal_id} className="m-4">
              <AnimeCard
                mal_id={anime.mal_id}
                name={
                  useJapanese ? anime.title : anime.title_english || anime.title
                }
                imageUrl={anime.images.jpg.image_url}
                year={new Date(anime.aired.from).getFullYear()}
                genre={anime.genres[0]?.name || "N/A"}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8 mb-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
