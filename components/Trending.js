import React from "react";
import Link from "next/link";

const AnimeCard = ({ mal_id, name, imageUrl, year, genre }) => {
  return (
    <div className="group relative w-full max-w-[200px] sm:max-w-[350px] min-w-[200px] h-[240px] sm:h-[400px] transition-all mx-auto rounded-xl overflow-hidden shadow-lg hover:shadow-2xl">
      {/* Image Container */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/40 to-[#000000]/90 transition-all duration-500" />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-6">
        {/* Year and Genre */}
        <div className="flex gap-2 mb-2">
          <Link href={`/seasons/${year}/winter`}>
            <span className="text-xs bg-[#ffffff]/20 backdrop-blur-sm px-2 py-1 rounded-md text-[#e0e0e0] hover:bg-[#ffffff]/30 transition-all">
              {year}
            </span>
          </Link>
          <span className="text-xs bg-[#ffffff]/20 backdrop-blur-sm px-2 py-1 rounded-md text-[#e0e0e0]">
            {genre}
          </span>
        </div>

        {/* Anime Title */}
        <h2 className="text-sm sm:text-xl font-bold text-[#e0e0e0] mb-3 leading-tight line-clamp-2 hover:underline cursor-pointer">
          {name}
        </h2>

        {/* View Details Button */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
          <Link href={`/anime/${mal_id}`}>
            <button className="w-full py-2 bg-[#ffffff]/20 backdrop-blur-sm text-[#e0e0e0] text-sm font-semibold rounded-lg hover:bg-[#ffffff]/30 transition-all duration-300 ease-in-out shadow-sm">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default AnimeCard;
