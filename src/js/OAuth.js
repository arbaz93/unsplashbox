import axios from "axios";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY
const SECRET_KEY = import.meta.env.VITE_UNSPLASH_SECRET_KEY

export async function fetchAccessToken(code, redirectUri) {
    const clientId = API_KEY;
    const SECRET = SECRET_KEY;

    const response = await axios.post('https://unsplash.com/oauth/token', {
        client_id: clientId,
        client_secret: SECRET,
        redirect_uri: redirectUri,
        code: code,
        grant_type: 'authorization_code',
    });
    return response;

}

export function redirectToAuth(imageId, redirectUri) {
    const clientId = API_KEY;
    const redirect_uri = redirectUri; // Keep it static, e.g., 'http://localhost:5173/image'
    const scope = 'write_collections'; // The scope of the authorization
    
    // const scope = 'public+read_user+write_collections'; // The scope of the authorization

    // Pass the imageId as part of the state or query parameter
    const authUrl = `https://unsplash.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${imageId ? encodeURIComponent(imageId) : '/'} `;

    window.location.href = authUrl; // Redirect the user to the OAuth URL
}
