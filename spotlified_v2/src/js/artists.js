import * as api from './api.js';
/**
 * -------------------------------------
 * Affiche les artistes fetch avec l'API
 * -------------------------------------
 */
const artistList = document.querySelector('.artist-list')
const artistListItemTemplate = document.querySelector('#artist-list-item-template')

function displayArtist(artist) {
  const newArtist = artistListItemTemplate.content.cloneNode(true); // true pour cloner également les enfants du node
  newArtist.querySelector('a').href = '#artists-' + artist.id;
  newArtist.querySelector('img').src = artist.image_url;
  newArtist.querySelector('.artist-list-item-title').innerText = artist.name;
  artistList.append(newArtist)
}

export async function displayAllArtists() {
  const artists = await api.fetchArtists();
  artistList.replaceChildren(); // Remplace les enfants par rien, donc supprime tous les enfants
  for (const artist of artists) {
    displayArtist(artist);
  }
}