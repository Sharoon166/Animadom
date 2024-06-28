"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "./Trending";

const MoreAnime = () => {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime")
      .then((res) => res.json())
      .then((data) => {
        setAnime(data.data);
      });
  }, []);

  return (
    <>
      <h2 className="text-4xl font-bold text-white m-8">Top Anime</h2>
      <div className="flex  flex-wrap justify-center items-center ">
        {anime?.map((anime) => {
          const { mal_id, images, title, year, genres } = anime;
          return (
            <div key={mal_id} className="m-4">
              <AnimeCard
                mal_id={mal_id}
                imageUrl={images.jpg.image_url}
                name={title}
                year={year}
                genre={genres.map((genre) => genre.name).join(", ")}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MoreAnime;
