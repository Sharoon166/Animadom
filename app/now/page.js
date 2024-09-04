"use client"
import React, { useEffect, useState } from 'react'
import AnimeCard from '@/components/Trending'
import Loading from '@/loading'

const now = () => {
  const [anime, setAnime] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      fetchAnime(currentPage)
  }, [currentPage])

  const fetchAnime = (page) => {
      setIsLoading(true)
      fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}`)
          .then(res => res.json())
          .then((data) => {
              setAnime(data.data)
              setTotalPages(data.pagination.last_visible_page)
              console.log(data.data)
              setIsLoading(false)
          })
  }

  const handlePrevPage = () => {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1)
          window.scrollTo(0, 0)
      }
  }

  const handleNextPage = () => {
      if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1)
          window.scrollTo(0, 0)
      }
  }

  if (isLoading) {
      return <Loading />
  }

  return (
      <div>
          <div className="">
              <h1 className="text-4xl font-bold text-white m-8"> Anime Airing Right Now</h1>
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
              <div className="flex justify-center mt-4">
                  <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition duration-200 ease-in-out ml-2"
                  >
                      Previous
                  </button>
                  <span className="mx-4 text-white">
                      Page {currentPage} of {totalPages}
                  </span>
                  <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition duration-200 ease-in-out ml-2"
                  >
                      Next
                  </button>
              </div>
          </div>
      </div>
  )
}

export default now