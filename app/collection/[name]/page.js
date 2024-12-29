"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "@/components/Trending";
import Pagination from "@/components/Pagination";
import Loading from "@/loading"; // Add loading component

const Collection = ({ params }) => {
  const [animeList, setAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 24;
  const genreName = params.name;
  const formattedGenre = decodeURIComponent(genreName)
  .replace(/\s+/g, " ")
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join("-");
  const handlePageChange = (pageNumber) => {
    setIsLoading(true);
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchAnimeByGenre = async () => {
      try {
        const query = `
            query ($genre: String) {
              Page(page: ${currentPage}, perPage: ${itemsPerPage}) {
                media(genre: $genre, type: ANIME, sort: POPULARITY_DESC) {
                  idMal
                  title {
                    romaji
                  }
                  coverImage {
                    large
                  }
                  startDate {
                    year
                  }
                }
              }
            }
          `;

        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            variables: { genre: formattedGenre },
          }),
        });
        const { data } = await response.json();

        if (isMounted) {
          const formattedData = data.Page.media.map((anime) => ({
            mal_id: anime.idMal,
            title: anime.title.romaji,
            images: { jpg: { large_image_url: anime.coverImage.large } },
            year: anime.startDate.year,
          }));

          setAnimeList(formattedData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch anime:", error);
        setIsLoading(false);
      }
    };

    fetchAnimeByGenre();

    return () => {
      isMounted = false;
    };
  }, [genreName, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(animeList.length / itemsPerPage);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-10">
      <div className="relative mb-6 md:mb-0">
        <h1 className="text-3xl p-4 md:text-4xl font-bold text-white tracking-widest">
          {formattedGenre}
          <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-transparent bg-clip-text ml-2 md:ml-4 animate-gradient text-shadow-xl">
            Anime
          </span>
        </h1>
      </div>
      <div className="flex flex-wrap gap-6 justify-center mt-10">
        {animeList.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            mal_id={anime.mal_id}
            name={anime.title}
            imageUrl={anime.images.jpg.large_image_url}
            year={anime.year}
            genre={genreName}
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
};

export default Collection;
