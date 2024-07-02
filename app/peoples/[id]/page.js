"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaRegStar } from "react-icons/fa";
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
    alternate_names,
    favorites,
    about,
    mal_id,
    url,
    birthday,
    images: { jpg: { image_url } },
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
            <h2 className="text-3xl md:text-5xl text-white font-bold">
              {name}
            </h2>
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
                <td className="text-lg font-semibold">Another Name</td>
                <td>{alternate_names.join(", ")}</td>
              </tr>
              <tr>
                <td className="text-lg font-semibold">Mal ID</td>
                <td>{mal_id}</td>
              </tr>
              <tr>
                <td className="text-lg font-semibold">Birthday</td>
                <td>{fm.format(new Date(birthday))}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          ref={charactersRef}
          className="space-y-10 container mx-auto mb-20 px-10"
        >
          <h2 className="text-3xl font-semibold">
            Anime Characters Voiced by {name}
          </h2>
          <div className="flex flex-wrap gap-5 justify-center items-center">
            {!characterData.voices.length && "No Characters"}
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
    </>
  );
};

export default CharacterPage;
