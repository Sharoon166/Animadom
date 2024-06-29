"use client";
import { useEffect, useState, useRef } from "react";
import { FaRegStar } from "react-icons/fa";
import Loading from "@/loading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fm = Intl.DateTimeFormat("en", {
  dateStyle: "long",
});

const AnimeDescription = ({ params }) => {
  const [animeData, setAnimeData] = useState();
  const [animeCharacters, setAnimeCharacters] = useState([]);

  const detailsRef = useRef(null);
  const charactersRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${parseInt(params.animeId)}`, {
      cache: "force-cache",
    })
      .then((res) => res.json())
      .then((data) => setAnimeData(data?.data))
      .catch((err) => console.log(err));

    fetch(`https://api.jikan.moe/v4/anime/${params.animeId}/characters`)
      .then((res) => res.json())
      .then((data) =>
        setAnimeCharacters(
          data?.data?.filter((character) => character.role == "Main")
        )
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (animeData) {
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

      gsap.fromTo(
        charactersRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: charactersRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play pause resume reverse",
          },
        }
      );
    }
  }, [animeData]);

  if (!animeData) return <Loading />;

  const {
    title,
    episodes,
    aired: { from: airedFrom, to: airedTo },
    synopsis: description,
    rating,
    score,
    duration,
    genres,
    season,
    studios,
    images: {
      webp: { image_url },
    },
    trailer: { embed_url },
  } = animeData;

  return (
    <>
      <div className="container mx-auto my-14 space-y-16 text-gray-300 px-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-24">
          <img
            ref={imageRef}
            src={image_url}
            alt={`${title} cover image`}
            className="rounded-lg"
          />
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl text-white font-bold">
              {title}
            </h2>
            <div className="flex items-center justify-center md:justify-normal gap-3 text-lg text-yellow-500">
              <FaRegStar /> {score} / 10
            </div>
            <p className="pt-6 max-w-3xl text-lg text-balance">{description}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div
            ref={detailsRef}
            className="space-y-5 md:w-1/2 rounded-xl px-4 py-6 bg-zinc-800"
          >
            <h2 className="text-3xl font-semibold">Anime Details</h2>
            <table className="*:*:p-2">
              <tr>
                <td className="text-lg font-semibold">Episodes</td>
                <td>{episodes ?? "unknown"}</td>
              </tr>
              <tr>
                <td className="text-lg font-semibold">Aired</td>
                <td>
                  {fm.format(new Date(airedFrom))} -{" "}
                  {airedTo ? fm.format(new Date(airedTo)) : "Continued"}
                </td>
              </tr>
              <tr>
                <td className="text-lg font-semibold">Genre</td>
                <td>{genres.map((genre) => genre.name).join(", ")}</td>
              </tr>
              <tr>
                <td className="text-lg font-semibold">Season</td>
                <td>{season ?? "unknown"}</td>
              </tr>
              <tr>
                <td className="text-lg font-semibold">Studios</td>
                <td>{studios.map((studio) => studio.name).join(", ")}</td>
              </tr>
              <tr>
                <td className="text-lg font-semibold">Rating</td>
                <td>{rating}</td>
              </tr>
              <tr>
                <td className="text-lg font-semibold">Duration</td>
                <td>{duration}</td>
              </tr>
            </table>
          </div>
          <div className="w-full">
            <iframe
              className="aspect-video mx-auto w-full max-w-3xl"
              src={embed_url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div ref={charactersRef} className="space-y-10 container mx-auto mb-20 px-10">
        <h2 className="text-3xl font-semibold">Main Characters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {!animeCharacters.length && "No Characters"}
          {animeCharacters.map((character) => {
            const {
              character: {
                mal_id,
                url,
                images: { webp: { image_url } },
                name,
              },
            } = character;
            return (
              <a
                key={mal_id}
                href={url}
                target="_blank"
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                style={{ height: "350px" }}
              >
                <img
                  src={image_url}
                  alt={name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300 ease-in-out"
                />
                <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition duration-300 ease-in-out"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                  <h2 className="text-white text-1xl font-bold text-center">
                    {name}
                  </h2>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AnimeDescription;
