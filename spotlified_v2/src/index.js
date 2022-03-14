import './css/index.css'
import {displayAllArtists} from './js/artists.js';
import {showSongsSection, displayAllArtistsSongs} from './js/songs.js';

function toggleSection(sectionId) {
  // Supprime/Ajoute la classe active sur la section
  document.querySelector('section.active')?.classList.remove('active');
  document.querySelector(sectionId)?.classList.add('active');
}

function toggleNav(sectionId) {
  // Supprime/Ajoute la classe active sur le lien
  document.querySelector('nav a.active')?.classList.remove('active');
  document.querySelector(`nav a[href="${sectionId}"]`)?.classList.add('active');
}

/**
 * ------------------------------------------------
 * Affichage des différentes sections avec les hash
 * ------------------------------------------------
 */
if(!window.location.hash) window.location.hash = 'home';

// Affichage d'une section
const displaySection = () => {
  // Comme nos hash et nos ids de section sont les mêmes, hash = sectionid
  const sectionId = window.location.hash;

  const splitHash = window.location.hash.split('-');

  // si le premier élément est artiste, on est dans la gestion des artistes…
  switch (splitHash[0]) {
    case '#artists':
      // est-ce que le deuxième élément retourne quelque chose ? Et donc n’est pas undefined ? Oui?
      // Alors il y a un id et on affiche cet artiste
      if (splitHash[1]) {
        displayAllArtistsSongs(splitHash[1]);
        showSongsSection();
      } else {
        displayAllArtists();
      }
      break;
    case '#player':

    break;
  }

  toggleSection(sectionId);
  toggleNav(sectionId);
}

window.addEventListener('hashchange', displaySection);

document.addEventListener('click', evt => {
  console.log(evt.target.classList[1])
  // console.log(document.querySelector('.songs .list-item-title').dataset.songId)
})

// Affichage au chargement
displaySection();