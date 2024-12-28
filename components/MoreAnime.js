"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "./Trending";
import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";
import { FaArrowRight } from "react-icons/fa";
import Button from "./Button";

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

              <Button
                href="/airing"
              >
                <span className="mr-2 font-medium text-sm md:text-base">
                  Discover More
                </span>
              </Button>
            </div>

      <div className="flex flex-wrap justify-center items-center">
        {anime?.map((anime) => {
          const { mal_id, images, title_english, title, year, genres } = anime;
          return (
            <div key={mal_id} className="m-4">
              <AnimeCard
                mal_id={mal_id}
                imageUrl={images.jpg.image_url}
                name={useJapanese ? title : title_english || title}
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
