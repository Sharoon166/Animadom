"use client";

import React, { useEffect, useState } from "react";
import Trending from "@/components/Trending";
function page({ params }) {
  const { searchQuery } = params;
  let [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    console.log(searchQuery);
    fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&order_by=popularity`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data?.data);
        console.log(data.data);
      });
  }, []);
  return (
    <div className="container mx-auto space-y-10 mb-20">
      <h2 className="text-2xl mt-10 p-8 ">
        Search Results for "{searchQuery}"{" "}
      </h2>
      <div className=" flex justify-center gap-5 items-center flex-wrap">
        {searchResults.map((search) => {
          const {
            mal_id,
            title,
            images: {
              jpg: { image_url },
            },
            year,
          } = search;
          return (
            <Trending
              key={mal_id}
              mal_id={mal_id}
              name={title}
              imageUrl={image_url}
              year={year}
            />
          );
        })}
      </div>
    </div>
  );
}

export default page;
