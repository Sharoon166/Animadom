"use client";
import Link from "next/link";
import { FaSearch, FaRegTimesCircle, FaBars, FaTimes, FaHome, FaInfoCircle, FaCalendarAlt, FaUserAlt, FaBookmark } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/components/useLanguage';

const Navbar = () => {
  let [search, setSearch] = useState("");
  let [searchResults, setSearchResults] = useState([]);
  let [menuOpen, setMenuOpen] = useState(false);
  const { useJapanese, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (search.length === 0) {
      setSearchResults([]);
      return;
    }

    const time = setTimeout(() => {
      fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=8`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data?.data);
        });
    }, 300);

    return () => {
      clearTimeout(time);
    };
  }, [search]);

  useEffect(() => {
    setSearch("");
    setSearchResults([]);
  }, [pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuOpen && !event.target.closest('.sidebar')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuOpen]);

  const handleClearSearch = () => {
    setSearch("");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleToggleLanguage = () => {
    toggleLanguage();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/browse/${encodeURIComponent(search)}`);
    }
  };

  const isActive = (path) => pathname === path;

  return (
    <>
      <div>
        <nav
          className="text-gray-300 backdrop-blur-md flex justify-between items-center px-4 py-4 relative z-10 bg-gradient-to-b from-[#121212]/60 via-[#121212]/40 to-transparent from-[30%]"
        >
          <div className="rounded-full overflow-hidden size-24 invert">
            <Link href="/">
              <img src="/logo.png" type="img/ico" alt="Logo" />
            </Link>
          </div>
          <ul className="gap-4 items-center hidden lg:flex">
            <Link href="/">
              <li className={`hover:text-white ${isActive('/') ? 'text-yellow-400 font-bold' : ''}`}>Home</li>
            </Link>
            <Link href="/about">
              <li className={`hover:text-white ${isActive('/about') ? 'text-yellow-400 font-bold' : ''}`}>About</li>
            </Link>
            <li>
              <Link href="/upcoming" className={`hover:text-white ${isActive('/upcoming') ? 'text-yellow-400 font-bold' : ''}`}>Upcoming</Link>
            </li>
            <li>
              <Link href="/top_chars" className={`hover:text-white ${isActive('/top_chars') ? 'text-yellow-400 font-bold' : ''}`}>Top Characters</Link>
            </li>
            <li className="bg-gray-200/25 flex items-center justify-center px-2 rounded-full gap-1 relative">
              <FaSearch />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="bg-transparent text-white p-2 outline-none"
                title="Type Slowly, it's a free API 💀"
              />
              {searchResults?.length > 0 && (
                <button onClick={handleClearSearch}>
                  <FaRegTimesCircle />
                </button>
              )}
              <div
                className="absolute top-12 divide-yellow-400 divide-y-2 left-0 z-20 bg-[#121212]/80 backdrop-blur-lg rounded-lg shadow-lg w-[300px] flex flex-col gap-2 max-h-96 overflow-y-auto"
                id="search-results"
                onBlur={() => setSearch("")}
              >
                {searchResults?.map((result) => (
                  <Link
                    key={result.mal_id}
                    href={`/anime/${result.mal_id}`}
                    className="text-white hover:text-gray-300 flex gap-3 items-center transition-colors duration-100 p-2"
                  >
                    <img
                      src={result.images.webp.small_image_url}
                      alt=""
                      className="rounded-md"
                    />
                    {useJapanese ? result.title : (result.title_english || result.title)}
                  </Link>
                ))}
                {searchResults.length > 0 && (
                  <Link
                    href={`/browse/${search}`}
                    className="py-2 text-yellow-400 bg-slate-800 text-center text-lg"
                  >
                    See More Results
                  </Link>
                )}
              </div>
            </li>
            <li>
              <button 
                onClick={handleToggleLanguage} 
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none ${useJapanese ? 'bg-purple-600' : 'bg-pink-500'}`}
              >
                <span 
                  className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${useJapanese ? 'transform translate-x-8' : ''}`}
                ></span>
                <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold text-white ${useJapanese ? '-left-8' : 'left-8'}`}>
                  {useJapanese ? 'JP' : 'EN'}
                </span>
              </button>
            </li>
          </ul>
          <div className="flex gap-4 items-center">
            <Link href="/signup" className="hidden lg:block font-semibold px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-800/50 transition-colors duration-300">
              Sign Up
            </Link>
            <Link href="/login" className="hidden lg:block font-semibold px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-800/50 transition-colors duration-300">
              Log In
            </Link>
            <Link href="https://mangadom.vercel.app" target="_blank" rel="noopener noreferrer" className="hidden lg:block font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-colors duration-300 text-white shadow-lg transform hover:scale-105 hover:rotate-1 active:scale-95 active:rotate-0">
              Mangadom
            </Link>
          </div>
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? <FaTimes size={24}  className="text-yellow-300" /> : <FaBars size={24} className="text-yellow-300"  />}
          </button>
        </nav>
        <div
          className={`${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } fixed top-0 right-0 h-full w-64 bg-[#121212]/90 backdrop-blur-md transition-transform duration-300 ease-in-out lg:hidden z-20 sidebar`}
        >
          <button
            className="absolute top-4 right-4 text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <FaTimes size={24} className="text-yellow-300" />
          </button>
          <ul className="flex flex-col items-start gap-4 p-4 mt-16">
            <li className="w-full">
              <Link href="/" className={`hover:text-white flex items-center gap-2 ${isActive('/') ? 'text-yellow-400 font-bold' : ''}`}>
                <FaHome size={20} />
                <span>Home</span>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/about" className={`hover:text-white flex items-center gap-2 ${isActive('/about') ? 'text-yellow-400 font-bold' : ''}`}>
                <FaInfoCircle size={20} />
                <span>About</span>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/upcoming" className={`hover:text-white flex items-center gap-2 ${isActive('/upcoming') ? 'text-yellow-400 font-bold' : ''}`}>
                <FaCalendarAlt size={20} />
                <span>Upcoming</span>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/top_chars" className={`hover:text-white flex items-center gap-2 ${isActive('/top_chars') ? 'text-yellow-400 font-bold' : ''}`}>
                <FaUserAlt size={20} />
                <span>Top Characters</span>
              </Link>
            </li>
            <li className="w-full">
              <Link href="/collections" className={`hover:text-white flex items-center gap-2 ${isActive('/collections') ? 'text-yellow-400 font-bold' : ''}`}>
                <FaBookmark size={20} />
                <span>Collections</span>
              </Link>
            </li>
            <li className="w-full">
              <button 
                onClick={handleToggleLanguage} 
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${useJapanese ? 'bg-purple-600' : 'bg-pink-500'}`}
              >
                <span 
                  className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${useJapanese ? 'transform translate-x-7' : ''}`}
                ></span>
                <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold text-white ${useJapanese ? '-left-7' : 'left-7'}`}>
                  {useJapanese ? 'JP' : 'EN'}
                </span>
              </button>
            </li>
            <li className="w-full">
              <div className="bg-gray-200/25 flex items-center justify-center px-2 rounded-full gap-1 relative">
                <FaSearch />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className="bg-transparent text-white p-1 outline-none w-full text-sm"
                  title="Type Slowly, it's a free API 💀"
                />
                {search && (
                  <button onClick={handleClearSearch}>
                    <FaRegTimesCircle />
                  </button>
                )}
              </div>
            </li>
            <li className="w-full">
              <button
                onClick={handleSearch}
                className="w-full bg-yellow-400 text-black px-3 py-2 rounded-full hover:bg-yellow-500 transition-colors duration-300 text-sm"
              >
                Search
              </button>
            </li>
            <li className="w-full">
              <Link href="/signup" className="font-semibold px-3 py-2 rounded-full bg-zinc-800 hover:bg-zinc-800/50 transition-colors duration-300 text-sm block text-center">
                Sign Up
              </Link>
            </li>
            <li className="w-full">
              <Link href="/login" className="font-semibold px-3 py-2 rounded-full bg-zinc-800 hover:bg-zinc-800/50 transition-colors duration-300 text-sm block text-center">
                Log In
              </Link>
            </li>
            <li className="w-full">
              <Link href="https://mangadom.vercel.app" target="_blank" rel="noopener noreferrer" className="font-semibold px-3 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-colors duration-300 text-white shadow-lg transform hover:scale-105 hover:rotate-1 active:scale-95 active:rotate-0 text-sm block text-center">
                Mangadom
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {showPopup && (
        <div className="fixed bottom-4 left-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce transition-all duration-300 ease-in-out transform hover:scale-105">
          <span className="font-bold text-lg">Language switched!</span>
          <span className="block text-sm mt-1">🎌 {useJapanese ? 'Japanese' : 'English'} 🎌</span>
        </div>
      )}
    </>
  );
};

export default Navbar;
