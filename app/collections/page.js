"use client";

import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import Link from 'next/link';
import Loading from '@/loading';
import { FaArrowRight } from "react-icons/fa";

const CollectionCard = ({ name, images, id, backgroundImage }) => (
  <Link href={`/collection/${encodeURIComponent(id)}?name=${encodeURIComponent(name)}`}>
    <div className="rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 sm:p-6 overflow-hidden w-full max-w-md mx-auto cursor-pointer group relative h-60 sm:h-72 shadow-lg hover:shadow-xl transition-all duration-300">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-300 group-hover:opacity-50" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">
        <h3 className="text-center text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4 tracking-wide">
          {name}
        </h3>
        <div className="flex justify-center items-end space-x-2 sm:space-x-3 mb-2 sm:mb-3">
          {images.map((img, index) => (
            <div key={index} className={`transform ${index === 0 ? 'group-hover:-translate-x-1 sm:group-hover:-translate-x-2 group-hover:-translate-y-1 sm:group-hover:-translate-y-2 group-hover:rotate-3' : index === 1 ? 'group-hover:-translate-y-2 sm:group-hover:-translate-y-3' : 'group-hover:translate-x-1 sm:group-hover:translate-x-2 group-hover:-translate-y-1 sm:group-hover:-translate-y-2 group-hover:rotate-[-3deg]'} transition-all duration-300`}>
              <img
                src={img}
                alt={`${name} image ${index + 1}`}
                width={60}
                height={90}
                className="w-16 h-16 sm:w-20 sm:h-30 md:w-24 md:h-36 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
    </div>
  </Link>
);

const fetchGenresAndAnime = async () => {
  const genresResponse = await fetch(`https://api.jikan.moe/v4/genres/anime`);
  const genresData = await genresResponse.json();

  const formattedGenres = await Promise.all(genresData.data?.map(async (genre) => {
    const kitsuResponse = await fetch(`https://kitsu.io/api/edge/anime?filter[genres]=${encodeURIComponent(genre.name)}&page[limit]=20&fields[anime]=posterImage`);
    const kitsuData = await kitsuResponse.json();
    
    const images = kitsuData.data?.map(anime => anime.attributes.posterImage.medium) || [];

    const getRandomImage = () => images[Math.floor(Math.random() * images.length)] || `https://via.placeholder.com/150x225?text=${encodeURIComponent(genre?.name)}`;

    return {
      id: genre?.mal_id,
      name: genre?.name,
      images: [getRandomImage(), getRandomImage(), getRandomImage()],
      backgroundImage: getRandomImage()
    };
  }));

  return formattedGenres;
};

const queryClient = new QueryClient();

function CollectionPageContent() {
  const { data: genres, isLoading, isError } = useQuery('genres', fetchGenresAndAnime);

  if (isLoading) return <div className="text-center text-white"><Loading/></div>;
  if (isError) return <div className="text-center text-red-500">Error fetching data</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-12 text-center">Anime Collections by Genre</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {genres?.map((genre) => (
          <CollectionCard key={genre?.id} {...genre} />
        ))}
      </div>
    </div>
  );
}

export default function CollectionPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <CollectionPageContent />
    </QueryClientProvider>
  );
}
