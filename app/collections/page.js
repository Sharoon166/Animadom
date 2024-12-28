"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Link from "next/link";
import Loading from "@/loading";

const Collection = () => {
  const [animeCollections, setAnimeCollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const collectionsPerPage = 20;

  // Separate fetch for genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresResponse = await fetch("https://api.jikan.moe/v4/genres/anime");
        const genresData = await genresResponse.json();
        return genresData.data;
      } catch (error) {
        console.error("Error fetching genres:", error);
        return [];
      }
    };

    // Fetch anime for each genre separately
    const fetchAnimeForGenre = async (genre) => {
      try {
        const kitsuResponse = await fetch(
          `https://kitsu.io/api/edge/anime?filter[genres]=${genre.name}&page[limit]=20`
        );
        const kitsuData = await kitsuResponse.json();
        
        return {
          genreName: genre.name,
          anime: [
            kitsuData.data[6],
            kitsuData.data[12],
            kitsuData.data[4]
          ],
          banner: kitsuData.data[Math.floor(Math.random() * kitsuData.data.length)]?.attributes?.coverImage?.small ||
                 kitsuData.data[0]?.attributes?.posterImage?.small
        };
      } catch (error) {
        console.error(`Error fetching anime for genre ${genre.name}:`, error);
        return null;
      }
    };

    const loadData = async () => {
      setIsLoading(true);
      const genres = await fetchGenres();
      
      // Process genres in smaller batches
      const batchSize = 5;
      const collections = [];
      
      for (let i = 0; i < genres.length; i += batchSize) {
        const batch = genres.slice(i, i + batchSize);
        const batchResults = await Promise.all(
          batch.map(genre => fetchAnimeForGenre(genre))
        );
        collections.push(...batchResults.filter(Boolean));
        
        // Update state progressively as batches complete
        setAnimeCollections(prevCollections => [...prevCollections, ...batchResults.filter(Boolean)]);
      }
      
      setIsLoading(false);
    };

    loadData();
    
    // Cleanup function
    return () => {
      setAnimeCollections([]);
      setIsLoading(true);
    };
  }, []);

  const indexOfLastCollection = currentPage * collectionsPerPage;
  const indexOfFirstCollection = indexOfLastCollection - collectionsPerPage;
  const currentCollections = animeCollections.slice(
    indexOfFirstCollection,
    indexOfLastCollection
  );
  const totalPages = Math.ceil(animeCollections.length / collectionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="mt-4 md:mt-10 space-y-6 md:space-y-10 px-4 md:px-8">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loading />
        </div>
      ) : (
        <>
          <div className="relative">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-widest p-2 md:p-4">
              Featured
              <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-transparent bg-clip-text ml-2 md:ml-4 animate-gradient text-shadow-xl">
                Collections
              </span>
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10 justify-items-center">
            {currentCollections.map((collection, index) => (
              <CollectionCard
                key={index}
                name1={collection.genreName}
                name2="Collection"
                img1={collection.anime[0]?.attributes?.posterImage?.small}
                img2={collection.anime[1]?.attributes?.posterImage?.small}
                img3={collection.anime[2]?.attributes?.posterImage?.small}
                banner={collection.banner}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

const CollectionCard = ({ name1, name2, img1, img2, img3, banner }) => {
  return (
    <Link href={`/collection/${name1}`}>
      <div
        className="rounded-lg bg-zinc-700 p-4 sm:p-6 md:p-10 pb-0 overflow-hidden max-w-md cursor-pointer group"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h3 className="text-center text-xl sm:text-2xl font-semibold text-white">
          {name1}
          <div className="text-lg sm:text-xl">{name2}</div>
        </h3>
        <div className="flex justify-center *:-mr-8 sm:*:-mr-10 *:w-1/3 *:min-w-sm mx-auto translate-y-8 sm:translate-y-12">
          <img
            src={img1}
            alt={name2}
            className="-rotate-12 rounded-md group-hover:-translate-x-8 group-hover:-translate-y-7 group-hover:scale-90 transition-all duration-150"
          />
          <img
            src={img2}
            alt={name2}
            className="-rotate-6 rounded-md group-hover:rotate-0 group-hover:-translate-y-11 transition-all duration-150 group-hover:scale-90"
          />
          <img
            src={img3}
            alt={name2}
            className="-rotate-3 rounded-md group-hover:translate-x-8 group-hover:-translate-y-7 group-hover:scale-90 transition-all duration-150 group-hover:rotate-3"
          />
        </div>
      </div>
    </Link>
  );
};

export default Collection;
