import {notFound} from "next/navigation"

export async function generateMetadata({params}){
  try{
    const res = await fetch(`https://api.jikan.moe/v4/anime/${params.animeId}`,{
      cache: "force-cache",
    })
    const data = await res.json()
    
    return{
      title: `Animadom | ${data.data.title}`,
      description: data.data.synopsis,
      openGraph: {
        title: `Animadom | ${data.data.title}`,
        description: data.data.synopsis,
        images: [{
          url: data.data.images.jpg.large_image_url,
          width: 800,
          height: 600,
          alt: data.data.title,
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Animadom | ${data.data.title}`,
        description: data.data.synopsis,
        images: [data.data.images.jpg.large_image_url],
      },
      other: {
        'og:type': 'website',
        'og:site_name': 'Animadom',
        'og:rating': data.data.rating,
        'og:genre': data.data.genres?.map(genre => genre.name).join(', '),
      }
    }    
  }catch(error){
    notFound();
    return ({title:"Animadom | Not Found"})
  }
}

const layout = ({children}) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default layout
