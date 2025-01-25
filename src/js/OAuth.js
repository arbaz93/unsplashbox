import axios from "axios";
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY
const SECRET_KEY = import.meta.env.VITE_UNSPLASH_API_KEY
const REDIRECT_URI = import.meta.env.VITE_UNSPLASH_REDIRECT_URI

export async function fetchAccessToken(code) {
    const clientId = API_KEY;
    const SECRET = SECRET_KEY;
    const redirectUri = REDIRECT_URI;

    try {
        const response = await axios.post('https://unsplash.com/oauth/token', {
            client_id: clientId,
            client_secret: SECRET,
            redirect_uri: redirectUri,
            code: code,
            grant_type: 'authorization_code',
        });
        console.log('Access Token:', response.data.access_token);
    } catch (error) {
        console.error('Error fetching access token:', error.response?.data || error.message);
    }
}
export function redirectToAuth( imageId ) {
    const clientId = API_KEY;
    const redirectUri = REDIRECT_URI + imageId;
    const scope = 'write_collections';
    const authUrl = `https://unsplash.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
    
    window.location.href = authUrl; // Redirect the user to the OAuth URL
  }