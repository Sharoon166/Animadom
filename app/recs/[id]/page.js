"use client";
import React, { useEffect, useState } from "react";
import Trending from "@/components/Trending";

const recs = ({ params }) => {
  const [recommendations, seteRcommendations] = useState([]);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${params.id}/recommendations`)
      .then((res) => res.json())
      .then((data) => {
        seteRcommendations(data.data);
        console.log(data.data);
      });
  }, []);

  return (
    <>
      <h2 className="text-4xl font-bold text-white m-8">
        Top Anime Recommendations
      </h2>
      <div className=" flex justify-center gap-5 items-center flex-wrap">
        {recommendations.map((recommendation) => {
          const { entry, url, votes } = recommendation;
          const { mal_id, title, images } = entry;
          const imageUrl = images.jpg.image_url; // You can choose between jpg or webp based on preference

          return (
            
            <Trending
              key={mal_id}
              mal_id={mal_id}
              name={title}
              imageUrl={imageUrl}
              
            />
          );
        })}
      </div>
    </>
  );
};

export default recs;
