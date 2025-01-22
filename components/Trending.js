import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimeCard = ({ mal_id, name, imageUrl, year, genre }) => {
  const cardRef = useRef(null);

  return (
    <div ref={cardRef} className="group relative w-full xs:w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px] h-[320px] sm:h-[380px] transition-all">
      <div className="absolute inset-0 bg-[#333] rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-700 scale-110 group-hover:scale-100"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#333]/50 to-[#222]/90 group-hover:backdrop-blur-[2px] transition-all duration-500 ease-in-out" />
        
        <div className="absolute bottom-0 w-full p-3 sm:p-4 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <Link href={`/seasons/${year}/winter`}>
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-[#444]/30 text-[#e0e0e0] rounded-lg backdrop-blur-md border border-[#444]/20 hover:bg-[#555]/30 cursor-pointer">
                {year}
              </span>
            </Link>
            <Link href={`/collection/${genre}`}>
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-[#444]/30 text-[#e0e0e0] rounded-lg backdrop-blur-md border border-[#444]/20 hover:bg-[#555]/30 cursor-pointer">
                {genre}
              </span>
            </Link>
          </div>
          
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#e0e0e0] mb-2 sm:mb-3 leading-tight line-clamp-2">
            {name}
          </h2>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            <Link href={`/anime/${mal_id}`}>
              <button className="w-full py-1.5 sm:py-2 text-sm sm:text-base bg-[#444] text-[#e0e0e0] font-bold rounded-lg hover:bg-[#555] transition-all duration-300 ease-in-out shadow-sm">
                More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
