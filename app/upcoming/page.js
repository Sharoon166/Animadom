"use client"
import React, { useEffect, useState } from 'react'
import AnimeCard from '@/components/Trending'

const Upcoming = () => {
    const [anime, setAnime] =useState([])
    useEffect(()=>
    {
        fetch('https://api.jikan.moe/v4/seasons/upcoming')
       .then(res=>res.json()).then((data)=>{setAnime(data.data)
        console.log(data.data)
       })
    },[]) 

  return (
    <div>
        <div className="">
        <h1 className="text-4xl font-bold text-white m-8">Upcoming Anime</h1>
        <div className="flex flex-wrap justify-center items-center">
          {anime?.map((anime) => (
            <div key={anime.mal_id} className="m-4">
              <AnimeCard
                mal_id={anime.mal_id}
                name={anime.title}
                imageUrl={anime.images.jpg.image_url}
               
              />
            </div>
          ))}
        </div>
        </div>
    </div>
  )
}

export default Upcoming