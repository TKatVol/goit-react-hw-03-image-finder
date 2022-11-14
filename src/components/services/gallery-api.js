const API_KEY = '22469599-b799b36696d1999c47d80d468';
const BASE_URL = 'https://pixabay.com/api';

export const galleryApiService = async (query, page) => {
    const response = await fetch(`${BASE_URL}/?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`);
     
    return await response.json();
};
