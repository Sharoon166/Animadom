import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CharCard = ({ id, name, imageUrl, favs, nicks }) => {
  const cardRef = useRef(null);

  return (
    <div ref={cardRef} className="group relative  w-full max-w-[200px] sm:max-w-[350px] min-w-[200px] h-[240px] sm:h-[400px]  transition-all">
      <div className="absolute inset-0 bg-[#333] rounded-xl shadow-lg overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-700 scale-110 group-hover:scale-100"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#333]/50 to-[#222]/90 group-hover:backdrop-blur-[2px] transition-all duration-500 ease-in-out" />
        
        <div className="absolute bottom-0 w-full p-3 sm:p-4 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
          <Link href={`/chars/${id}`}>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#e0e0e0] mb-2 sm:mb-3 leading-tight line-clamp-2 hover:underline cursor-pointer">
              {name}
            </h2>
          </Link>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            <p className="text-xs sm:text-sm text-[#e0e0e0] mb-2 sm:mb-3">
              Favorites: {favs}
              {nicks && <span className="block mt-1">Nicknames: {nicks}</span>}
            </p>
            <Link href={`/chars/${id}`}>
              <button className="w-full py-1.5 sm:py-2 bg-[#444] text-[#e0e0e0] text-sm sm:text-base font-bold rounded-lg hover:bg-[#555] transition-all duration-300 ease-in-out shadow-sm">
                View Character
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharCard;
