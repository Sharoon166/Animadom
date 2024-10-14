import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimeCard = ({ mal_id, name, imageUrl, year, genre }) => {
  const cardRef = useRef(null);

 

  return (
    <div ref={cardRef} className="relative flex h-96 w-52 rounded-[1.5em] text-lime-300 overflow-hidden">
      <div className="group absolute left-1/2 top-1/2 flex h-[3em] w-[3em] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-[1.5em] border-[1px] border-[#ffffffaa] bg-[#8988885c] backdrop-blur-[6px] duration-[500ms] hover:h-80 hover:w-48 hover:rounded-[1.5em]">
        <svg
          className="h-[1.5em] w-[1.5em] duration-300 group-hover:opacity-0"
          viewBox="0 0 48 48"
          fill="none"
          height="48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#a)">
            <path
              clipRule="evenodd"
              d="M21.6 36h4.8V21.6h-4.8V36ZM24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0Zm0 43.2C13.44 43.2 4.8 34.56 4.8 24 4.8 13.44 13.44 4.8 24 4.8c10.56 0 19.2 8.64 19.2 19.2 0 10.56-8.64 19.2-19.2 19.2Zm-2.4-26.4h4.8V12h-4.8v4.8Z"
              fillRule="evenodd"
              fill="#fff"
            ></path>
          </g>
          <defs>
            <clipPath id="a">
              <path d="M0 0h48v48H0z" fill="#fff"></path>
            </clipPath>
          </defs>
        </svg>
        <div className="items-left duration-600 absolute p-4 flex flex-col gap-3 left-0 translate-y-[100%] justify-between font-nunito text-[hsl(0,0%,85%)] group-hover:translate-y-0">
          <div className="items-left flex flex-col justify-center">
            <Link
              href={`/anime/${mal_id}`}
              className="text-lg font-bold leading-[0.8em] hover:cursor-pointer hover:underline"
            >
              {name}
            </Link>
          </div>
          <p className="text-[0.7em]">
            {year}, {genre}
          </p>
        </div>
      </div>
      <img src={imageUrl} alt="" className="object-cover object-center" />
    </div>
  );
};

export default AnimeCard;
