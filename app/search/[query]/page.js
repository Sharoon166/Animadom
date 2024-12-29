"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import AnimeCard from "@/components/Trending";
import CharCard from "@/components/CharCard";
import Card from "@/components/VAcard";
import Loading from "@/loading";
import Pagination from "@/components/Pagination";

const ANILIST_ENDPOINT = "https://graphql.anilist.co";
const JIKAN_ENDPOINT = "https://api.jikan.moe/v4";

const SearchResults = ({ params }) => {
  const [activeTab, setActiveTab] = useState("anime");
  const [results, setResults] = useState({
    anime: [],
    characters: [],
    genres: [],
    voiceActors: [],
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState({
    anime: 1,
    characters: 1,
    genres: 1,
    voiceActors: 1
  });
  const [totalPages, setTotalPages] = useState({
    anime: 1,
    characters: 1,
    genres: 1,
    voiceActors: 1
  });
  const itemsPerPage = 20;

  const queries = {
    anime: `query ($search: String, $page: Int) {
      Page(page: $page, perPage: ${itemsPerPage}) {
        pageInfo {
          total
          currentPage
          lastPage
        }
        media(search: $search, type: ANIME, sort: FAVOURITES_DESC) {
          idMal
          title { romaji }
          coverImage { large }
          startDate { year }
          genres
          averageScore
        }
      }
    }`,
    genres: `query ($genre: String, $page: Int) {
      Page(page: $page, perPage: ${itemsPerPage}) {
        pageInfo {
          total
          currentPage
          lastPage
        }
        media(genre: $genre, type: ANIME, sort: FAVOURITES_DESC) {
          idMal
          title { romaji }
          coverImage { large }
          startDate { year }
          genres
          averageScore
        }
      }
    }`,
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const query = params.query;
    const formattedQuery = decodeURIComponent(params.query)
      .replace(/\s+/g, " ")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");

    try {
      const [animeData] = await Promise.all([
        fetch(ANILIST_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: queries.anime,
            variables: { 
              search: query, 
              page: currentPage.anime 
            },
          }),
        }).then((res) => res.json()),
      ]);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const [charactersData] = await Promise.all([
        fetch(`${JIKAN_ENDPOINT}/characters?q=${formattedQuery}&page=${currentPage.characters}&limit=${itemsPerPage}&order_by=favorites&sort=desc`)
          .then((res) => res.json()),
      ]);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const [voiceActorsData] = await Promise.all([
        fetch(`${JIKAN_ENDPOINT}/people?q=${formattedQuery}&page=${currentPage.voiceActors}&limit=${itemsPerPage}&order_by=favorites&sort=desc`)
          .then((res) => res.json()),
      ]);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const [genresData] = await Promise.all([
        fetch(ANILIST_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: queries.genres,
            variables: { 
              genre: query,
              page: currentPage.genres 
            },
          }),
        }).then((res) => res.json()),
      ]);

      setResults({
        anime: animeData.data?.Page?.media || [],
        characters: charactersData.data || [],
        voiceActors: voiceActorsData.data || [],
        genres: genresData.data?.Page?.media || [],
      });

      setTotalPages({
        anime: animeData.data?.Page?.pageInfo?.lastPage || 1,
        characters: Math.ceil(charactersData.pagination?.items?.total / itemsPerPage) || 1,
        voiceActors: Math.ceil(voiceActorsData.pagination?.items?.total / itemsPerPage) || 1,
        genres: genresData.data?.Page?.pageInfo?.lastPage || 1,
      });

    } catch (error) {
      console.error("Error fetching data:", error);
      setResults({
        anime: [],
        characters: [],
        genres: [],
        voiceActors: [],
      });
    } finally {
      setLoading(false);
    }
  }, [params.query, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (tab, page) => {
    setCurrentPage(prev => ({
      ...prev,
      [tab]: page
    }));
  };

  const tabs = [
    { id: "anime", label: "Anime", icon: "🎬" },
    { id: "characters", label: "Characters", icon: "👥" },
    { id: "genres", label: "Genres", icon: "🏷️" },
    { id: "voiceActors", label: "Voice Actors", icon: "🎤" },
  ];

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="container mx-auto px-6">
      <nav className="flex flex-col sm:flex-row gap-3 mb-6 bg-zinc-900/80 p-4 rounded-xl sticky top-0 backdrop-blur-sm z-10 border border-zinc-800/50">
    <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 w-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            relative group flex items-center justify-center gap-2
            px-4 py-3.5 rounded-lg w-full sm:w-auto
            transition-all duration-200 ease-out
            text-sm md:text-base font-medium
            ${
              activeTab === tab.id
                ? "bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/20"
                : "bg-zinc-800/30 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            }
          `}
        >
          <span className="text-xl sm:text-lg">{tab.icon}</span>
          <span>{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  </nav>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "anime" && (
            <>
              <div className="flex flex-wrap justify-center items-center gap-5">
                {results.anime.length ? (
                  results.anime.map((anime) => (
                    <AnimeCard
                      key={anime.id}
                      mal_id={anime.idMal}
                      name={anime.title.romaji}
                      imageUrl={anime.coverImage.large}
                      year={anime.startDate.year}
                      genre={anime.genres[0]}
                    />
                  ))
                ) : (
                  <p className="text-center col-span-full text-zinc-400">No Anime Found</p>
                )}
              </div>
              <Pagination
                currentPage={currentPage.anime}
                totalPages={totalPages.anime}
                onPageChange={(page) => handlePageChange('anime', page)}
              />
            </>
          )}

          {activeTab === "characters" && (
            <>
              <div className="flex flex-wrap justify-center items-center gap-5">
                {results.characters.length ? (
                  results.characters.map((char) => (
                    <CharCard
                      key={char.mal_id}
                      id={char.mal_id}
                      name={char.name}
                      imageUrl={char.images?.jpg?.image_url}
                      favs={char.favorites}
                      nicks={char.nicknames?.[0] || ""}
                    />
                  ))
                ) : (
                  <p className="text-center col-span-full text-zinc-400">No Characters Found</p>
                )}
              </div>
              <Pagination
                currentPage={currentPage.characters}
                totalPages={totalPages.characters}
                onPageChange={(page) => handlePageChange('characters', page)}
              />
            </>
          )}

          {activeTab === "genres" && (
            <>
              <div className="flex flex-wrap justify-center items-center gap-5">
                {results.genres.length ? (
                  results.genres.map((anime) => (
                    <AnimeCard
                      key={anime.idMal}
                      mal_id={anime.id}
                      name={anime.title.romaji}
                      imageUrl={anime.coverImage.large}
                      year={anime.startDate?.year}
                      genre={anime.genres[0]}
                    />
                  ))
                ) : (
                  <p className="text-center col-span-full text-zinc-400">No Genres Found</p>
                )}
              </div>
              <Pagination
                currentPage={currentPage.genres}
                totalPages={totalPages.genres}
                onPageChange={(page) => handlePageChange('genres', page)}
              />
            </>
          )}

          {activeTab === "voiceActors" && (
            <>
              <div className="flex flex-wrap justify-center items-center gap-5">
                {results.voiceActors.length ? (
                  results.voiceActors.map((v) => (
                    <Card
                      key={v.mal_id}
                      mal_id={v.mal_id}
                      name={v.name}
                      imageUrl={v.images?.jpg?.image_url}
                      year={v.language}
                    />
                  ))
                ) : (
                  <p className="text-center col-span-full text-zinc-400">No Voice Actors Found</p>
                )}
              </div>
              <Pagination
                currentPage={currentPage.voiceActors}
                totalPages={totalPages.voiceActors}
                onPageChange={(page) => handlePageChange('voiceActors', page)}
              />
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchResults;
