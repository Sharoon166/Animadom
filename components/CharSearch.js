"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const CharSearch = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (search.length === 0) {
      setSearchResults([]);
      return;
    }

    const time = setTimeout(() => {
      fetch(`https://api.jikan.moe/v4/characters?q=${search}&limit=8`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data?.data);
        });
    }, 600);

    return () => {
      clearTimeout(time);
    };
  }, [search]);

  return (
    <div className="flex justify-center items-center  relative">
      {console.log(searchResults)}
      <div className="flex justify-center items-center mt-10 relative">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-16 py-2 bg-gray-800 text-white rounded-full border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 ease-in-out"
            placeholder="Search for a character..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="absolute flex left-0 w-full items-center z-50 mt-4">
          <div
            className={`mt-4 absolute top-full w-full transition-opacity duration-500 ${
              searchResults.length === 0
                ? "opacity-0 max-h-0"
                : "opacity-100 max-h-screen"
            }`}
          >
            <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
              <ul>
                {searchResults.map((result) => (
                  <Link
                  href={`/chars/${result.mal_id}`}
                    key={result.mal_id}
                    className="py-1 hover:bg-gray-700 px-2 rounded transition flex items-center gap-3"
                  >
                    <img
                      src={result.images.webp.small_image_url}
                      alt=""
                      className="w-10 h-12 object-cover object-center"
                    />
                    <div>{result.name} </div>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharSearch;
