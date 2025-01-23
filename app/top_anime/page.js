"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "@/components/Trending";
import Loading from "@/loading";
import { useLanguage } from "@/components/useLanguage";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

const GET_TOP_ANIME = gql`
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
      }
      media(type: ANIME, sort: SCORE_DESC) {
        idMal
        title {
          romaji
          english
          native
        }
        coverImage {
          large
        }
        startDate {
          year
        }
        genres
      }
    }
  }
`;

const Page = () => {
  const [animes, setAnimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const animesPerPage = 20;
  const { useJapanese } = useLanguage();

  useEffect(() => {
    fetchAnime();
  }, [currentPage]);

  const fetchAnime = async () => {
    try {
      const { data } = await client.query({
        query: GET_TOP_ANIME,
        variables: {
          page: currentPage,
          perPage: animesPerPage
        }
      });

      setAnimes(data.Page.media);
      setTotalPages(data.Page.pageInfo.lastPage);
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if(!animes) return <Loading/>

  return (
    <div className="container mx-auto px-5">
      <h1 className="text-4xl p-8 font-bold ">Top Anime</h1>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {animes.map((anime) => (
          <div key={anime.id}>
            <AnimeCard
              mal_id={anime.idMal}
              imageUrl={anime.coverImage.large}
              name={useJapanese ? anime.title.native : (anime.title.english || anime.title.romaji)}
              year={anime.startDate.year}
              genre={anime.genres.join(", ")}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 mb-8">
        <div className="flex items-center space-x-2  rounded-lg p-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = currentPage + i - 2;
            return pageNumber > 0 && pageNumber <= totalPages ? (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`w-10 h-10 rounded-md ${
                  currentPage === pageNumber ? "bg-pink-600" : "text-gray-300"
                }`}
              >
                {pageNumber}
              </button>
            ) : null;
          })}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
