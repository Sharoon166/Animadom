import React from "react";
import Link from "next/link";
import './trending.css';

const AnimeCard = ({ mal_id, name, imageUrl, year, genre }) => {
  return (
    <div className="anime-card">
      <div className="card-container">
        <img 
          src={imageUrl} 
          alt={name}
          className="card-image"
        />
        
        <div className="overlay" />
        
        <div className="card-content">
          <div className="tags">
            <Link href={`/seasons/${year}/winter`}>
              <span className="tag">{year}</span>
            </Link>
            <Link href={`/collection/${genre}`}>
              <span className="tag">{genre}</span>
            </Link>
          </div>
          
          <h2 className="title">{name}</h2>
          
          <div className="button-container">
            <Link href={`/anime/${mal_id}`}>
              <button className="more-button">More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
