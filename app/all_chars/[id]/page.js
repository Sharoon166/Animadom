"use client";
import React, { useEffect, useState } from "react";
import AnimeCard from "@/components/CharCard";

const Page = ({ params }) => {
  const [characters, setCharacters] = useState([]);
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${params.id}/characters`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.data);
      });
    fetch(`https://api.jikan.moe/v4/anime/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnime(data.data);
      });
  }, []);
  const { title } = anime;
  return (
    <>
      {console.log(title)}

      <div>
      <h2 className="text-4xl font-bold text-white m-8">
          All Characters Featured in {title}
        </h2>
        <div className="flex flex-wrap gap-5 justify-center items-center">
          {characters.map((char) => (
            <AnimeCard
              key={char.character.mal_id}
              id={char.character.mal_id}
              name={char.character.name}
              imageUrl={char.character.images.jpg.image_url}
              favs={`Favorites: ${char.favorites}`}
              nicks={char.role}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
