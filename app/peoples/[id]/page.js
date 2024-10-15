"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaRegStar, FaInfoCircle, FaBirthdayCake, FaIdCard } from "react-icons/fa";
import Loading from "@/loading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Card from "@/components/CharCard";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const fm = Intl.DateTimeFormat("en", {
  dateStyle: "long",
});

const CharacterPage = ({ params, data }) => {
  const [characterData, setCharacterData] = useState();
  const charactersRef = useRef(null);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/people/${params.id}/full`)
      .then((res) => res.json())
      .then((data) => setCharacterData(data?.data));
  }, [params.id]);

  const detailsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setCharacterData(data[0]);
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top center+=100",
            toggleActions: "play pause resume reverse",
          },
        }
      );

      gsap.fromTo(
        detailsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: detailsRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play pause resume reverse",
          },
        }
      );
    }
  }, [data]);

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
    <div className="container mx-auto my-8 sm:my-14 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center sm:justify-items-start">
        <div className="sm:col-span-1 lg:col-span-1">
          <img
            ref={imageRef}
            src={image_url}
            alt={`${name} character image`}
            className="rounded-lg w-full h-auto object-cover shadow-lg"
          />
        </div>
        <div className="sm:col-span-1 lg:col-span-2 space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-bold">{name}</h1>
          <div className="flex items-center gap-3 text-base sm:text-lg text-yellow-500">
            <FaRegStar /> <span>{favorites} Favorites</span>
          </div>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{about}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            <FaInfoCircle className="inline mr-2" /> More Info on MyAnimeList
          </a>
        </div>
      </div>

      <div ref={detailsRef} className="mt-8 sm:mt-12 bg-zinc-800 rounded-xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-4 sm:mb-6">Character Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <FaIdCard className="text-gray-300" />
            <div>
              <p className="text-xs sm:text-sm text-gray-400">Another Name</p>
              <p className="text-base sm:text-lg text-gray-200">{alternate_names.join(", ")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaIdCard className="text-gray-300" />
            <div>
              <p className="text-xs sm:text-sm text-gray-400">Mal ID</p>
              <p className="text-base sm:text-lg text-gray-200">{mal_id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaBirthdayCake className="text-gray-300" />
            <div>
              <p className="text-xs sm:text-sm text-gray-400">Birthday</p>
              <p className="text-base sm:text-lg text-gray-200">{fm.format(new Date(birthday))}</p>
            </div>
          </div>
        </div>
      </div>

      <div ref={charactersRef} className="mt-12 sm:mt-16">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-6 sm:mb-8">
          Anime Characters Voiced by {name}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center sm:justify-items-start">
          {!characterData.voices.length && (
            <p className="col-span-full text-center text-gray-400">No Characters</p>
          )}
          {characterData.voices.map((character) => (
            <Card
              key={character.character.mal_id}
              id={character.character.mal_id}
              name={character.character.name}
              imageUrl={character.character.images.jpg.image_url}
              favs={character.role}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
