import React from "react";
import { animegenres } from "@/constants";
import Link from "next/link";
import Button from "./Button";

const Collection = () => {
    
    return (
      <div className="mt-10 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-center ">   
                <div className="relative mb-6 m-4 md:mb-0">
                  <h1 className="text-3xl md:text-4xl  font-bold text-white tracking-widest">
                    Featured
                    <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-transparent bg-clip-text ml-2 md:ml-4 animate-gradient text-shadow-xl">
                      Collections
                    </span>
                  </h1>
                  <div className="absolute -bottom-3 left-0 w-full md:w-1/3 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600"></div>
                </div>   
                 <Button href="/collections" className="mt-5">
          View More Collections
        </Button>
        </div>
        <div className="flex gap-10 flex-wrap justify-center">
          {animegenres.map((genre) => (
            <Collectioncard
              key={genre.id}
              name1={genre.name1}
              name2={genre.name2}
              img1={genre.img1}
              img2={genre.img2}
              img3={genre.img3}
            />
          ))}
        </div>
       
      </div>
    );
  };

const Collectioncard = ({ name1, name2, img1, img2, img3 }) => {
  return (
    <div className="rounded-lg bg-zinc-700 p-10 pb-0 overflow-hidden max-w-md cursor-pointer group">
      <h3 className="text-center text-2xl font-semibold">
        {name1}
        <div>{name2}</div>
      </h3>
      <div className="flex justify-center *:-mr-10 *:w-1/3 *:min-w-sm mx-auto translate-y-12">
        <Link href={`/anime/${img1.malId}`}>
          <img
            src={img1.url}
            alt={name2}
            className="-rotate-12 rounded-md group-hover:-translate-x-8 group-hover:-translate-y-7 group-hover:scale-90 transition-all duration-150"
          />
        </Link>
        <Link href={`/anime/${img2.malId}`}>
          <img
            src={img2.url}
            alt={name2}
            className="-rotate-6 rounded-md group-hover:rotate-0 group-hover:-translate-y-11 transition-all duration-150 group-hover:scale-90"
          />
        </Link>
        <Link href={`/anime/${img3.malId}`}>
          <img
            src={img3.url}
            alt={name2}
            className="-rotate-3 rounded-md group-hover:translate-x-8 group-hover:-translate-y-7 group-hover:scale-90 transition-all duration-150 group-hover:rotate-3"
          />
        </Link>
      </div>
    </div>
  );
};

export default Collection;