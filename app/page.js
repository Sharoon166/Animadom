"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Collection from "@/components/Collection";
import Carousel from "@/components/Crousal";
import AnimeCard from "@/components/Trending";
import MoreAnime from "@/components/MoreAnime";
import { useLanguage } from "@/components/useLanguage";
import Button from "@/components/Button";

const heroVariants = {
  initial: { scale: 1.2, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 3, ease: "easeOut" }
  }
};

const carouselVariants = {
  initial: { x: -1000, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 2, ease: "easeOut" }
  }
};

const cardContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  initial: { 
    opacity: 0,
    y: 50
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const { useJapanese } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("https://api.jikan.moe/v4/seasons/now")
      .then((response) => response.json())
      .then((data) => setTrendingAnime(data.data.slice(0, 6)))
      .catch((error) => console.error("Error fetching trending anime:", error));
  }, []);

  return (
    <motion.div initial="initial" animate="animate">
      <motion.div 
        variants={heroVariants}
        className="-m-[5rem] mx-auto overflow-hidden relative shadow-[0_20px_80px_#888] pointer-events-none 2xl:w-screen 2xl:max-w-none"
      >
        <video
          src="/main_page.mp4"
          className="object-cover object-center min-h-[75vh] w-full"
          autoPlay
          loop
          muted
        />
      </motion.div>

      <motion.div variants={carouselVariants}>
        <Carousel />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Collection />
      </motion.div>

      <motion.div className="relative flex flex-col md:flex-row justify-between items-center mx-4 md:mx-8 my-8 md:my-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative mb-6 md:mb-0"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-widest">
            Trending
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-transparent bg-clip-text ml-2 md:ml-4 animate-gradient text-shadow-xl">
              Anime
            </span>
          </h1>
          <div className="absolute -bottom-3 left-0 w-1/3 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600" />
        </motion.div>

        <Button href="/airing">
          <span className="mr-2 font-medium text-sm md:text-base">
            Discover More
          </span>
        </Button>
      </motion.div>

      <motion.div 
        className="flex flex-wrap justify-center items-center"
        variants={cardContainerVariants}
      >
        {trendingAnime.map((anime) => (
          <motion.div
            key={anime.mal_id}
            className="m-4"
            variants={cardVariants}
          >
            <AnimeCard
              mal_id={anime.mal_id}
              name={useJapanese ? anime.title : anime.title_english || anime.title}
              imageUrl={anime.images.jpg.image_url}
              year={new Date(anime.aired.from).getFullYear()}
              genre={anime.genres[0]?.name || "N/A"}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <MoreAnime />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-center items-center py-20 bg-gradient-to-b from-transparent to-slate-800/20"
      >
        <Button href="/seasonsdetails">
          <span className="mr-3 font-medium tracking-wide">
            DISCOVER ALL SEASONS
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
