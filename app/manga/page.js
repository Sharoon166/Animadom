"use client"
import { useState, useEffect } from 'react';
import Card from "@/components/Trending";

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.jikan.moe/v4/manga?page=${page}`);
      const newData = await res.json();
      setData(prevData => [...prevData, ...newData.data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-5 items-center">
        {data.map((item) => (
          <Card
            key={item.mal_id}
            mal_id={item.mal_id}
            name={item.title}
            imageUrl={item.images.jpg.image_url}
          />
        ))}
      </div>
      {loading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : (
        <button
          onClick={loadMore}
          className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Load More
        </button>
      )}
    </>
  );
};

export default Page;