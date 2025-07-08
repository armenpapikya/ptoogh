export const getImageUrl = async (filename) => {
  try {
    const response = await fetch(`http://localhost:5000/api/image-url/${filename}`);
    if (!response.ok) {
      throw new Error('Failed to fetch image URL');
    }
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return null;
  }
};

export const getImageUrlById = (id) => {
  return `http://localhost:5000/api/image-blob/${id}`;
};

export const getImageUrlByFilename = (filename) => {
  return `http://localhost:5000/api/image-blob-by-filename/${filename}`;
}; 