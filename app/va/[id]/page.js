"use client";

import { useEffect, useState } from "react";
import Card from "@/components/VAcard";

const page = ({ params }) => {
  const [va, setVa] = useState([]);
  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/characters/${params.id}/voices`)
      .then((res) => res.json())
      .then((data) => setVa(data.data));
      
  }, []);
  return (
    <div >
      <h1 className="text-4xl font-bold text-white m-8">Voice Actors</h1>
      <div className="flex flex-wrap gap-5 justify-center items-center">
        {va.map((v) => (
          <>
          {console.log(v.person.mal_id)}
          <Card
          key={v.person.mal_id}
          mal_id={v.person.mal_id}
          name={v.person.name}
          imageUrl={v.person.images.jpg.image_url}
          year={v.language}
          />
          </>
        ))}
      </div>
    </div>
  );
};

export default page;
