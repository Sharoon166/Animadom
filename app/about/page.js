import React from 'react'
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'

const about = () => {
  return (
    <>
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h2 className="text-3xl font-bold mb-4">About</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img src="itachi.jpg" alt="Anime" className="rounded-lg shadow-lg mb-4  aspect-square md:mr-8 md:mb-0 object-center object-cover md:w-1/2" />
        <div className="md:w-1/2">
          <p className="text-lg leading-relaxed mb-4">
            Welcome to our anime website! We are passionate about bringing you the latest and greatest in anime news, reviews, and recommendations.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Our mission is to create a community where anime enthusiasts can come together to discuss their favorite shows, discover new series, and connect with others who share their interests.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Whether you're new to anime or a seasoned otaku, we have something for everyone. Explore our site to find information on popular series, upcoming releases, and exclusive interviews with industry professionals.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Join us on this anime journey and let's celebrate the vibrant world of Japanese animation together!
          </p>
          <Link href="/" className="text-yellow-500 flex justify-center items-center w-1/5  gap-2 text-2xl px-4 py-2 border-yellow-600 border rounded-lg hover:bg-yellow-600 hover:text-[#121212]  font-mono transition-colors duration-150">
           <FaHome className="inline-block"/> Home
        </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default about