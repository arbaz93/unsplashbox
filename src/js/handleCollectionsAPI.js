import axios from "axios";

const BASE_URL = 'https://api.unsplash.com';
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY

export async function fetchCollections(collectionId) {
    
    const { data } = await axios.get(`${BASE_URL}/collections/${collectionId}/photos/?client_id=${API_KEY}`)
    
    return data
}

export async function getUserCollections(username) {
    
    const { data } = await axios.get(`${BASE_URL}/users/${username}/collections/?client_id=${API_KEY}`)
    
    return data
}

export async function createCollection() {
    const options = {
        title: 'New Collection fax',
        description: 'A new collection',
        private: false
    }
    const { data } = await axios.post(`${BASE_URL}/collections`, options)
    
    return data
}