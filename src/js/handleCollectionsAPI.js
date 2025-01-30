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
export async function addToCollection(collectionId, photoId, accessToken) {
    try {
        const response = await fetch(`https://api.unsplash.com/collections/${collectionId}/add`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ photo_id: photoId }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to add image to collection");
        }
    
        const data = await response.json();
        console.log("Image added to collection:", data);
      } catch (error) {
        console.error("Error:", error);
      }
}
export async function removefromCollection(collectionId, photoId, accessToken) {
    try {
        const response = await fetch(`https://api.unsplash.com/collections/${collectionId}/remove`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ photo_id: photoId }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to remove image from collection");
        }
    
        const data = await response.json();
        console.log("Image removed from collection:", data);
      } catch (error) {
        console.error("Error:", error);
      }
}