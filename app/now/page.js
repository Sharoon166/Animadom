"use client"
import React, { useEffect, useState } from 'react'
import AnimeCard from '@/components/Trending'
import Loading from '@/loading'
import { motion, AnimatePresence } from "framer-motion"
import Pagination from '@/components/Pagination'

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
                setTotalPages(Math.ceil(data.pagination.items.total / animesPerPage))
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

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-white m-8">Anime Airing Right Now</h1>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 justify-items-center p-3 pb-5"
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
                  >
                    <AnimeCard
                      mal_id={anime.mal_id}
                      name={anime.title}
                      imageUrl={anime.images.jpg.image_url}
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