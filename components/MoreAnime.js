"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "./Trending";
import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";
import { FaArrowRight } from "react-icons/fa";

const MoreAnime = () => {
  const [anime, setAnime] = useState([]);
  const { useJapanese } = useLanguage();

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
          const { mal_id, images, title_english, title, year, genres } = anime;
          return (
            <div key={mal_id} className="m-4">
              <AnimeCard
                mal_id={mal_id}
                imageUrl={images.jpg.image_url}
                name={useJapanese ? title : (title_english || title)}
                year={year}
                genre={genres.map((genre) => genre.name).join(", ")}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-8 mb-8">
        <Link
          href="/top_anime"
          className="flex justify-center items-center text-center px-2 py-3 rounded-lg bg-slate-500 mx-auto w-20 hover:bg-slate-400 transition-all duration-200 text-yellow-400 hover:text-yellow-600 text-2xl font-bold"
        >
          <FaArrowRight className="text-2xl" />
        </Link>
      </div>
    </>
  );
};

export default MoreAnime;
