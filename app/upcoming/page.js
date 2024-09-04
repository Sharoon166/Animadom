"use client"
import React, { useEffect, useState } from 'react'
import AnimeCard from '@/components/Trending'

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

      const renderPaginationButtons = () => {
        const buttons = []
        const maxVisibleButtons = 5
        let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2))
        let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1)

        if (endPage - startPage + 1 < maxVisibleButtons) {
          startPage = Math.max(1, endPage - maxVisibleButtons + 1)
        }

        buttons.push(
          <button
            key="prev"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className="ml-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg"
            disabled={currentPage === 1}
          >
            Prev
          </button>
        )

        if (startPage > 1) {
          buttons.push(
            <button key="first" onClick={() => handlePageChange(1)} className="ml-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
              1
            </button>
          )
          if (startPage > 2) {
            buttons.push(<span key="ellipsis1" className="mx-2">...</span>)
          }
        }

        for (let i = startPage; i <= endPage; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`ml-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg ${
                currentPage === i ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentPage === i}
            >
              {i}
            </button>
          )
        }

        if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
            buttons.push(<span key="ellipsis2" className="mx-2">...</span>)
          }
          buttons.push(
            <button key="last" onClick={() => handlePageChange(totalPages)} className="ml-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg">
              {totalPages}
            </button>
          )
        }

        buttons.push(
          <button
            key="next"
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            className="ml-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transform hover:scale-105 transition duration-300 ease-in-out shadow-lg"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        )

        return buttons
      }

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
                  <div className="flex justify-center mt-8 mb-8">
                      {renderPaginationButtons()}
                  </div>
              </div>
          </div>
      )
}

export default Upcoming