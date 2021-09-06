const API_KEY = '22469599-b799b36696d1999c47d80d468';
const BASE_URL = 'https://pixabay.com/api';

async function fetchImages(searchImages, page = 1) {
    
    const response = await fetch(`${BASE_URL}/?q=${searchImages}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    const data = await response.json();

    return data;
}

const imagesApi = {
    fetchImages,
};

export { imagesApi };

