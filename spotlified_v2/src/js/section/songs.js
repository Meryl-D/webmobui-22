import * as api from './api.js';
import { playSong } from './player.js';
import { getFavorites, isInFavorite, toggleFavorite } from './favorites.js';

const songsSection = document.querySelector('#songs');
const songSectionTitle = songsSection.querySelector(`h4`);
const artistSongsList = songsSection.querySelector(`.list`);
const artistSongItemTemplate = songsSection.querySelector(`#songs-item-template`);

function toggleFavoriteIcon(favoriteIcon, song) {
  if(isInFavorite(song)) {
    favoriteIcon.innerText = 'favorite'
  } else {
    favoriteIcon.innerText = 'favorite_border'
  }
}

function renderSong(song, songs) {
  const newSong = artistSongItemTemplate.content.cloneNode(true); // true pour cloner également les enfants du node
  const favButton = newSong.querySelector('.fav-button');
  newSong.querySelector('.list-item-title').innerText = song.title;

  // redirige sur le player si le bouton play est pressé
  newSong.querySelector('.play-song').addEventListener('click', () => {
    playSong(song, songs);
    window.location.hash = '#player';
  });

  // toggle la chanson aux favoris si le bouton favoris est pressé
  favButton.addEventListener('click', evt => {
    toggleFavorite(song)
    toggleFavoriteIcon(evt.target, song) // on passe le target du click, à savoir l'icône
  });

  // A l'insertion, on met à jour l'icone, si la chanson est présente dans les favoris
  toggleFavoriteIcon(favButton, song)

  artistSongsList.append(newSong);
}

async function renderAllSongs(songs) {
  artistSongsList.replaceChildren(); // Remplace les enfants par rien, donc supprime tous les enfants
  // On regarde s'il y a des résultats, dans le cas échéant, on affiche un élément simple avec le texte "Aucun résultat"
  if (songs.length) {
    // On itère sur chaque élément
    for (const song of songs) {
      renderSong(song, songs);
    }
  }
  else {
    const noResults = artistSongItemTemplate.content.cloneNode(true) // true pour cloner également les enfants du node
    noResults.querySelector('.list-item-title').innerText = 'Aucun résultat';
    noResults.querySelector('.list-item-actions').remove(); // on supprime les boutons
    artistSongsList.append(noResults);
  }
}

export async function displaySongsSection(id) {
  const songs = await api.fetchArtistsSongs(id);
  songSectionTitle.textContent = `Artiste > ${songs[0].artist.name}`;
  renderAllSongs(songs);
}

// Charge la section des chansons selon l'id de l'artiste
export async function displaySearchSongsSection(query) {
  const songs = await api.searchSongs(query);
  songSectionTitle.innerText = `Résultats de recherche pour "${query}"`;
  renderAllSongs(songs);
}

// Charge la section des chansons selon le tableau de favoris
export function displayFavSection() {
  const songs = getFavorites();
  renderAllSongs(songs)
}
