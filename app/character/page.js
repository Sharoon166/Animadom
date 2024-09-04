"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CharCard from '@/components/CharCard';
import {loading} from '@/loading';

const CharacterPage = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  useEffect(() => {
    if (name) {
      fetch(`https://api.jikan.moe/v4/characters?q=${encodeURIComponent(name)}&order_by=favorites&sort=desc&page=${currentPage}`)
        .then(res => res.json())
        .then(data => {
          setCharacters(data.data || []);
          setTotalPages(data.pagination.last_visible_page || 1);
        })
        .catch(error => console.error('Error fetching characters:', error));
    }
  }, [name, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Search Results for: {name}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {characters.map(char => (
          <CharCard
            key={char.mal_id}
            id={char.mal_id}
            name={char.name}
            imageUrl={char.images.jpg.image_url}
            favs={`Favorites: ${char.favorites}`}
            nicks={char.nicknames.join(', ')}
          />
        ))}
      </div>
      {characters.length === 0 && (   loading )}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg"
          >
            Previous
          </button>
          <span className="text-white py-2 px-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full ml-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterPage;
