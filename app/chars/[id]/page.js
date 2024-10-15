"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaRegStar, FaMicrophone } from "react-icons/fa";
import Loading from "@/loading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import dynamic from "next/dynamic";
import Pagination from "@/components/Pagination";

const CharacterGallery = dynamic(
  () => import("@/components/CharacterGallery"),
  {
    ssr: false,
  }
);

gsap.registerPlugin(ScrollTrigger);

const fm = Intl.DateTimeFormat("en", {
  dateStyle: "long",
});

const CharacterPage = ({ params, data }) => {
  console.log(params.id);
  const [characterData, setCharacterData] = useState();
  const [animeData, setAnimeData] = useState([]);
  const charactersRef = useRef(null);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/characters/${params.id}`)
      .then((res) => res.json())
      .then((data) => setCharacterData(data?.data));

    fetch(`https://api.jikan.moe/v4/characters/${params.id}/anime`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setAnimeData(data.data);
        }
        console.log(data.data);
      });
  }, []);

  const detailsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setCharacterData(data[0]);
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: -100 },
        {
          opacity: 1,
          y: 0,
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
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
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
    name_kanji,
    nicknames,
    favorites,
    about,
    mal_id,
    url,
    images: {
      webp: { image_url },
    },
  } = characterData;

  return (
    <div className="container mx-auto my-8 sm:my-14 space-y-8 sm:space-y-16 text-gray-300 px-4 sm:px-6 md:px-10">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
        <div className="flex flex-col items-center sm:items-start sm:w-1/2 lg:w-1/3">
          <img
            ref={imageRef}
            src={image_url}
            alt={`${name} character image`}
            className="rounded-lg w-full max-w-xs sm:max-w-sm"
          />
          <Link
            href={`/va/${params.id}`}
            className="mt-4 flex items-center justify-center gap-2 text-yellow-400 p-3 border border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition duration-300 w-full max-w-xs sm:max-w-sm"
          >
            <FaMicrophone className="text-xl" />
            <div className="text-lg">Voice Actors</div>
          </Link>
        </div>

        <div className="space-y-4 sm:space-y-6 sm:w-1/2 lg:w-2/3">
          <h2 className="text-2xl sm:text-3xl md:text-5xl text-white font-bold">
            {name}
          </h2>
          <div className="flex items-center gap-3 text-base sm:text-lg text-yellow-500">
            <FaRegStar /> {favorites} Favorites
          </div>

          <p className="text-base sm:text-lg">{about}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-500 hover:underline border border-blue-500 rounded-full px-4 py-2 transition duration-300 hover:bg-blue-500 hover:text-white"
          >
            More Info on MyAnimeList
          </a>
        </div>
      </div>

      <div
        ref={detailsRef}
        className="space-y-4 sm:space-y-5 rounded-xl px-4 py-4 sm:py-6 bg-zinc-800"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Character Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-base sm:text-lg font-semibold">Name (Kanji)</p>
            <p>{name_kanji}</p>
          </div>
          <div>
            <p className="text-base sm:text-lg font-semibold">Nicknames</p>
            <p>{nicknames.join(", ")}</p>
          </div>
          <div>
            <p className="text-base sm:text-lg font-semibold">Mal ID</p>
            <p>{mal_id}</p>
          </div>
        </div>
      </div>

      <div ref={charactersRef} className="space-y-6 sm:space-y-10">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Anime Starring {name}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {!animeData.length && "No Anime"}
          {animeData.map((character) => {
            const {
              role,
              anime: {
                mal_id,
                images: {
                  webp: { image_url },
                },
                title,
              },
            } = character;
            return (
              <Link
                key={mal_id}
                href={`/anime/${mal_id}`}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                style={{ paddingBottom: "150%" }}
              >
                <img
                  src={image_url}
                  alt={title}
                  className="absolute w-full h-full object-cover transform group-hover:scale-110 transition duration-300 ease-in-out"
                />
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 sm:p-4">
                  <h2 className="text-white text-sm sm:text-lg font-bold text-center mb-1 sm:mb-2">
                    {title}
                  </h2>
                  <p className="text-white text-xs sm:text-sm text-center">
                    {role}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
          Character Gallery
        </h2>
        <CharacterGallery characterId={mal_id} />
      </div>
    </div>
  );
};

export default CharacterPage;
