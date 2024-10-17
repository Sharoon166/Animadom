"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "./Trending";
import Link from "next/link";

const MoreAnime = () => {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    fetchAnime();
  }, []);

  const fetchAnime = () => {
    fetch(`https://api.jikan.moe/v4/top/anime`)
      .then((res) => res.json())
      .then((data) => {
        setAnime(data.data);
      });
  };

  return (
    <>
      <h2 id="top-anime-section" className="text-4xl font-bold text-white m-8">Top Anime</h2>
      <div className="flex flex-wrap justify-center items-center">
        {anime?.map((anime) => {
          const { mal_id, images, title_english, year, genres } = anime;
          return (
            <div key={mal_id} className="m-4">
              <AnimeCard
                mal_id={mal_id}
                imageUrl={images.jpg.image_url}
                name={title_english}
                year={year}
                genre={genres.map((genre) => genre.name).join(", ")}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-8 mb-8">
        <Link href="/top_anime">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
            View All Top Anime
          </button>
        </Link>
      </div>
    </>
  );
};

export default MoreAnime;
