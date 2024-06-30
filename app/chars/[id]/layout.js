import {notFound} from "next/navigation"
export async function generateMetadata({params}){
  try{

    const res = await fetch(`https://api.jikan.moe/v4/characters/${params.id}`,{
      cache: "force-cache",
    })
    const data = await res.json()
    return{
        title: `Animadom | ${data.data.name}  `,
        decription: data.data.synopsis
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