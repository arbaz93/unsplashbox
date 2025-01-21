import axios from "axios";

const BASE_URL = 'https://api.unsplash.com';
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY

export async function fetchCollectionsFromAPI(collectionId, page = 1) {
    const { data } = await axios.get(`${BASE_URL}/collections/${collectionId}/photos/?client_id=${API_KEY}`)
    
    return data
}