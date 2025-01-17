"use client";

import React from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Link from "next/link";
import Loading from "@/loading";

// Component to display each genre's collection card
const CollectionCard = ({ name, images, id, backgroundImage }) => (
  <Link
    href={`/collection/${encodeURIComponent(id)}?name=${encodeURIComponent(
      name
    )}`}
  >
   
    <div className="rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 sm:p-6 overflow-hidden w-full max-w-md mx-auto cursor-pointer group relative h-72 sm:h-80 shadow-lg hover:shadow-xl transition-all duration-300">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-300 group-hover:opacity-50"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">
        <h3 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 tracking-wide">
          {name}
        </h3>
        <div className="flex justify-center items-end space-x-3 sm:space-x-4 mb-3 sm:mb-4">
          {images.map((img, index) => (
            <div
              key={index}
              className={`transform transition-all duration-300 ${
                index === 0
                  ? "group-hover:-translate-x-2 sm:group-hover:-translate-x-3 group-hover:-translate-y-2 sm:group-hover:-translate-y-3 group-hover:rotate-3"
                  : index === 1
                  ? "group-hover:-translate-y-3 sm:group-hover:-translate-y-4"
                  : "group-hover:translate-x-2 sm:group-hover:translate-x-3 group-hover:-translate-y-2 sm:group-hover:-translate-y-3 group-hover:rotate-[-3deg]"
              }`}
            >
              <img
                src={img}
                alt={`${name} image ${index + 1}`}
                width={80}
                height={120}
                className="w-20 h-30 sm:w-24 sm:h-36 md:w-28 md:h-42 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
    </div>
  </Link>
);

// Fetching genres and anime using only the Jikan API
const fetchGenresAndAnime = async () => {
  // Fetch genres from Jikan API
  const genresResponse = await fetch(`https://api.jikan.moe/v4/genres/anime`);
  if (!genresResponse.ok) {
    throw new Error("Failed to fetch genres");
  }

  const genresData = await genresResponse.json();

  // Fetch anime images from Jikan API for each genre
  const formattedGenres = await Promise.all(
    genresData.data?.map(async (genre) => {
      try {
        const animeResponse = await fetch(
          `https://api.jikan.moe/v4/anime?genres=${encodeURIComponent(
            genre.mal_id
          )}&limit=20`
        );
        const animeData = await animeResponse.json();

        // Extract images or use a placeholder if no anime are available
        const images =
          animeData.data?.map((anime) => anime.images.jpg.image_url) || [];
        const getRandomImage = () =>
          images[Math.floor(Math.random() * images.length)] ||
          `https://via.placeholder.com/100?text=${encodeURIComponent(
            genre.name
          )}`;

        return {
          id: genre.mal_id,
          name: genre.name,
          images: [getRandomImage(), getRandomImage(), getRandomImage()],
          backgroundImage: getRandomImage(),
        };
      } catch (error) {
        console.error(`Error fetching anime for genre: ${genre.name}`, error);
        return {
          id: genre.mal_id,
          name: genre.name,
          images: [
            `https://via.placeholder.com/150x225?text=${encodeURIComponent(
              genre.name
            )}`,
          ],
          backgroundImage: `https://via.placeholder.com/150x225?text=${encodeURIComponent(
            genre.name
          )}`,
        };
      }
    })
  );

  return formattedGenres;
};

// Initialize QueryClient for react-query
const queryClient = new QueryClient();

// Main page content
function CollectionPageContent() {
  const {
    data: genres,
    isLoading,
    isError,
  } = useQuery("genres", fetchGenresAndAnime);

  if (isLoading)
    return (
      <div className="text-center text-white">
        <Loading />
      </div>
    );
  if (isError)
    return <div className="text-center text-red-500">Error fetching data</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-12 text-center">
        Anime Collections by Genre
        <p className="text-center text-sm sm:text-base text-pink-300 mb-4 italic pt-8">
          ⚠️ Oh no, This site uses a free API, and sometimes the
          kawaii images might be too shy to load. 💔 Please bear with us and try
          again later! 🌸
        </p>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
        {genres?.map((genre) => (
          <CollectionCard key={genre.id} {...genre} />
        ))}
      </div>
    </div>
  );
}

// The main page component with QueryClientProvider
export default function CollectionPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <CollectionPageContent />
    </QueryClientProvider>
  );
}
