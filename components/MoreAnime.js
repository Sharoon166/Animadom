"use client";
import React, { useState, useEffect } from "react";
import AnimeCard from "./Trending";
import { useLanguage } from "@/components/useLanguage";
import Button from "./Button";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

const GET_TOP_ANIME = gql`
  query {
    Page(page: 1, perPage: 20) {
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

const MoreAnime = () => {
  const { useJapanese } = useLanguage();
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_TOP_ANIME
        });
        setAnimes(data.Page.media);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching anime:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="relative flex flex-col md:flex-row justify-between items-center mx-4 md:mx-8 my-8 md:my-16 group">
        <div className="relative mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-widest">
            Top Rated
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-transparent bg-clip-text ml-2 md:ml-4 animate-gradient text-shadow-xl">
              Anime
            </span>
          </h1>
          <div className="absolute -bottom-3 left-0 w-1/3 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600"></div>
        </div>

        <Button href="/top_anime">
          <span className="mr-2 font-medium text-sm md:text-base">
            Discover More
          </span>
        </Button>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {animes.map((anime) => (
          <div key={anime.idMal} >
            <AnimeCard
              mal_id={anime.idMal}
              imageUrl={anime.coverImage.large}
              name={useJapanese ? anime.title.native : (anime.title.english || anime.title.romaji)}
              year={anime.startDate.year}
              genre={anime.genres[0] || "N/A"}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MoreAnime;
