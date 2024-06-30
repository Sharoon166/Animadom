"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Collection from "@/components/Collection";
import Carousel from "@/components/Crousal";
import { trending } from "@/constants";
import AnimeCard from "@/components/Trending";
import MoreAnime from "@/components/MoreAnime";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const videoRef = useRef(null);
  const carouselRef = useRef(null);
  const collectionRef = useRef(null);
  const trendingRef = useRef(null);
  const moreAnimeRef = useRef(null);

  useEffect(() => {
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

    // Trending anime animation
    gsap.fromTo(
      trendingRef.current.children,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trendingRef.current,
          start: "top center+=100",
        },
      }
    );

    // More Anime animation
    gsap.fromTo(
      moreAnimeRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: moreAnimeRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <>
      <div className="-m-[5rem] mx-auto overflow-hidden relative shadow-[0_20px_80px_#888] pointer-events-none">
        <video
          ref={videoRef}
          src="/main_page.mp4"
          className="object-cover object-center min-h-[75vh]"
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
        <div
          className="flex flex-wrap justify-center items-center"
          ref={trendingRef}
        >
          {trending.map((anime) => (
            <div key={anime.id} className="m-4">
              <AnimeCard
                mal_id={anime.id}
                name={anime.name}
                imageUrl={anime.imageUrl}
                year={anime.year}
                genre={anime.genre}
              />
            </div>
          ))}
        </div>
        <Link
          href="/now"
          className="flex justify-center items-center text-center px-2 py-3 rounded-lg bg-slate-500 mx-auto w-20"
        >
          <FaArrowRight className="text-yellow-400 text-2xl transition-all duration-200" />
        </Link>
      </div>
      <div ref={moreAnimeRef}>
        <MoreAnime />
      </div>
      <Link
        href="/seasonsdetails"
        className="text-center text-yellow-400 text-1xl md:text-2xl font-bold m-10 hover:text-white transition-all duration-200 "
      >
        {" "}
        Learn about More Seasons
      </Link>
    </>
  );
}
