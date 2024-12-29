import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Now = () => {
  const [seasonsData, setSeasonsData] = useState([])
  const [selectedYear, setSelectedYear] = useState(null)

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/seasons')
      .then(res => res.json())
      .then(data => {
        setSeasonsData(data.data)
        setSelectedYear(data.data[0]?.year)
      })
  }, [])

  const seasonInfo = {
    winter: "Jan-Mar • Cold days, warm tea & anime",
    spring: "Apr-Jun • Cherry blossoms & new shows",
    summer: "Jul-Sep • Hot season, cold drinks & series",
    fall: "Oct-Dec • Autumn leaves & premieres"
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-center mb-12 text-gradient"
      >
        Anime Seasons
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {seasonsData.map(season => (
          <button
            key={season.year}
            onClick={() => setSelectedYear(season.year)}
            className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300
              hover:shadow-lg hover:shadow-yellow-500/20 whitespace-nowrap
              ${selectedYear === season.year 
                ? 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-zinc-900'
                : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700'}`}
          >
            {season.year}
          </button>
        ))}
      </div>

      {seasonsData.map(season => (
        season.year === selectedYear && (
          <motion.div
            key={season.year}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {season.seasons.map((name, index) => (
              <SeasonCard 
                key={index}
                year={season.year}
                name={name}
                info={seasonInfo[name]}
              />
            ))}
          </motion.div>
        )
      ))}
    </div>
  )
}

const SeasonCard = ({ year, name, info }) => {
  return (
    <Link href={`/seasons/${year}/${name}`}>
      <div className="bg-zinc-800/50 rounded-xl p-6 h-full border border-zinc-700/50 
        transition-all duration-300 hover:bg-zinc-700/50 hover:border-yellow-500/50 
        hover:shadow-lg hover:shadow-yellow-500/20">
        <div className="flex flex-col h-full">
          <span className="text-2xl font-bold capitalize mb-4 text-transparent bg-clip-text 
            bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500">
            {name}
          </span>
          <div className="flex flex-col flex-grow">
            <span className="text-zinc-300 text-lg mb-2">{year}</span>
            <p className="text-zinc-400 text-sm">{info}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Now
