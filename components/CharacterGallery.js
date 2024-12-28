const CharacterGallery = async ({ characterId }) => {
  const res = await fetch(
    `https://api.jikan.moe/v4/characters/${characterId}/pictures`
  );

  const data = await res.json();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.data?.map((picture) => {
          const {
            jpg: { image_url },
          } = picture;
          return (
            <div key={image_url} className="aspect-square overflow-hidden rounded-lg  transition-transform duration-300">
              <img 
                src={image_url} 
                alt="character" 
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterGallery;
