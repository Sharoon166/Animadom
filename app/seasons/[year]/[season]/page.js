"use client"
import React, { useEffect, useState } from 'react'
import AnimeCard from '@/components/Trending'
import { useLanguage } from '@/components/useLanguage'

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
      <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition duration-200 ease-in-out ml-2 ${
                      currentPage === page ? 'bg-pink-600' : ''
                  }`}
              >
                  {page}
              </button>
          ))}
      </div>
      </div>
  </div>
)
}

export default page