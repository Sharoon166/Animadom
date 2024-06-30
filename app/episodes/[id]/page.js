"use client";

import { useEffect, useState } from "react";

const AnimeEpisodesPage = ({ params }) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${params.id}/episodes`)
      .then((res) => res.json())
      .then((data) => setEpisodes(data.data))
      .catch((err) => console.error(err));

    
  }, []);

  return (
    <div className="container mx-auto p-4  text-gray-200">
        <h3 className="text-2xl text-yellow-400 p-8">Episodes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((episode) => (
          <div
            key={episode.mal_id}
            className="max-w-sm rounded-lg overflow-hidden shadow-lg p-6 m-4 bg-gray-900 text-white transform transition duration-500 hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-2">{episode.title_japanese}</h3>
            <h4 className="text-lg mb-4">{episode.title_romanji}</h4>
            <p className="text-base mb-2">
              <strong>Aired:</strong> {new Date(episode.aired).toDateString()}
            </p>
            <p className="text-base mb-2">
              <strong>Score:</strong> {episode.score}
            </p>
            <p className="text-base mb-2">
              <strong>Filler:</strong> {episode.filler ? "Yes" : "No"}
            </p>
            <p className="text-base mb-4">
              <strong>Recap:</strong> {episode.recap ? "Yes" : "No"}
            </p>
            <a
              href={episode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-blue-400 hover:text-blue-500 hover:underline"
            >
              Watch Episode
            </a>
            <a
              href={episode.forum_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-blue-400 hover:text-blue-500 hover:underline"
            >
              Forum Discussion
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeEpisodesPage;
