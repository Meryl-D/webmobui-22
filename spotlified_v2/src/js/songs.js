import * as api from './api.js';
/**
 * --------------------------------------------
 * Affiche les chansons des artistes avec l'API
 * --------------------------------------------
 */
export function showSongsSection() {
  document.querySelector('.songs').classList.add('active');
}

const artistSongsList = document.querySelector(`.songs .list`);
const artistSongItemTemplate = document.querySelector('#songs-item-template')

function displayArtistsSong(song) {
  const newSong = artistSongItemTemplate.content.cloneNode(true); // true pour cloner également les enfants du node
  const titleNode = newSong.querySelector('.list-item-title');
  titleNode.innerText = song.title;
  titleNode.dataset.songId = song.id;
  artistSongsList.append(newSong);
}

export async function displayAllArtistsSongs(id) {
  const songs = await api.fetchArtistsSongs(id);
  document.querySelector('.songs h4 span').textContent = ` > ${songs[0].artist.name}`;
  artistSongsList.replaceChildren(); // Remplace les enfants par rien, donc supprime tous les enfants
  for (const song of songs) {
    displayArtistsSong(song);
  }
}
