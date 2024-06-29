"use client"
import React, { useEffect, useState } from 'react'
import AnimeCard from '@/components/Trending'

const page = ({params}) => {
    const[seasons,setSeasons]=useState([])
    useEffect(()=>{
        fetch(`https://api.jikan.moe/v4/seasons/${params.year}/${params.season}`).then(res=>res.json()).then(data=>{
            setSeasons(data.data)
            console.log(data.data)
        })
    }
    ,[])
  return (
    <div>
           <div className="">
        <h1 className="text-4xl font-bold text-white m-8"> Anime Aired in {params.season} of {params.year}</h1>
        <div className="flex flex-wrap justify-center items-center">
          {seasons?.map((anime) => (
            <div key={anime.mal_id} className="m-4">
              <AnimeCard
                mal_id={anime.mal_id}
                name={anime.title}
                imageUrl={anime.images.jpg.image_url}
                year={anime.year}
                genre={anime.genres.name}
               
              />
            </div>
          ))}
        </div>
        </div>
    </div>
  )
}

export default page