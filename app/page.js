"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Collection from "@/components/Collection";
import Carousel from "@/components/Crousal";
import AnimeCard from "@/components/Trending";
import MoreAnime from "@/components/MoreAnime";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useLanguage } from "@/components/useLanguage";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const videoRef = useRef(null);
  const carouselRef = useRef(null);
  const collectionRef = useRef(null);
  const moreAnimeRef = useRef(null);
  const [trendingAnime, setTrendingAnime] = useState([]);
  
  // Use the custom hook to manage language preference
  const { useJapanese } = useLanguage();

  useEffect(() => {
    // Scroll to top on page load or refresh
    window.scrollTo(0, 0);

    // Video animation
    gsap.fromTo(
      videoRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top center+=100",
        },
      }
    );

    // Carousel animation
    gsap.fromTo(
      carouselRef.current,
      { x: "-100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top center+=100",
        },
      }
    );

    // Collection animation
    gsap.fromTo(
      collectionRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: collectionRef.current,
          start: "top center+=100",
        },
      }
    );

    // Fetch trending anime
    fetch('https://api.jikan.moe/v4/seasons/now')
      .then(response => response.json())
      .then(data => {
        setTrendingAnime(data.data.slice(0, 10)); // Limiting to 10 anime for example
      })
      .catch(error => console.error('Error fetching trending anime:', error));
  }, []);

  return (
    <>
      <div className="-m-[5rem] mx-auto overflow-hidden relative shadow-[0_20px_80px_#888] pointer-events-none 2xl:w-screen 2xl:max-w-none">
        <video
          ref={videoRef}
          src="/main_page.mp4"
          className="object-cover object-center min-h-[75vh] w-full"
          autoPlay
          loop
          muted
        ></video>
      </div>
      <div className="container mx-auto px-10 space-y-32 pb-20">
        <div ref={carouselRef}>
          <Carousel />
        </div>
        <div ref={collectionRef}>
          <Collection />
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold text-white m-8">Trending Anime</h1>

        <div className="flex flex-wrap justify-center items-center">
          {trendingAnime.map((anime) => (
            <div key={anime.mal_id} className="m-4">
              <AnimeCard
                mal_id={anime.mal_id}
                name={useJapanese ? anime.title : (anime.title_english || anime.title)}
                imageUrl={anime.images.jpg.image_url}
                year={new Date(anime.aired.from).getFullYear()}
                genre={anime.genres[0]?.name || 'N/A'}
              />
            </div>
          ))}
        </div>

        <Link
          href="/now"
          className="flex justify-center items-center text-center px-2 py-3 rounded-lg bg-slate-500 mx-auto w-20 hover:bg-slate-400 transition-all duration-200 text-yellow-400 hover:text-yellow-600 text-2xl font-bold m-10"
        >
          <FaArrowRight className=" text-2xl" />
        </Link>
      </div>
      <div ref={moreAnimeRef}>
        <MoreAnime />
      </div>
      <div className="flex justify-center">
        <Link
          href="/seasonsdetails"
          className="text-center text-yellow-400 text-1xl md:text-2xl font-bold m-10 hover:text-white transition-all duration-200 bg-slate-700 px-6 py-3 rounded-lg hover:bg-slate-600"
        >
          Learn about More Seasons
        </Link>
      </div>
    </>
  );
}
