"use client"
import React, { useEffect, useState } from 'react'
import AnimeCard from '@/components/Trending'
import Loading from '@/loading'
import { motion, AnimatePresence } from "framer-motion"
import Pagination from '@/components/Pagination'
import { useLanguage } from '@/components/useLanguage'

const now = () => {
      const [anime, setAnime] = useState([])
      const [currentPage, setCurrentPage] = useState(1)
      const [totalPages, setTotalPages] = useState(0)
      const [isLoading, setIsLoading] = useState(true)
      const animesPerPage = 20

      useEffect(() => {
          fetchAnime(currentPage)
      }, [currentPage])

      const fetchAnime = (page) => {
          setIsLoading(true)
          fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}&limit=${animesPerPage}`)
              .then(res => res.json())
              .then((data) => {
                  setAnime(data.data)
                  setTotalPages(Math.ceil(data.pagination?.items.total / animesPerPage))
                  console.log(data.data)
                  setIsLoading(false)
              })
      }

      const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }

      if (isLoading) {
          return <Loading />
      }
      const { useJapanese } = useLanguage()
      return (
          <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10"> 
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white m-4 mx-auto">Anime Airing Right Now</h1>
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 sm:gap-2 mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatePresence>
                  {anime?.map((anime) => (
                    <motion.div
                      key={anime.mal_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <AnimeCard
                          mal_id={anime.mal_id}
                          name={useJapanese ? anime.title : (anime.title_english || anime.title)}
                          imageUrl={anime.images.jpg.image_url}
                          year={new Date(anime.aired.from).getFullYear()}
                          genre={anime.genres[0]?.name || 'N/A'}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
          </div>
      )
}

export default now