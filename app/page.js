import Collection from "@/components/Collection";
import Carousel from "@/components/Crousal";
import { trending } from "@/constants";
import AnimeCard from "@/components/Trending";
import MoreAnime from "@/components/MoreAnime";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="-m-[5rem] mx-auto  overflow-hidden  relative shadow-[0_20px_80px_#888] pointer-events-none ">
        <video
          src="/main_page.mp4"
          className="object-cover object-center min-h-[75vh] "
          autoPlay
          loop
          muted
        ></video>
      </div>
      <div className="container mx-auto px-10 space-y-32 pb-20  ">
        <Carousel />
        <Collection />
      </div>
      <div className="">
        <h1 className="text-4xl font-bold text-white m-8">Trending Anime</h1>
        <div className="flex flex-wrap justify-center items-center">
          {trending.map((anime) => (
            <div key={anime.id} className="m-4">
              <AnimeCard
                mal_id={anime.id}
                name={anime.name}
                imageUrl={anime.imageUrl}
                year={anime.year}
                genre={anime.genre}
              />
            </div>
          ))}
        </div>
        <Link href="/now" className="flex justify-center items-center text-center  px-2 py-3 rounded-lg bg-slate-500  mx-auto w-20">
          <FaArrowRight className="text-yellow-400 text-2xl transition-all duration-200 " />
          
        </Link>
      </div>
      <div>
        <MoreAnime />
      </div>
    </>
  );
}
