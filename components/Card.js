import React from "react";
import Link from "next/link"; // Import Link from next/link

const Card = ({ id, name, rating, imageUrl }) => {
  const handleClick = () => {
    // Handle click logic here if needed
  };

  return (
    <div className="relative rounded-lg overflow-hidden h-96 w-80 shadow-lg cursor-pointer">
      <Link href={`/anime/${id}`} passHref>
        
          <img
            src={imageUrl}
            alt={`${name} image`}
            className="object-cover object-top h-full w-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-white text-xl">{name}</h2>
              <p className="text-yellow-300 text-lg">Rating: {rating}</p>
            </div>
          </div>
       
      </Link>
    </div>
  );
};

export default Card;
