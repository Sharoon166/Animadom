"use client";

import { useEffect, useState } from "react";
import Card from "@/components/VAcard";

const page = ({ params }) => {
  const [va, setVa] = useState([]);
  const [char, setChar] = useState([]);
  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/characters/${params.id}/voices`)
      .then((res) => res.json())
      .then((data) => setVa(data.data));
    fetch(`https://api.jikan.moe/v4/characters/${params.id}`)
      .then((res) => res.json())
      .then((data) => setChar(data.data));
  }, []);
 
  return (
    <div>
      <h1 className="text-4xl font-bold text-white m-8">
        Voice Actors of {char.name}
      </h1>
      <div className="flex flex-wrap gap-5 justify-center items-center">
        {va.map((v) => (
          <>
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
