import axios from "axios";

const BASE_URL = 'https://api.unsplash.com';
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY

// ######################
export async function getUserCollections(username, page = 1) {
  const response = await axios.get(`${BASE_URL}/users/${username}/collections/?client_id=${API_KEY}&page=${page}`)

  return response;
}
export async function fetchFeaturedCollections(page = 1) {
  const response = await axios.get(`${BASE_URL}/collections/?client_id=${API_KEY}&page=${page}`);
  return response;
}
export async function fetchCollectionImages(collectionId, page = 1) {
  ///collections/:id/photos
  const response = await axios.get(`${BASE_URL}/collections/${collectionId}/photos/?client_id=${API_KEY}&per_page=10&page=${page}`);
  return response;
}
export async function addToCollection(collectionId, photoId, accessToken) {
  const response = await axios.post(
    `${BASE_URL}/collections/${collectionId}/add`,
    { photo_id: photoId }, // Axios automatically sets the request body
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}
export async function removefromCollection(collectionId, photoId, accessToken) {

  const response = await axios.delete(`${BASE_URL}/collections/${collectionId}/remove`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: { photo_id: photoId }, // Axios uses 'data' for request body in DELETE
  });

  return response;

}
// ######################


export async function createCollection() {
  const options = {
    title: 'New Collection fax',
    description: 'A new collection',
    private: false
  }
  const { data } = await axios.post(`${BASE_URL}/collections`, options)

  return data
}