import React from "react";
import { animegenres } from "@/constants";
import Link from "next/link";

const Collection = () => {
  return (
    <div className="mt-10 space-y-10">
      <h1 className="text-4xl font-bold text-white">Featured Collections</h1>
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