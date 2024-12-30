"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import Link from "next/link";
import AnimeCard from "@/components/Trending";
import Pagination from "@/components/Pagination";
import Loading from "@/loading";
import { LanguageProvider, useLanguage } from "@/components/useLanguage";

const CollectionContent = ({ params }) => {
  const router = useRouter();
  const { useJapanese } = useLanguage();
  const [animeList, setAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 24;
  const searchTerm = params.name;
  const formattedTerm = decodeURIComponent(searchTerm)
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

    const fetchAnime = async () => {
      try {
        const query = `
          query ($term: String) {
            byGenre: Page(page: ${currentPage}, perPage: ${itemsPerPage}) {
              pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
              }
              media(genre: $term, type: ANIME, sort: POPULARITY_DESC) {
                idMal
                title {
                  romaji
                  native
                }
                coverImage {
                  large
                }
                startDate {
                  year
                }
              }
            }
            byTag: Page(page: ${currentPage}, perPage: ${itemsPerPage}) {
              pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
              }
              media(tag: $term, type: ANIME, sort: POPULARITY_DESC) {
                idMal
                title {
                  romaji
                  native
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
            variables: { term: formattedTerm },
          }),
        });
        const { data } = await response.json();

        if (isMounted) {
          const formatAnimeData = (animeList) =>
            animeList.map((anime) => ({
              mal_id: anime.idMal,
              title: useJapanese ? anime.title.native : anime.title.romaji,
              images: { jpg: { large_image_url: anime.coverImage.large } },
              year: anime.startDate.year,
            }));

          const genreResults = formatAnimeData(data.byGenre.media);
          const tagResults = formatAnimeData(data.byTag.media);

          const combinedResults = [...genreResults, ...tagResults].reduce(
            (acc, current) => {
              const x = acc.find((item) => item.mal_id === current.mal_id);
              if (!x) {
                return acc.concat([current]);
              }
              return acc;
            },
            []
          );

          const totalGenre = data.byGenre.pageInfo.total || 0;
          const totalTag = data.byTag.pageInfo.total || 0;
          const maxTotal = Math.max(totalGenre, totalTag);

          setTotalItems(maxTotal);
          setAnimeList(combinedResults);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch anime:", error);
        setIsLoading(false);
      }
    };

    fetchAnime();

    return () => {
      isMounted = false;
    };
  }, [searchTerm, currentPage, itemsPerPage, useJapanese]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (isLoading) {
    return <Loading />;
  }

  if (animeList.length === 0) {
    return (
      <div className="flex justify-center flex-col gap-4 items-center min-h-screen">
        <img
          src="/404.png"
          alt=""
          className="object-cover object-center w-full invert md:w-1/3 m-auto"
        />
        <h2 className="text-yellow-500 text-2xl text-center px-4">
          No anime found in this category
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="text-yellow-500 flex items-center gap-2 text-xl px-4 py-2 border-yellow-600 border rounded-lg hover:bg-yellow-600 hover:text-[#121212] font-mono transition-colors duration-150"
          >
            <FaArrowLeft /> Back
          </button>
          <Link
            href="/"
            className="text-yellow-500 flex items-center gap-2 text-xl px-4 py-2 border-yellow-600 border rounded-lg hover:bg-yellow-600 hover:text-[#121212] font-mono transition-colors duration-150"
          >
            <FaHome /> Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="relative mb-6 md:mb-0">
        <h1 className="text-3xl p-4 md:text-4xl font-bold text-white tracking-widest">
          {formattedTerm}
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
            searchTerm={searchTerm}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

const Collection = (props) => {
  return (
    <LanguageProvider>
      <CollectionContent {...props} />
    </LanguageProvider>
  );
};

export default Collection;
