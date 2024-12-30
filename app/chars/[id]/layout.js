import {notFound} from "next/navigation"

export async function generateMetadata({params}){
  try{
    const res = await fetch(`https://api.jikan.moe/v4/characters/${params.id}`,{
      cache: "force-cache",
    })
    const data = await res.json()
    
    return{
      title: `Animadom | ${data.data.name}`,
      description: data.data.about,
      openGraph: {
        title: `Animadom | ${data.data.name}`,
        description: data.data.about,
        images: [{
          url: data.data.images.jpg.image_url,
          width: 800,
          height: 600,
          alt: data.data.name,
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Animadom | ${data.data.name}`,
        description: data.data.about,
        images: [data.data.images.jpg.image_url],
      },
      other: {
        'og:type': 'website',
        'og:site_name': 'Animadom',
        'og:nicknames': data.data.nicknames?.join(', '),
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
