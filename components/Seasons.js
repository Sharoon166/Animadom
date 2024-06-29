import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Now = () => {
  const [seasonsData, setSeasonsData] = useState([]);

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/seasons')
      .then(res => res.json())
      .then(data => {
        setSeasonsData(data.data);
        console.log(data.data); 
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Anime Seasons</h1>
      {seasonsData.map(season => (
        <div key={season.year} className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">{season.year}</h2>
          <div className="flex flex-wrap justify-center items-center">
            {season.seasons.map((name, index) => (
              <div key={index} className="m-4">
                <Seasons year={season.year} name={name} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Seasons = ({ year, name }) => {
  return (
    <Link href={`/seasons/${year}/${name}`}
       className="block bg-gray-800 hover:bg-gray-700 rounded-lg px-4 py-2 transition duration-300 ease-in-out text-white text-xl font-bold shadow-md hover:shadow-lg">
        {name}
      
    </Link>
  );
};

export default Now;
