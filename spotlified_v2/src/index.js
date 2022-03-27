import './css/index.css'
import { displayAllArtists } from './js/section/artists.js';
import { displayFavSection, displaySongsSection, displaySearchSongsSection } from './js/section/songs.js';

import './js/section/player.js';
import './js/section/search.js';

function toggleSection(section) {
  // Supprime/Ajoute la classe active sur la section
  document.querySelector('section.active')?.classList.remove('active');
  document.querySelector(section)?.classList.add('active');
}

function toggleNav(section) {
  // Supprime/Ajoute la classe active sur le lien
  document.querySelector('nav a.active')?.classList.remove('active');
  document.querySelector(`nav a[href="${section}"]`)?.classList.add('active');
}

/**
 * ------------------------------------------------
 * Affichage des différentes sections avec les hash
 * ------------------------------------------------
 */

// Affichage d'une section
const displaySection = () => {
  // Comme nos hash et nos ids de section sont les mêmes, hash = section
  const section = window.location.hash || '#home'
  const splitHash = section.split('-');

  toggleSection(splitHash[0]);
  toggleNav(splitHash[0]);

  // si le premier élément est artiste, on est dans la gestion des artistes…
  switch (splitHash[0]) {
    case '#artists':
      // est-ce que le deuxième élément retourne quelque chose ? Et donc n’est pas undefined ? Oui?
      // Alors il y a un id et on affiche cet artiste
      if (splitHash[1]) {
        toggleSection('#songs');
        displaySongsSection(splitHash[1]);
      } else {
        displayAllArtists();
      }
    break;
    case '#search':
      // On réutilise la section 'songs' en arrière plan
      toggleSection('#songs');
      // on décode la chaine de recherche pour l'afficher proprement
      displaySearchSongsSection(decodeURIComponent(splitHash[1]));
    break;
    case '#favorites':
      toggleSection('#songs');
      displayFavSection();
    break;

  }
}

window.addEventListener('hashchange', displaySection);

// Affichage au chargement
displaySection();

// Ici, on écoute la mise à jour des favoris dans le storage. Lorsque la liste à changé et que l'on est dans la section
// favoris, on remet à jour la liste pour enlever les éléments déselectionnés
window.addEventListener('favorites_updated', () => {
  if(window.location.hash == '#favorites')
    displayFavSection();
})

// On enregistre le worker pour s'occuper de la mise en cache
navigator.serviceWorker.register('/workerCacheFetched.js');