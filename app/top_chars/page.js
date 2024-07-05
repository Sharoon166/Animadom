"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "@/components/CharCard";
import Search from "@/components/CharSearch";
const Page = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.data || []);
        console.log(data.data);
      });
  }, []);
  return (
    <div>
   <Search/>
      <h2 className="text-4xl font-bold text-white m-8">
        Top Characters by Favorites
      </h2>
      <div className="flex flex-wrap gap-5 justify-center items-center">
        {characters.map((char) => (
          <AnimeCard
            key={char.mal_id}
            id={char.mal_id}
            name={char.name}
            imageUrl={char.images?.jpg?.image_url}
            favs={`Favorites: ${char.favorites}`}
            nicks={char.name_kanji}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
