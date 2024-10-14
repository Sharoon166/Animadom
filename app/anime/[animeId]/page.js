"use client";
import { useEffect, useState } from "react";
import { FaRegStar, FaArrowRight, FaPlay, FaInfoCircle } from "react-icons/fa";
import Loading from "@/loading";
import Link from "next/link";

const fm = Intl.DateTimeFormat("en", {
  dateStyle: "long",
});

const AnimeDescription = ({ params }) => {
  const [animeData, setAnimeData] = useState();
  const [animeCharacters, setAnimeCharacters] = useState([]);
  const [coverImage, setCoverImage] = useState('');
  const [posterImage, setPosterImage] = useState('');
  const [animeImages, setAnimeImages] = useState([]);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${parseInt(params.animeId)}`, {
      cache: "force-cache",
    })
      .then((res) => res.json())
      .then((data) => {
        setAnimeData(data?.data);
        return fetch(`https://kitsu.io/api/edge/anime?filter[slug]=${data?.data?.title.toLowerCase().replace(/\s+/g, '-')}`);
      })
      .then((res) => res.json())
      .then((kitsuData) => {
        if (kitsuData.data && kitsuData.data.length > 0) {
          setCoverImage(kitsuData.data[0].attributes.coverImage?.large || '');
          setPosterImage(kitsuData.data[0].attributes.posterImage?.large || '');
        }
      })
      .catch((err) => console.log(err));

    fetch(`https://api.jikan.moe/v4/anime/${params.animeId}/characters`)
      .then((res) => res.json())
      .then((data) =>
        setAnimeCharacters(
          data?.data?.filter((character) => character.role == "Main")
        )
      )
      .catch((err) => console.log(err));

    fetch(`https://api.jikan.moe/v4/anime/${params.animeId}/pictures`)
      .then((res) => res.json())
      .then((data) => setAnimeImages(data?.data || []))
      .catch((err) => console.log(err));
  }, []);

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
    trailer: { embed_url },
    type,
    source,
    status,
    popularity,
    members,
    favorites,
  } = animeData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8">
        <img src={coverImage || "/banner404.jpg"} alt="Anime Cover" className="w-full h-64 md:h-96 object-cover rounded-lg" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-6">
          <div className="flex items-center space-x-4">
            <img src={posterImage || "/poster404.jpg"} alt={`${title} poster`} className="w-40 h-60 object-cover rounded-lg shadow-lg" />
            <div>
              <h1 className="text-3xl md:text-4xl text-white font-bold mb-2">{title}</h1>
              <div className="flex items-center mb-2">
                <FaRegStar className="text-yellow-500 mr-2" />
                <span className="text-yellow-500 font-semibold">{score} / 10</span>
              </div>
              <div className="flex space-x-2">
                <Link href={`/episodes/${params.animeId}`} className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center">
                  <FaPlay className="mr-2" /> Episodes
                </Link>
                <Link href={`/recs/${params.animeId}`} className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center">
                  <FaInfoCircle className="mr-2" /> Recommendations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <p className="text-gray-300 mb-6">{description}</p>

          <h2 className="text-2xl font-semibold mb-4">Anime Details</h2>
          <div className="bg-zinc-800 p-4 rounded-lg mb-6">
            <table className="w-full">
              <tbody>
                <tr><td className="font-semibold">Type</td><td>{type}</td></tr>
                <tr><td className="font-semibold">Episodes</td><td>{episodes ?? "unknown"}</td></tr>
                <tr><td className="font-semibold">Status</td><td>{status}</td></tr>
                <tr><td className="font-semibold">Aired</td><td>{fm.format(new Date(airedFrom))} - {airedTo ? fm.format(new Date(airedTo)) : "Continued"}</td></tr>
                <tr><td className="font-semibold">Season</td><td>{season ?? "unknown"}</td></tr>
                <tr><td className="font-semibold">Source</td><td>{source}</td></tr>
                <tr><td className="font-semibold">Genre</td><td>{genres.map((genre) => genre.name).join(", ")}</td></tr>
                <tr><td className="font-semibold">Studios</td><td>{studios.map((studio) => studio.name).join(", ")}</td></tr>
                <tr><td className="font-semibold">Rating</td><td>{rating}</td></tr>
                <tr><td className="font-semibold">Duration</td><td>{duration}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
          <iframe
            className="w-full aspect-video rounded-lg mb-6"
            src={embed_url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Main Characters</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {!animeCharacters.length && "No Characters"}
          {animeCharacters.map((character) => {
            const {
              character: {
                mal_id,
                images: { webp: { image_url } },
                name,
              },
            } = character;
            return (
              <Link
                key={mal_id}
                href={`/chars/${mal_id}`}
                className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition duration-300 ease-in-out"
              >
                <div className="aspect-square relative mb-2">
                  <img
                    src={image_url}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h2 className="text-white text-sm font-bold text-center">{name}</h2>
              </Link>
            );
          })}
        </div>
        <Link
          href={`/all_chars/${params.animeId}`}
          className="flex justify-center items-center mt-6 px-4 py-2 rounded-lg bg-slate-500 mx-auto w-40"
        >
          <span className="mr-2">View All</span>
          <FaArrowRight className="text-yellow-400" />
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Anime Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {animeImages.map((image, index) => (
            <div key={index} className="aspect-square relative">
              <img
                src={image.jpg.image_url}
                alt={`Anime Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeDescription;
