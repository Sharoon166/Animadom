const CharacterGallery = async ({ characterId }) => {
    const res = await fetch(
      `https://api.jikan.moe/v4/characters/${characterId}/pictures`
    );
  
    const data = await res.json();
  
    return (
      <div>  
        <div className="flex justify-center items-center flex-wrap  gap-10 mb-20">
          {data?.data.map((picture) => {
            const {
              jpg: { image_url },
            } = picture;
            return <img key={image_url} src={image_url} alt="character" className="w-64 rounded-lg" />;
          })}
        </div>
      </div>
    );
  };
  
  export default CharacterGallery;