"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaDribbble, FaGithub } from "react-icons/fa";
import { SiGraphql } from "react-icons/si";
import Link from "next/link";

const AboutUs = () => {
  const contentRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      cardsRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 }
    );
  }, []);

  return (
    <div className="min-h-screen ">
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            About
            <span className="bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent ml-2 sm:ml-3">
              Animadom
            </span>
          </h1>
          <div className="text-gray-400 max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6">
            <p className="text-lg sm:text-xl leading-relaxed">
              Animadom is your gateway to the vast world of anime, crafted with passion and powered by cutting-edge web technologies.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              Our platform combines the robust capabilities of Next.js with comprehensive anime data to deliver an immersive experience for anime enthusiasts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          <Link href="https://dribbble.com/shots/22982773-Kurosaw-Anime-Streaming-Web-App" target="_blank" 
                className="group bg-gray-800/40 p-6 sm:p-8 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all">
            <FaDribbble className="text-2xl sm:text-3xl text-gray-400 mb-3 sm:mb-4  transition-transform" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Design Vision</h3>
            <p className="text-sm sm:text-base text-gray-400">Drawing inspiration from modern anime aesthetics and user-centric design principles.</p>
          </Link>

          <Link href="https://docs.api.jikan.moe" target="_blank"
                className="group bg-gray-800/40 p-6 sm:p-8 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all">
            <span className="text-2xl sm:text-3xl font-bold text-gray-400 mb-3 sm:mb-4 block  transition-transform">J</span>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Jikan API</h3>
            <p className="text-sm sm:text-base text-gray-400">Leveraging MyAnimeList database through Jikan API for comprehensive anime information.</p>
          </Link>

          <Link href="https://graphql.org" target="_blank"
                className="group bg-gray-800/40 p-6 sm:p-8 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all">
            <SiGraphql className="text-2xl sm:text-3xl text-gray-400 mb-3 sm:mb-4  transition-transform" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">GraphQL</h3>
            <p className="text-sm sm:text-base text-gray-400">Implementing efficient data fetching with GraphQL for optimal performance.</p>
          </Link>
        </div>

        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">The Team</h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-3xl mx-auto px-4">
            Meet the developers who brought this vision to life.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="group">
            <div className="bg-gray-800/40 p-6 sm:p-8 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all">
              <img src="/sharoon.png" alt="Sharoon" 
                   className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 sm:mb-6 border-2 border-gray-700 group-hover:border-gray-500 transition-all object-cover object-center" />
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-4">Sharoon</h2>
              <p className="text-sm sm:text-base text-gray-400 text-center mb-4">Full Stack Developer</p>
              <p className="text-sm sm:text-base text-gray-400 text-center mb-4 sm:mb-6">
                Specializing in creating user experiences through innovative solutions.
              </p>
              <div className="flex justify-center">
                <Link href="https://github.com/Sharoon-Shaleem" target="_blank" 
                      className="text-2xl sm:text-3xl text-gray-400 hover:text-white transition-colors">
                  <FaGithub />
                </Link>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-gray-800/40 p-6 sm:p-8 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all">
              <img src="/haider.jpg" alt="Haider" 
                   className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 sm:mb-6 border-2 border-gray-700 group-hover:border-gray-500 transition-all object-cover object-center" />
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-4">Haider</h2>
              <p className="text-sm sm:text-base text-gray-400 text-center mb-4">Full Stack Developer</p>
              <p className="text-sm sm:text-base text-gray-400 text-center mb-4 sm:mb-6">
                Expert in modern web technologies and intuitive interface development.
              </p>
              <div className="flex justify-center">
                <Link href="https://github.com/haider-9" target="_blank" 
                      className="text-2xl sm:text-3xl text-gray-400 hover:text-white transition-colors">
                  <FaGithub />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
