"use client"
import React, { useEffect, useState } from 'react'
import AnimeCard from '@/components/Trending'
import { useLanguage } from '@/components/useLanguage'
import Pagination from '@/components/Pagination'

const page = ({params}) => {
  const[seasons,setSeasons]=useState([])
  const[currentPage, setCurrentPage] = useState(1)
  const[totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 20

  useEffect(()=>{
      fetchSeasons(currentPage)
  }
  ,[currentPage])

  const fetchSeasons = (page) => {
      fetch(`https://api.jikan.moe/v4/seasons/${params.year}/${params.season}?page=${page}&limit=${itemsPerPage}`)
          .then(res=>res.json())
          .then(data=>{
              setSeasons(data.data)
              setTotalPages(Math.ceil(data.pagination.items.total / itemsPerPage))
              console.log(data.data)
          })
  }

  const handlePageChange = (newPage) => {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const {useJapanese}=useLanguage()
  return (
    <div>
      <div className="">
        <h1 className="text-4xl font-bold text-white m-8"> Anime Aired in {params.season} of {params.year}</h1>
        <div className="flex flex-wrap justify-center items-center">
          {seasons?.map((anime) => (
            <div key={anime.mal_id} className="m-4">
              <AnimeCard
                mal_id={anime.mal_id}
                name={useJapanese ? anime.title : (anime.title_english || anime.title)}
                imageUrl={anime.images.jpg.image_url}
                year={anime.year}
                genre={anime.genres.name}
              />
            </div>
          ))}
        </div>
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default page
