import React, { useState, useEffect } from "react";
import { topAnime } from "@/constants";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ResponsiveCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === topAnime.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? topAnime.length - 1 : prev - 1));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="h-[88vh] md:h-[90vh] relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
<div className="container mx-auto h-full relative px-4 sm:px-6 md:px-8">
        <AnimatePresence mode="wait">
          {topAnime.map((anime, index) => (
            currentIndex === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={anime.imageUrl}
                  alt={anime.name}
                  fill
                  priority
                  className="object-cover rounded-lg shadow-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent rounded-lg">
                  <div className="flex flex-col justify-end h-full ml-4 md:ml-16 max-w-lg pb-8 md:pb-16">
                    <div className="h-24 md:h-40 w-48 md:w-80 mb-4 md:mb-8">
                      <Image
                        src={anime.titleImage}
                        alt={anime.name}
                        width={320}
                        height={160}
                        className="object-contain"
                        priority
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <div className="flex items-center mb-2 md:mb-4">
                        <span className="text-yellow-400 text-lg md:text-xl">★</span>
                        <span className="text-lg md:text-xl ml-2 text-white font-medium">{anime.rating}</span>
                      </div>
                      <p className="text-gray-100 text-base md:text-lg line-clamp-2 md:line-clamp-3 mb-4 md:mb-6">
                        {anime.description}
                      </p>
                      <Link
                        href={`/anime/${anime.id}`}
                        className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base"
                      >
                        Learn More
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation Buttons - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm z-10"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm z-10"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
          {topAnime.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-white scale-125" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveCarousel;
