import axios from "axios";
    
const BASE_URL = 'https://api.unsplash.com';
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY

export async function fetchSearchImagesFromAPI(url, page = 1) {
    const { data } = await axios.get(`${BASE_URL}/${url}&client_id=${API_KEY}&per_page=10&page=${page}`)
    
    return data
}
export async function fetchImageFromAPI(imageId) {
    const { data } = await axios.get(`${BASE_URL}/photos/${imageId}?client_id=${API_KEY}`)
    
    return data
}
export async function fetchRandomImagesfromAPI(query = undefined, count = 4 ) {
    const options = {
        params: {
            query: query, // Only use if fetching from topic IDs
            count: count,
            client_id: API_KEY
        }
    }
    const response = await axios.get(`${BASE_URL}/photos/random`, options);
    return response;
}