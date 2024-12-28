"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { motion } from "framer-motion";
import { FaPlay, FaComments, FaStar, FaCalendar } from "react-icons/fa";
import Loading from "@/loading";

const AnimeEpisodesPage = ({ params }) => {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const episodesPerPage = 20;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.jikan.moe/v4/anime/${params.id}/episodes`)
      .then((res) => res.json())
      .then((data) => {
        setEpisodes(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
      />

      <div className="container mx-auto px-4 py-12 relative">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-16"
        >
          <span>
            Episode Guide
          </span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {currentEpisodes.map((episode, index) => (
            <motion.div
              key={episode.mal_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-6 backdrop-blur-xl border border-white/10 hover:border-yellow-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-start mb-6">
                <span className="px-4 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                  EP {episode.mal_id}
                </span>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaCalendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(episode.aired).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 line-clamp-1">
                {episode.title_japanese}
              </h3>
              <h4 className="text-lg text-gray-300 mb-4 line-clamp-1">
                {episode.title_romanji}
              </h4>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <FaStar className="w-5 h-5 text-yellow-400" />
                  <span className="text-white/90 font-medium">
                    {episode.score || 'Not rated'}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  {episode.filler && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium ring-1 ring-red-500/20">
                      Filler
                    </span>
                  )}
                  {episode.recap && (
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium ring-1 ring-blue-500/20">
                      Recap
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={episode.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-xl font-medium transition-colors"
                >
                  <FaPlay className="w-4 h-4" />
                  Watch Now
                </a>
                <a
                  href={episode.forum_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-yellow-500 text-yellow-400 hover:bg-yellow-500/20 rounded-xl font-medium transition-colors"
                >
                  <FaComments className="w-4 h-4" />
                  Discuss
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(episodes.length / episodesPerPage)}
            onPageChange={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimeEpisodesPage;
