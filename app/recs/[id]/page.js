"use client";
import React, { useEffect, useState } from "react";
import Trending from "@/components/Trending";
import Pagination from "@/components/Pagination";

const recs = ({ params }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${params.id}/recommendations`)
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data.data);
        console.log(data.data);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recommendations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(recommendations.length / itemsPerPage);

  return (
    <>
      <h2 className="text-4xl font-bold text-white m-8">
        Anime Recommendations
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 justify-items-center">
        {currentItems.map((recommendation) => {
          const { entry, url, votes } = recommendation;
          const { mal_id, title_english,title, images } = entry;
          const imageUrl = images.jpg.image_url; 
          return (
            <Trending
              key={mal_id}
              mal_id={mal_id}
              name={title_english||title}
              imageUrl={imageUrl}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </>
  );
};

export default recs;
