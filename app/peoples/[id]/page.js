"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaRegStar } from "react-icons/fa";
import Loading from "@/loading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/Button";

gsap.registerPlugin(ScrollTrigger);

const fm = Intl.DateTimeFormat("en", {
  dateStyle: "long",
});

const CharacterPage = ({ params, data }) => {
  const [characterData, setCharacterData] = useState();
  const [visibleAppearances, setVisibleAppearances] = useState(5);
  const charactersRef = useRef(null);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/people/${params.id}/full`)
      .then((res) => res.json())
      .then((data) => setCharacterData(data?.data));
  }, [params.id]);

  const loadMoreAppearances = () => {
    setVisibleAppearances(prev => prev + 5);
  };

  if (!characterData) return <Loading />;

  const {
    name,
    alternate_names,
    favorites,
    about,
    mal_id,
    url,
    birthday,
    images: { jpg: { image_url } },
  } = characterData;

  return (
    <div className="min-h-screen">
      <div className="relative flex justify-center items-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="w-64 h-80 relative overflow-hidden rounded-xl">
            <img 
              src={image_url}
              alt={`${name} character image`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              {name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-8">
              <span className="flex items-center gap-2 text-lg">
                <FaRegStar className="text-amber-400" />
                {favorites.toLocaleString()} Favorites
              </span>
            </div>
            <Button href={url}>More Details</Button>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">About</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {about}
              </p>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Anime Appearances</h2>
              <div className="space-y-4">
                {characterData.voices?.slice(0, visibleAppearances).map((item) => (
                  <Link
                    key={item.character.mal_id}
                    href={`/chars/${item.character.mal_id}`}
                    className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all"
                  >
                    <img
                      src={item.character.images.jpg.image_url}
                      alt={item.character.name}
                      className="w-16 h-20 rounded-lg object-cover group-hover:ring-2 ring-yellow-500 transition-all"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate group-hover:text-indigo-400 transition-colors">
                        {item.character.name}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">{item.role}</p>
                    </div>
                  </Link>
                ))}
                {characterData.voices?.length > visibleAppearances && (
                  <button
                    onClick={loadMoreAppearances}
                    className="w-full mt-4 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                  >
                    Load More
                  </button>
                )}
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
