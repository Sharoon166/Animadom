"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegStar, FaPlay, FaCheckCircle, FaFilm } from "react-icons/fa";
import Loading from "@/loading";
import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";
import AnimeCard from "@/components/Trending";
import Button from "@/components/Button";

const AnimeDescription = ({ params }) => {
  const [animeData, setAnimeData] = useState();
  const [animeCharacters, setAnimeCharacters] = useState([]);
  const [coverImage, setCoverImage] = useState("");
  const [posterImage, setPosterImage] = useState("");
  const [animeImages, setAnimeImages] = useState([]);
  const [similarAnime, setSimilarAnime] = useState([]);
  const [streamingLinks, setStreamingLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [animeDetails, setAnimeDetails] = useState({
    startDate: null,
    endDate: null,
    nextEpisode: null,
    reviews: [],
    trailer: null,
    tags: [],
    studios: [],
  });

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
                startDate {
                  year
                  month
                  day
                }
                endDate {
                  year
                  month
                  day
                }
                nextAiringEpisode {
                  airingAt
                  timeUntilAiring
                  episode
                }
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
                reviews {
                  nodes {
                    summary
                    score
                    rating
                  }
                }
                trailer {
                  id
                  site
                  thumbnail
                }
                tags {
                  name
                  rank
                }
                studios {
                  nodes {
                    name
                    isAnimationStudio
                  }
                }
              }
            }
          `;

          const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables: { search: title } }),
          });

          const { data } = await response.json();
          if (data.Media) {
            setCoverImage(data.Media.bannerImage || "");
            setPosterImage(
              data.Media.coverImage.extraLarge ||
                data.Media.coverImage.large ||
                ""
            );
            setAnimeDetails({
              startDate: data.Media.startDate,
              endDate: data.Media.endDate,
              nextEpisode: data.Media.nextAiringEpisode,
              reviews: data.Media.reviews?.nodes || [],
              trailer: data.Media.trailer,
              tags: data.Media.tags,
              studios: data.Media.studios?.nodes || [],
            });
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

        if (animeData.data?.title) {
          await fetchAniListData(animeData.data.title);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [params.animeId]);

  const { useJapanese } = useLanguage();
  if (!animeData) return <Loading />;

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
        <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
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
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
            <div className="container mx-auto flex flex-col md:flex-row gap-4 md:gap-8">
              <motion.img
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                src={posterImage || "/poster404.jpg"}
                alt={title_english || title}
                className="w-32 h-48 md:w-48 md:h-72 rounded-xl shadow-2xl object-cover"
              />
              <div className="flex flex-col justify-end">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4"
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
                  className="flex flex-wrap gap-2 mb-4 md:mb-6"
                >
                  {genres.map((genre) => (
                    <Link key={genre.mal_id} href={`/collection/${genre.name}`}>
                      <span className="px-2 md:px-3 py-1 bg-zinc-800/80 rounded-full text-xs md:text-sm hover:bg-blue-600/80 transition-colors duration-300">
                        {genre.name}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-8">
                {/* Score Card */}
                <div className="group relative bg-gradient-to-br from-zinc-800/90 via-zinc-900 to-black p-6 rounded-xl border border-zinc-700/30 hover:border-yellow-500/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-yellow-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-colors duration-300" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors duration-300">
                        <FaRegStar className="text-yellow-500 text-lg" />
                      </div>
                      <h3 className="text-zinc-400 text-base font-medium">
                        Rating
                      </h3>
                    </div>
                    <p className="text-2xl font-bold text-white group-hover:text-yellow-500 transition-colors duration-300">
                      {score}/10
                    </p>
                  </div>
                </div>

                <Link href={`/episodes/${params.animeId}`}>
                  <div className="group relative bg-gradient-to-br from-zinc-800/90 via-zinc-900 to-black p-6 rounded-xl border border-zinc-700/30 hover:border-blue-500/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-300" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                          <FaPlay className="text-blue-500 text-lg" />
                        </div>
                        <h3 className="text-zinc-400 text-base font-medium">
                          Episodes
                        </h3>
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
                      <h3 className="text-zinc-400 text-base font-medium">
                        Type
                      </h3>
                    </div>
                    <p className="text-2xl font-bold text-white group-hover:text-purple-500 transition-colors duration-300">
                      {type}
                    </p>
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
                      <h3 className="text-zinc-400 text-base font-medium">
                        Status
                      </h3>
                    </div>
                    <p className="text-2xl font-bold text-white group-hover:text-green-500 transition-colors duration-300">
                      {status}
                    </p>
                  </div>
                </div>
              </div>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
              >
                <h2 className="text-2xl font-semibold mb-4">Synopsis</h2>
                <p className="text-zinc-300 leading-relaxed">{description}</p>
              </motion.section>

              {/* Broadcast & Studios Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Broadcast Info */}
                <div className="group relative bg-gradient-to-br from-zinc-800/90 via-zinc-900 to-black p-6 rounded-xl border border-zinc-700/30 hover:border-blue-500/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-400/40" />
                  <h2 className="text-2xl font-semibold mb-6 relative">
                    Broadcast Details
                  </h2>
                  <div className="space-y-4 relative">
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-400">Start Date:</span>
                      <span className="text-white">
                        {`${animeDetails.startDate?.year}/${animeDetails.startDate?.month}/${animeDetails.startDate?.day}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-400">End Date:</span>
                      <span className="text-white">
                        {animeDetails.endDate?.year
                          ? `${animeDetails.endDate.year}/${animeDetails.endDate.month}/${animeDetails.endDate.day}`
                          : "Ongoing"}
                      </span>
                    </div>
                    {animeDetails.nextEpisode && (
                      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg backdrop-blur-sm">
                        <h3 className="text-blue-400 font-medium mb-2">
                          Next Episode
                        </h3>
                        <p className="text-white">
                          Episode {animeDetails.nextEpisode.episode}
                        </p>
                        <p className="text-sm text-zinc-400">
                          Airing in{" "}
                          {Math.floor(
                            animeDetails.nextEpisode.timeUntilAiring / 86400
                          )}{" "}
                          days
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Studios */}
                <div className="group relative bg-gradient-to-br from-zinc-800/90 via-zinc-900 to-black p-6 rounded-xl border border-zinc-700/30 hover:border-purple-500/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-400/40" />
                  <h2 className="text-2xl font-semibold mb-6 relative">
                    Production Studios
                  </h2>
                  <div className="flex flex-wrap gap-3 relative">
                    {animeDetails.studios.map((studio, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`px-4 py-2 rounded-full backdrop-blur-sm ${
                          studio.isAnimationStudio
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "bg-zinc-700/50 text-zinc-300 border border-zinc-600/30"
                        }`}
                      >
                        {studio.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              <section className="mb-12">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold">Main Characters</h2>
                  <Button href={`/all_chars/${params.animeId}`}>
                    View All Characters
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4">
                  {animeCharacters?.map((char) => (
                    <Link
                      key={char.character.mal_id}
                      href={`/chars/${char.character.mal_id}`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative group h-[320px] rounded-[2rem] cursor-pointer perspective-1000"
                      >
                        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-zinc-900/50 to-zinc-900 rounded-[2rem] backdrop-blur-xl" />
                        <div className="absolute -z-20 inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <img
                          src={char.character.images.jpg.image_url}
                          alt={char.character.name}
                          className="w-full h-full object-cover rounded-[2rem]"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-[2rem]">
                          <h3 className="text-xl font-bold text-white">
                            {char.character.name}
                          </h3>
                          <p className="text-sm text-zinc-400 mt-1">
                            {char.role}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Similar Anime Section */}
              <section className="mb-12">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold">More Like This</h2>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
                  {similarAnime?.map((anime) => (
                    <AnimeCard
                      key={anime.mal_id}
                      mal_id={anime.mal_id}
                      name={anime.title}
                      imageUrl={anime.images.jpg.large_image_url}
                      year={new Date(anime.aired?.from).getFullYear()}
                      genre={anime.genres?.[0]?.name || "N/A"}
                    />
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-4 sticky mt-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
                >
                  <h2 className="text-lg font-semibold mb-3">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {animeDetails.tags.slice(0, 12).map((tag, index) => (
                      <Link href={`/collection/${tag.name}`} key={index}>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="inline-block px-3 py-1 text-sm bg-zinc-800/50 hover:bg-zinc-700/50 rounded-full text-zinc-300 transition-colors duration-300"
                        >
                          {tag.name}
                        </motion.span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
                {/* Reviews Preview */}
                {animeDetails.reviews.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
                  >
                    <h2 className="text-xl font-semibold mb-4">
                      Latest Reviews
                    </h2>
                    {animeDetails.reviews.slice(0, 2).map((review, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <FaRegStar
                              key={i}
                              className={
                                i < review.score / 20
                                  ? "text-yellow-500"
                                  : "text-zinc-600"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-sm text-zinc-300 line-clamp-2">
                          {review.summary}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimeDescription;
