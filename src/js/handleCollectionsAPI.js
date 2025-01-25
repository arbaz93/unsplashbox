import axios from "axios";

const BASE_URL = 'https://api.unsplash.com';
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY

export async function fetchCollections(collectionId) {
    
    // const { data } = await axios.get(`${BASE_URL}/collections/${collectionId}/photos/?client_id=${API_KEY}`)
    const { data } = await axios.get(`${BASE_URL}/collections/DK7tJb2dP6Q/related?client_id=${API_KEY}`)
    
    return data
}

export async function createCollection() {
    const options = {
        title: 'New Collection',
        description: 'A new collection',
        private: false
    }
    const { data } = await axios.post(`${BASE_URL}/collections`, options)
    
    return data
}