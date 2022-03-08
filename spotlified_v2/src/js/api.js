export async function fetchArtists() {
    const response = await fetch('https://webmob-ui-22-spotlified.herokuapp.com/api/artists');
    const artists = await response.json();
    return artists;
    }