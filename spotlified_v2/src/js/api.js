export async function fetchArtists() {
    const response = await fetch('https://webmob-ui-22-spotlified.herokuapp.com/api/artists')
    const artists = await response.json()
    return artists;
}

export async function fetchArtistsSongs(id) {
    const response = await fetch(`https://webmob-ui-22-spotlified.herokuapp.com/api/artists/${id}/songs`)
    const songs = await response.json()
    const stringifiedSongs = JSON.stringify(songs)
    window.localStorage.setItem('songList', stringifiedSongs)
    return songs;
}