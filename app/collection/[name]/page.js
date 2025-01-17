"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "@/components/Trending";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/useLanguage";
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  const [animes, setAnimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const animesPerPage = 20;
  const { name } = useParams();
  const searchParams = useSearchParams();
  const name1 = searchParams.get("name");
  console.log(name1)
  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?genres=${name}&page=${currentPage}&limit=${animesPerPage}`
        );

        const data = await response.json();
        setAnimes(data.data);
        setTotalPages(Math.ceil(data.pagination.items.total / animesPerPage));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchAnimes();
  }, [currentPage, name]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { useJapanese } = useLanguage();

  return (
    <div className="container mx-auto">
      <div className="w-full px-4"></div>
      <h2 className="text-4xl font-bold text-white m-8">{`${name1} Anime`}</h2>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 justify-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {animes.map((anime) => (
            <motion.div
              key={anime.mal_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AnimeCard
                mal_id={anime?.mal_id}
                imageUrl={anime?.images.jpg.large_image_url}
                name={
                  useJapanese
                    ? anime.title_japanese
                    : anime.title_english || anime.title
                }
                year={
                  anime.aired.from
                    ? new Date(anime.aired.from).getFullYear()
                    : "Unknown"
                }
                genre={anime.genres.map((genre) => genre.name).join(", ")}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="flex justify-center mt-4 mb-8">
        <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = currentPage + i - 2;
            return pageNumber > 0 && pageNumber <= totalPages ? (
              <motion.button
                key={pageNumber}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(pageNumber)}
                className={`w-10 h-10 flex items-center justify-center rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 ${
                  currentPage === pageNumber
                    ? "bg-pink-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {pageNumber}
              </motion.button>
            ) : null;
          })}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Page;
