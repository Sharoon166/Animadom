"use client"
import Card from "@/components/Trending";
const page = async () => {
 let res = await fetch("https://api.jikan.moe/v4/manga/")
 let data = await res.json()
 console.log(data.data)
  return (
    <>
    <div className="flex flex-wrap justify-center gap-5 items-center">

   {
     data.data.map((item) => {
       return (
         <Card
         key={item.mal_id}
         mal_id={item.mal_id}
         name={item.title}
         imageUrl={item.images.jpg.image_url}
         
         />
        )
      })
    }
    </div>
    </>
  )
}

export default page