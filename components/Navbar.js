"use client";
import React, { useState } from "react";
import {
  FaSearch,
  FaRegTimesCircle,
  FaHome,
  FaInfoCircle,
  FaCalendarAlt,
  FaUserAlt,
  FaBookmark,
  FaBars,
  FaTimes,
  FaUserPlus,
  FaSignInAlt,
  FaBook,
} from "react-icons/fa";
import { useLanguage } from "./useLanguage";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Button from "./Button";

const NavLink = ({ href, icon: Icon, children, isActive }) => (
  <Link
    href={href}
    className={`group flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:text-white
      ${
        isActive ? "text-yellow-400 font-bold bg-white/10" : "hover:bg-white/5"
      }`}
  >
    {Icon && (
      <Icon
        size={20}
        className="group-hover:scale-110 transition-transform duration-300"
      />
    )}
    <span>{children}</span>
  </Link>
);

const customToast = {
  success: (message) => {
    toast.success(message, {
      style: {
        background: "#1A1A1A",
        color: "#fff",
        padding: "16px",
        borderRadius: "12px",
      },
      duration: 2000,
      icon: "🎌",
      position: "bottom-left",
      className: "border border-yellow-400/20",
    });
  },
  error: (message) => {
    toast.error(message, {
      style: {
        background: "#1A1A1A",
        color: "#fff",
        padding: "16px",
        borderRadius: "12px",
      },
      duration: 2000,
      icon: "⚠️",
      position: "bottom-left",
      className: "border border-red-400/20",
    });
  },
};

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { useJapanese, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const handleToggleLanguage = () => {
    toggleLanguage();
    customToast.success(
      `Now displaying in ${useJapanese ? "English" : "Japanese"}`
    );
  };

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search)}`);
      setMenuOpen(false);
    } else {
      customToast.error("Please enter a search term");
    }
  };

  const isActive = (path) => pathname === path;

  return (
    <>
      <Toaster />
      <nav className=" text-gray-300 backdrop-blur-md flex items-center px-4 py-4 bg-gradient-to-b from-[#121212]/60 via-[#121212]/40 to-transparent">
        {/* Logo */}
        <Link href="/" className="rounded-full overflow-hidden size-16 invert">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </Link>

        {/* Main Navigation Container */}
        <div className="hidden lg:flex items-center gap-8 mx-auto">
          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <NavLink href="/" isActive={isActive("/")}>
              Home
            </NavLink>
            <NavLink href="/about" isActive={isActive("/about")}>
              About
            </NavLink>
            <NavLink href="/upcoming" isActive={isActive("/upcoming")}>
              Upcoming
            </NavLink>
            <NavLink href="/top_chars" isActive={isActive("/top_chars")}>
              Top Characters
            </NavLink>
            <NavLink href="/collections" isActive={isActive("/collections")}>
              Collections
            </NavLink>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div
              className={`flex items-center transition-all duration-300 ease-out ${
                isSearchExpanded
                  ? "bg-white/5 border border-white/10 rounded-full w-64"
                  : "bg-transparent w-10"
              }`}
            >
              <button
                onClick={() => setIsSearchExpanded(true)}
                className={`p-2.5 text-gray-400 hover:text-white transition-colors ${
                  isSearchExpanded ? "hidden" : "block"
                }`}
              >
                <FaSearch className="h-5 w-5" />
              </button>

              {isSearchExpanded && (
                <div className="flex-1 flex items-center">
                  <FaSearch className="ml-4 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search..."
                    className="w-full px-3 py-2.5 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setSearch("");
                      setIsSearchExpanded(false);
                    }}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <FaRegTimesCircle className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={handleToggleLanguage}
            className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none ${
              useJapanese ? "bg-purple-600" : "bg-pink-500"
            }`}
          >
            <span
              className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                useJapanese ? "transform translate-x-8" : ""
              }`}
            ></span>
            <span
              className={`absolute inset-0 flex items-center ${
                useJapanese ? "justify-start pl-2" : "justify-end pr-2"
              } text-xs font-bold text-white`}
            >
              {useJapanese ? "JP" : "EN"}
            </span>
          </button>

          {/* Action Icons */}
          <div className="flex gap-3">
       
            <Link
              href="https://mangadom.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-white/5 rounded-lg transition-all"
              title="Mangadom"
            >
              <FaBook size={20} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden ml-auto text-yellow-300 p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </nav>
      {/* Mobile Sidebar - keeping the original mobile menu implementation */}
      <div
        className={`fixed inset-y-0 right-0 w-72 
          bg-gradient-to-b from-[#121212]/95 to-[#121212]/90 
          backdrop-blur-lg shadow-2xl
          transform transition-transform duration-300 ease-in-out 
          lg:hidden z-50 overflow-y-auto
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
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
                  placeholder="Search..."
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
              <NavLink href="/" icon={FaHome} isActive={isActive("/")}>
                Home
              </NavLink>
              <NavLink
                href="/about"
                icon={FaInfoCircle}
                isActive={isActive("/about")}
              >
                About
              </NavLink>
              <NavLink
                href="/upcoming"
                icon={FaCalendarAlt}
                isActive={isActive("/upcoming")}
              >
                Upcoming
              </NavLink>
              <NavLink
                href="/top_chars"
                icon={FaUserAlt}
                isActive={isActive("/top_chars")}
              >
                Top Characters
              </NavLink>
              <NavLink
                href="/collections"
                icon={FaBookmark}
                isActive={isActive("/collections")}
              >
                Collections
              </NavLink>
            </nav>

            {/* Language Toggle */}
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
              <span>Language</span>
              <button
                onClick={handleToggleLanguage}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  useJapanese ? "bg-purple-600" : "bg-pink-500"
                }`}
              >
                <span
                  className={`absolute inset-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    useJapanese ? "translate-x-7" : ""
                  }`}
                />
              </button>
            </div>

            {/* Mobile Action Icons */}
            <div className="mt-auto flex justify-around">
             <Button href="https://mangadom.vercel.app">
              Mangadom
             </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
