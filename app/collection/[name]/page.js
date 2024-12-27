"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "@/components/Trending";
import Pagination from "@/components/Pagination";

const Collection = ({ params }) => {
    const [animeList, setAnimeList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;
    const genreName = params.name;
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    useEffect(() => {
      const fetchAnimeByGenre = async () => {
        const query = `
          query ($genre: String) {
            Page(page: ${currentPage}, ) {
              media(genre: $genre, type: ANIME, sort: POPULARITY_DESC) {
                id
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

        const response = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { genre: genreName }
          })
        });

        const { data } = await response.json();
        const formattedData = data.Page.media.map(anime => ({
          mal_id: anime.id,
          title: anime.title.romaji,
          images: { jpg: { large_image_url: anime.coverImage.large }},
          year: anime.startDate.year
        }));
        
        setAnimeList(formattedData);
      };

      fetchAnimeByGenre();
    }, [genreName, currentPage]);

    const totalPages = Math.ceil(animeList.length / itemsPerPage);

    return (
      <div className="mt-10">
       <div className="relative mb-6 md:mb-0">
                <h1 className="text-3xl p-4 md:text-4xl font-bold text-white tracking-widest">
                  {genreName}
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
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    );
};

export default Collection;
