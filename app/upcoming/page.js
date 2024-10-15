"use client"
import React, { useEffect, useState } from 'react'
import AnimeCard from '@/components/Trending'
import Pagination from '@/components/Pagination'

const Upcoming = () => {
  const [anime, setAnime] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const itemsPerPage = 20

  useEffect(() => {
      fetch(`https://api.jikan.moe/v4/seasons/upcoming?page=${currentPage}&limit=${itemsPerPage}`)
      .then(res => res.json())
      .then((data) => {
          setAnime(data.data)
          setTotalPages(Math.ceil(data.pagination.items.total / itemsPerPage))
          console.log(data.data)
      })
  }, [currentPage])

  const handlePageChange = (page) => {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
      <div>
          <div className="">
              <h1 className="text-4xl font-bold text-white m-8">Upcoming Anime</h1>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 justify-items-center">
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
              <div className="flex justify-center mt-8 mb-8">
                  <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                  />
              </div>
          </div>
      </div>
  )
}

export default Upcoming