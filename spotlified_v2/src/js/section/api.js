const BASE_URL = 'https://webmob-ui-22-spotlified.herokuapp.com/api';

async function loadJson(url) {
    const response = await fetch(url);
    const parsedJson = await response.json();
    return parsedJson;
}

export async function fetchArtists() {
    return await loadJson(`${BASE_URL}/artists`);
}

export async function fetchArtistsSongs(id) {
    return await loadJson(`${BASE_URL}/artists/${id}/songs`);
}

export async function searchSongs(query) {
    return await loadJson(`${BASE_URL}/songs/search/${encodeURIComponent(query)}`);
}