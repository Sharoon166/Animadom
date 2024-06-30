import React, { useState, useEffect } from "react";
import { topAnime } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import "swiper/css";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Keyboard,
} from "swiper/core";

SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination, Keyboard]);

const ResponsiveCarousel = () => {
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setAnimeData(topAnime);
    };

    fetchData();
  }, []);

  return (
    <div className="py-8 px-4 md:px-8 -mt-48">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 ">
          Top Anime
        </h1>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation
          pagination={{ clickable: true }}
          keyboard
          loop
          className="relative"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 60,
            },
          }}
        >
          {animeData.map((anime, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="w-full h-96 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full h-full object-cover object-center transition-opacity duration-500 hover:opacity-75"
                />
              </div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <Card {...anime} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ResponsiveCarousel;
