"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegStar, FaMicrophone, FaShare } from "react-icons/fa";
import Link from "next/link";
import Loading from "@/loading";
import dynamic from "next/dynamic";
import Button from "@/components/Button";

const CharacterGallery = dynamic(
  () => import("@/components/CharacterGallery"),
  { ssr: false }
);



const CharacterPage = ({ params }) => {
  const [characterData, setCharacterData] = useState(null);
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [anilistImage, setAnilistImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [charResponse, animeResponse] = await Promise.all([
          fetch(`https://api.jikan.moe/v4/characters/${params.id}`),
          fetch(`https://api.jikan.moe/v4/characters/${params.id}/anime`),
        ]);

        const [charData, animeData] = await Promise.all([
          charResponse.json(),
          animeResponse.json(),
        ]);

        setCharacterData(charData.data);
        setAnimeData(animeData.data || []);

        // Fetch Anilist image after character data is available
        if (charData.data) {
          const anilistImageUrl = await fetchAnilistData(charData.data.name);
          setAnilistImage(anilistImageUrl);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const fetchAnilistData = async (characterName) => {
    const query = `
      query ($name: String) {
        Character(search: $name) {
          image {
            large
          }
        }
      }
    `;

    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { name: characterName },
      }),
    });

    const data = await response.json();
    return data.data?.Character?.image?.large;
  };

  if (isLoading) return <Loading />;
  if (!characterData) return null;

  return (
    <div className="min-h-screen">
  <div className="relative flex justify-center items-center py-8 ">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8"
    >
      <div className="w-64 h-80 relative overflow-hidden rounded-xl">
        <img 
          src={anilistImage || characterData.images.webp.image_url}
          alt={characterData.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          {characterData.name}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-8">
          <span className="flex items-center gap-2 text-lg">
            <FaRegStar className="text-amber-400" />
            {characterData.favorites.toLocaleString()} Favorites
          </span>
          {characterData.name_kanji && (
            <span className="text-xl font-medium text-gray-400">
              {characterData.name_kanji}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
        <Button
        href={`/va/${characterData.mal_id}`}
        >Voice Actors</Button>
         
        </div>
      </div>
    </motion.div>
  </div>


      <div className="container mx-auto px-6  relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">About</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {characterData.about}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
              <CharacterGallery characterId={params.id} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">
                Anime Appearances
              </h2>
              <div className="space-y-4">
                {animeData.slice(0, 5).map((item) => (
                  <Link
                    key={item.anime.mal_id}
                    href={`/anime/${item.anime.mal_id}`}
                    className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all"
                  >
                    <img
                      src={item.anime.images.webp.image_url}
                      alt={item.anime.title}
                      className="w-16 h-20 rounded-lg object-cover group-hover:ring-2 ring-yellow-500 transition-all"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate group-hover:text-indigo-400 transition-colors">
                        {item.anime.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">{item.role}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {characterData.nicknames?.length > 0 && (
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Nicknames</h2>
                <div className="flex flex-wrap gap-2">
                  {characterData.nicknames.map((nickname) => (
                    <span
                      key={nickname}
                      className="px-4 py-2 bg-white/10 rounded-lg text-sm text-white hover:bg-white/20 transition-colors"
                    >
                      {nickname}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
