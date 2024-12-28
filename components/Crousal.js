import React, { useState, useEffect } from "react";
import { topAnime } from "@/constants";
import Link from "next/link";

const ResponsiveCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setSlidesPerView(1);
    } else if (window.innerWidth < 768) {
      setSlidesPerView(2);
    } else if (window.innerWidth < 1024) {
      setSlidesPerView(3);
    } else {
      setSlidesPerView(4);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === topAnime.length - slidesPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? topAnime.length - slidesPerView : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [slidesPerView]);

  const slideWidth = 100 / slidesPerView;

  return (
    <div className="py-8 -mt-48">
      <div className="container mx-auto px-4">
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * slideWidth}%)`,
              }}
            >
              {topAnime.map((anime, index) => (
                <Link
                  href={`/anime/${anime.id}`}
                  key={index}
                  className={`w-[${slideWidth}%] flex-shrink-0 px-2`}
                  style={{ width: `${slideWidth}%` }}
                >
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer">
                    <img
                      src={anime.imageUrl}
                      alt={anime.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-300 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-sm font-medium text-white/90 mb-1">
                          {anime.name}
                        </p>
                        <div className="flex items-center">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-xs text-white/80 ml-1">
                            {anime.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute -left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-1.5 rounded-full transition-colors"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-1.5 rounded-full transition-colors"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveCarousel;
