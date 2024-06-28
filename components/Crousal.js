"use client";
import React, { useState, useEffect } from "react";
import { topAnime } from "@/constants"; // Assuming topAnime is imported correctly
import Card from "./Card";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination, Keyboard, InfiniteScroll } from 'swiper/core';

// Initialize Swiper core components
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination, Keyboard, InfiniteScroll]);

const ResponsiveCarousel = () => {
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    // Simulate fetching data with async function
    const fetchData = async () => {
      // Here you might fetch data from an API or set it directly as you did
      setAnimeData(topAnime); // Assuming topAnime is correctly populated
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-8"> {/* Adjust padding for responsiveness */}
      <div className="container mx-auto relative z-20 -m-32">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-8"> {/* Adjust font size for responsiveness */}
          Top Anime
        </h1>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          loop={true} // Enable infinite scroll
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {animeData.map((anime, index) => (
            <SwiperSlide key={index} className="px-2 h-full">
              <Card {...anime} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ResponsiveCarousel;
