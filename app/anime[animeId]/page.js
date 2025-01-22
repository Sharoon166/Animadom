if (data.Media) {
  setCoverImage(data.Media.bannerImage || "");
  setPosterImage(data.Media.coverImage.extraLarge || data.Media.coverImage.large || "");
  setAnimeImages(data.Media.images?.edges?.map(edge => edge.node) || []);
  // ... rest of your existing state updates
}
