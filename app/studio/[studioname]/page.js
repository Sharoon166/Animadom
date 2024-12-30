"use client";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AnimeCard from "@/components/Trending";
import Loading from "@/loading";
import Pagination from "@/components/Pagination";
import { useLanguage } from "@/components/useLanguage";

const StudioPage = ({ params }) => {
  const router = useRouter();
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { useJapanese } = useLanguage();
  const name = decodeURIComponent(params.studioname)
    .replace(/\s+/g, " ")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");

  useEffect(() => {
    const fetchStudioAnime = async () => {
      const query = `
      query ($name: String, $page: Int) {
        Studio(search: $name) {
          name
          media(sort: POPULARITY_DESC, page: $page, perPage: 12) {
            nodes {
              idMal
              title {
                romaji
                english
              }
              coverImage {
                large
              }
              startDate {
                year
              }
              genres
            }
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
            }
          }
        }
      }
    `;

      try {
        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: query,
            variables: {
              name: name,
              page: currentPage,
            },
          }),
        });

        const { data } = await response.json();
        setAnimeList(data.Studio.media.nodes);
        setTotalPages(data.Studio.media.pageInfo.lastPage);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching studio anime:", error);
        setIsLoading(false);
      }
    };

    fetchStudioAnime();
  }, [currentPage, name]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <Loading />;

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-widest">
        Anime By
        <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-transparent bg-clip-text ml-2 md:ml-4 animate-gradient text-shadow-xl">
          {name}
        </span>
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {animeList.map((anime) => (
          <AnimeCard
            key={anime.idMal}
            mal_id={anime.idMal}
            name={
              useJapanese
                ? anime.title.romaji
                : anime.title.english || anime.title.romaji
            }
            imageUrl={anime.coverImage.large}
            year={anime.startDate.year}
            genre={anime.genres[0]}
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

export default StudioPage;
