"use client";
import Link from "next/link";
import { FaSearch, FaRegTimesCircle, FaBars, FaTimes, FaHome, FaInfoCircle, FaCalendarAlt, FaUserAlt, FaBookmark } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/components/useLanguage';
import toast, { Toaster } from 'react-hot-toast';

const NavLink = ({ href, icon: Icon, children, isActive }) => (
  <Link 
    href={href} 
    className={`group flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:text-white
      ${isActive ? 'text-yellow-400 font-bold bg-white/10' : 'hover:bg-white/5'}`}
  >
    {Icon && <Icon size={20} className="group-hover:scale-110 transition-transform duration-300" />}
    <span>{children}</span>
  </Link>
);

const customToast = {
  success: (message) => {
    toast.success(message, {
      style: {
        background: '#1A1A1A',
        color: '#fff',
        padding: '16px',
        borderRadius: '12px',
      },
      duration: 2000,
      icon: '🎌',
      position: 'bottom-left',
      className: 'border border-yellow-400/20',
    });
  },
  error: (message) => {
    toast.error(message, {
      style: {
        background: '#1A1A1A',
        color: '#fff',
        padding: '16px',
        borderRadius: '12px',
      },
      duration: 2000,
      icon: '⚠️',
      position: 'bottom-left',
      className: 'border border-red-400/20',
    });
  }
};

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { useJapanese, toggleLanguage } = useLanguage();
  const pathname = usePathname();
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

    return () => clearTimeout(time);
  }, [search]);

  const handleToggleLanguage = () => {
    toggleLanguage();
    customToast.success(`Now displaying in ${useJapanese ? 'Japanese' : 'English'}`);
  };

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/browse/${encodeURIComponent(search)}`);
      setMenuOpen(false);
    } else {
      customToast.error('Please enter a search term');
    }
  };

  const isActive = (path) => pathname === path;

  return (
    <>
      <Toaster />
      <nav className="relative top-0 z-50 text-gray-300 backdrop-blur-md flex justify-between items-center px-4 py-4 bg-gradient-to-b from-[#121212]/60 via-[#121212]/40 to-transparent">
        <Link href="/" className="rounded-full overflow-hidden size-24 invert">
          <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <NavLink href="/" isActive={isActive('/')}>Home</NavLink>
          <NavLink href="/about" isActive={isActive('/about')}>About</NavLink>
          <NavLink href="/upcoming" isActive={isActive('/upcoming')}>Upcoming</NavLink>
          <NavLink href="/top_chars" isActive={isActive('/top_chars')}>Top Characters</NavLink>
          <NavLink href="/collections" isActive={isActive('/collections')}>Collections</NavLink>
          
          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search anime..."
                className="bg-transparent ml-2 outline-none w-64"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-gray-400 hover:text-white">
                  <FaRegTimesCircle />
                </button>
              )}
            </div>
            
            {/* Search Results Dropdown */}
            {searchResults?.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-zinc-900/95 backdrop-blur-md rounded-lg shadow-xl border border-zinc-700/50">
                {searchResults.map((result) => (
                  <Link
                    key={result.mal_id}
                    href={`/anime/${result.mal_id}`}
                    className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors"
                  >
                    <img
                      src={result.images.webp.small_image_url}
                      alt=""
                      className="w-12 h-16 object-cover rounded"
                    />
                    <span>{useJapanese ? result.title : (result.title_english || result.title)}</span>
                  </Link>
                ))}
                <Link
                  href={`/browse/${search}`}
                  className="block text-center py-3 text-yellow-400 hover:bg-white/5 border-t border-zinc-700/50"
                >
                  See all results
                </Link>
              </div>
            )}
          </div>

          {/* Language Toggle */}
          <button 
  onClick={handleToggleLanguage} 
  className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none ${useJapanese ? 'bg-purple-600' : 'bg-pink-500'}`}
>
  <span 
    className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${useJapanese ? 'transform translate-x-8' : ''}`}
  ></span>
  <span className={`absolute inset-0 flex items-center ${useJapanese ? 'justify-start pl-2' : 'justify-end pr-2'} text-xs font-bold text-white`}>
    {useJapanese ? 'JP' : 'EN'}
  </span>
</button>


          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link href="/signup" className="btn-primary">Sign Up</Link>
            <Link href="/login" className="btn-secondary">Log In</Link>
            <Link href="https://mangadom.vercel.app" target="_blank" rel="noopener noreferrer" 
              className="btn-gradient">
              Mangadom
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-yellow-300 p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </nav>

      {/* Fixed Mobile Sidebar */}
      <div 
        className={`
          fixed inset-y-0 right-0 w-72 
          bg-gradient-to-b from-[#121212]/95 to-[#121212]/90 
          backdrop-blur-lg shadow-2xl
          transform transition-transform duration-300 ease-in-out 
          lg:hidden z-50 overflow-y-auto
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col p-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 p-2 text-yellow-300 hover:bg-white/10 rounded-full transition-colors"
          >
            <FaTimes size={24} />
          </button>

          <div className="mt-16 flex flex-col gap-6">
            {/* Mobile Search */}
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <FaSearch className="text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search anime..."
                  className="bg-transparent w-full outline-none"
                />
                {search && (
                  <button onClick={() => setSearch("")}>
                    <FaRegTimesCircle className="text-gray-400" />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                className="w-full mt-3 bg-yellow-400 text-black py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
              >
                Search
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-2">
              <NavLink href="/" icon={FaHome} isActive={isActive('/')}>Home</NavLink>
              <NavLink href="/about" icon={FaInfoCircle} isActive={isActive('/about')}>About</NavLink>
              <NavLink href="/upcoming" icon={FaCalendarAlt} isActive={isActive('/upcoming')}>Upcoming</NavLink>
              <NavLink href="/top_chars" icon={FaUserAlt} isActive={isActive('/top_chars')}>Top Characters</NavLink>
              <NavLink href="/collections" icon={FaBookmark} isActive={isActive('/collections')}>Collections</NavLink>
            </nav>

            {/* Language Toggle */}
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
              <span>Language</span>
              <button 
                onClick={handleToggleLanguage}
                className={`relative w-14 h-7 rounded-full transition-colors ${useJapanese ? 'bg-purple-600' : 'bg-pink-500'}`}
              >
                <span className={`absolute inset-1 w-5 h-5 bg-white rounded-full transition-transform ${useJapanese ? 'translate-x-7' : ''}`} />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto flex flex-col gap-3">
              <Link href="/signup" className="btn-primary text-center">Sign Up</Link>
              <Link href="/login" className="btn-secondary text-center">Log In</Link>
              <Link href="https://mangadom.vercel.app" className="btn-gradient text-center">
                Mangadom
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;