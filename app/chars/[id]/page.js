"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaRegStar, FaMicrophone } from "react-icons/fa";
import Loading from "@/loading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import dynamic from "next/dynamic";

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
        setAnimeData(data?.data);
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
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
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
        { opacity: 0, y: 100 },
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
    <>
      <div className="container mx-auto my-14 space-y-16 text-gray-300 px-10">
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-24">
          <img
            ref={imageRef}
            src={image_url}
            alt={`${name} character image`}
            className="rounded-lg"
          />
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-normal text-lg text-yellow-500">
              <h2 className="text-3xl md:text-5xl text-white font-bold">
                {name}
              </h2>

              <Link
                href={`/va/${params.id}`}
                className=" flex items-center justify-center gap-2 text-yellow-400 p-6 hover:underline"
              >
                <FaMicrophone className=" text-xl" />
                <div className="text-2xl">Voice Actors</div>
              </Link>
            </div>
            <div className="flex items-center justify-center md:justify-normal gap-3 text-lg text-yellow-500">
              <FaRegStar /> {favorites} Favorites
            </div>
            <p className="pt-6 max-w-3xl text-lg text-balance">{about}</p>
            <div className="mt-4">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                More Info on MyAnimeList
              </a>
            </div>
          </div>
        </div>

        <div
          ref={detailsRef}
          className="space-y-5 md:w-1/2 rounded-xl px-4 py-6 bg-zinc-800"
        >
          <h2 className="text-3xl font-semibold">Character Details</h2>
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="text-lg font-semibold">Name (Kanji)</td>
                <td>{name_kanji}</td>
              </tr>
              <tr>
                <td className="text-lg font-semibold">Nicknames</td>
                <td>{nicknames.join(", ")}</td>
              </tr>
              <tr>
                <td className="text-lg font-semibold">Mal ID</td>
                <td>{mal_id}</td>
              </tr>
              {/* Add more details as needed */}
            </tbody>
          </table>
        </div>

        <div
          ref={charactersRef}
          className="space-y-10 container mx-auto mb-20 px-10"
        >
          <h2 className="text-3xl font-semibold">Anime Starring {name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
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
                  style={{ height: "350px" }}
                >
                  <img
                    src={image_url}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition duration-300 ease-in-out"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                    <h2 className="text-white text-1xl font-bold text-center">
                      {title} <br />
                      {role}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold p-8">Character Gallery</h2>
          <CharacterGallery characterId={mal_id} />
        </div>
      </div>
    </>
  );
};

export default CharacterPage;
