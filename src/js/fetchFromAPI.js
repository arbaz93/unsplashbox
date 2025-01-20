import axios from "axios";

const BASE_URL = 'https://api.unsplash.com';
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY

export async function fetchFromAPI(url, page = 1) {
    const { data } = await axios.get(`${BASE_URL}/${url}&client_id=${API_KEY}&per_page=10&page=${page}`)
    
    return data
}