"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRegStar,
  FaPlay,
  FaTwitter,
  FaFacebook,
  FaReddit,
  FaCheckCircle,
  FaFilm,
 
} from "react-icons/fa";

import Loading from "@/loading";
import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";
import AnimeCard from "@/components/Trending";
import Button from "@/components/Button";

const StatCard = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 rounded-xl"
  >
    <div className="text-2xl mb-2 text-blue-500">{icon}</div>
    <h3 className="text-zinc-400">{label}</h3>
    <p className="text-xl font-bold">{value}</p>
  </motion.div>
);

const ShareButton = ({ icon, platform, url }) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    className="p-3 bg-zinc-800 rounded-full text-zinc-400 hover:text-white"
  >
    {icon}
  </motion.a>
);

const AnimeDescription = ({ params }) => {
  const [animeData, setAnimeData] = useState();
  const [animeCharacters, setAnimeCharacters] = useState([]);
  const [coverImage, setCoverImage] = useState("");
  const [posterImage, setPosterImage] = useState("");
  const [animeImages, setAnimeImages] = useState([]);
  const [similarAnime, setSimilarAnime] = useState([]);
  const [animeStats, setAnimeStats] = useState(null);
  const [streamingLinks, setStreamingLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const endpoints = [
          `https://api.jikan.moe/v4/anime/${params.animeId}`,
          `https://api.jikan.moe/v4/anime/${params.animeId}/characters`,
          `https://api.jikan.moe/v4/anime/${params.animeId}/pictures`,
          `https://api.jikan.moe/v4/anime/${params.animeId}/recommendations`,
          `https://api.jikan.moe/v4/anime/${params.animeId}/streaming`,
        ];

        const responses = await Promise.all(
          endpoints.map((endpoint) => fetch(endpoint).then((res) => res.json()))
        );

        const fetchAniListData = async (title) => {
          const query = `
            query ($search: String) {
              Media(search: $search, type: ANIME) {
                coverImage {
                  large
                  extraLarge
                  color
                }
                bannerImage
                averageScore
                popularity
                trending
                rankings {
                  rank
                  type
                  context
                }
                stats {
                  scoreDistribution {
                    score
                    amount
                  }
                  statusDistribution {
                    status
                    amount
                  }
                }
              }
            }
          `;

          const variables = { search: title };
          const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables }),
          });

          const { data } = await response.json();
          if (data.Media) {
            setCoverImage(data.Media.bannerImage || "");
            setPosterImage(
              data.Media.coverImage.extraLarge ||
                data.Media.coverImage.large ||
                ""
            );
            setAnimeStats(data.Media.stats);
          }
        };


        const [animeData, charsData, picsData, recsData, streamData] =
          responses;

        setAnimeData(animeData.data);
        setAnimeCharacters(
          charsData.data?.filter((char) => char.role === "Main")
        );
        setAnimeImages(picsData.data || []);
        setSimilarAnime(recsData.data?.slice(0, 10).map((item) => item.entry));
        setStreamingLinks(streamData.data || []);

        const searchtitle =
          animeData.data?.title || animeData.data?.title_english;
        if (searchtitle) {
          await Promise.all([
            fetchAniListData(searchtitle),
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [params.animeId]);

  if (isLoading) return <Loading />;
  const { useJapanese } = useLanguage();

  const {
    title_english,
    title,
    episodes,
    title_synonyms,
    synopsis: description,
    score,
    genres,
    type,
    status,
  } = animeData;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Hero Section */}
        <div className="relative h-[70vh] overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={coverImage || "/banner404.jpg"}
            alt={title_english || title}
            className="absolute w-full h-full object-cover"
            style={{ filter: "brightness(0.6)" }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900" />

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto flex gap-8">
              <motion.img
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                src={posterImage || "/poster404.jpg"}
                alt={title_english || title}
                className="w-48 h-72 rounded-xl shadow-2xl object-cover"
              />
              <div className="flex flex-col justify-end">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl md:text-5xl font-bold mb-4"
                >
                  {useJapanese
                    ? title
                    : title_english ||
                      title ||
                      (title_synonyms && title_synonyms[0])}
                </motion.h1>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {genres.map((genre) => (
                    <Link key={genre.mal_id} href={`/collection/${genre.name}`}>
                      <span className="px-3 py-1 bg-zinc-800/80 rounded-full text-sm hover:bg-blue-600/80 transition-colors duration-300">
                        {genre.name}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-8">
  {/* Rating Card */}
  <div className="group relative bg-gradient-to-br from-zinc-800/90 via-zinc-900 to-black p-6 rounded-xl border border-zinc-700/30 hover:border-yellow-500/50 transition-all duration-300">
    <div className="absolute inset-0 bg-yellow-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-colors duration-300" />
    <div className="relative">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors duration-300">
          <FaRegStar className="text-yellow-500 text-lg" />
        </div>
        <h3 className="text-zinc-400 text-base font-medium">Rating</h3>
      </div>
      <p className="text-2xl font-bold text-white group-hover:text-yellow-500 transition-colors duration-300">{score}/10</p>
    </div>
  </div>

  {/* Episodes Card */}
  <Link href={`/episodes/${params.animeId}`}>
    <div className="group relative bg-gradient-to-br from-zinc-800/90 via-zinc-900 to-black p-6 rounded-xl border border-zinc-700/30 hover:border-blue-500/50 transition-all duration-300">
      <div className="absolute inset-0 bg-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-300" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
            <FaPlay className="text-blue-500 text-lg" />
          </div>
          <h3 className="text-zinc-400 text-base font-medium">Episodes</h3>
        </div>
        <p className="text-2xl font-bold text-white group-hover:text-blue-500 transition-colors duration-300">
          {episodes || "TBA"}
        </p>
      </div>
    </div>
  </Link>

  {/* Type Card */}
  <div className="group relative bg-gradient-to-br from-zinc-800/90 via-zinc-900 to-black p-6 rounded-xl border border-zinc-700/30 hover:border-purple-500/50 transition-all duration-300">
    <div className="absolute inset-0 bg-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors duration-300" />
    <div className="relative">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-300">
          <FaFilm className="text-purple-500 text-lg" />
        </div>
        <h3 className="text-zinc-400 text-base font-medium">Type</h3>
      </div>
      <p className="text-2xl font-bold text-white group-hover:text-purple-500 transition-colors duration-300">{type}</p>
    </div>
  </div>

  {/* Status Card */}
  <div className="group relative bg-gradient-to-br from-zinc-800/90 via-zinc-900 to-black p-6 rounded-xl border border-zinc-700/30 hover:border-green-500/50 transition-all duration-300">
    <div className="absolute inset-0 bg-green-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-colors duration-300" />
    <div className="relative">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors duration-300">
          <FaCheckCircle className="text-green-500 text-lg" />
        </div>
        <h3 className="text-zinc-400 text-base font-medium">Status</h3>
      </div>
      <p className="text-2xl font-bold text-white group-hover:text-green-500 transition-colors duration-300">{status}</p>
    </div>
  </div>
</div>



          {/* Synopsis */}
          <section className="mb-12 px-4 sm:px-0">
            <h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
            <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
              {description}
            </p>
          </section>

          {/* Characters Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                <span>Main Characters</span>
              </h2>
              <Button href={`/all_chars/${params.animeId}`}>
                View All Characters
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {animeCharacters.map((char) => (
                <Link
                  key={char.character.mal_id}
                  href={`/chars/${char.character.mal_id}`}
                >
                  <div className="relative rounded-xl overflow-hidden w-full h-[280px]">
                    <div className="relative m-[2px] bg-zinc-900 rounded-xl overflow-hidden h-full">
                      {/* Character Image */}
                      <div className="h-[200px] overflow-hidden">
                        <img
                          src={char.character.images.jpg.image_url}
                          alt={char.character.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Character Info */}
                      <div className="p-4 relative z-10">
                        <h3 className="font-bold text-base text-center mb-1 bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
                          {char.character.name}
                        </h3>
                        <p className="text-sm text-center text-zinc-400">
                          {char.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Similar Anime */}
          {similarAnime?.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">More Like This</h2>
              <div className="flex flex-wrap gap-6 items-center justify-center">
                {similarAnime.map((anime) => (
                  <AnimeCard
                    key={anime.mal_id}
                    mal_id={anime.mal_id}
                    name={anime.title}
                    imageUrl={anime.images.jpg.image_url}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Social Share */}
          <section className="py-12 text-center">
            <h2 className="text-2xl font-semibold mb-6">Share This Anime</h2>
            <div className="flex gap-4 justify-center">
              <ShareButton
                icon={<FaTwitter />}
                platform="Twitter"
                url={`https://twitter.com/intent/tweet?text=Check out ${title_english} on Animadom!`}
              />
              <ShareButton
                icon={<FaFacebook />}
                platform="Facebook"
                url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
              />
              <ShareButton
                icon={<FaReddit />}
                platform="Reddit"
                url={`https://reddit.com/submit?url=${encodeURIComponent(
                  window.location.href
                )}&title=${title_english}`}
              />
            </div>
          </section>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimeDescription;
