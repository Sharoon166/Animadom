import React from "react";

const loading = () => {
  return (
    <div>
      {" "}
      <div class="loader h-screen w-screen flex items-center justify-center">
        <div
          data-glitch="Loading..."
          class="relative text-2xl font-bold leading-snug text-white tracking-wider z-10 animate-shift glitch"
        >
          Loading...
          <div class="absolute top-0 left-0 opacity-80 animate-glitch text-glitch-purple z--1 glitch-before">
            Loading...
          </div>
          <div class="absolute top-0 left-0 opacity-80 animate-reverseGlitch text-glitch-green z--2 glitch-after">
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
