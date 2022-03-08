import './css/index.css'
import { displayAllArtists } from './js/artists.js';

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
window.location.hash = 'home';

// Affichage d'une section
const displaySection = () => {
  // Comme nos hash et nos ids de section sont les mêmes, hash = sectionid
  const sectionId = window.location.hash;

  toggleSection(sectionId);
  toggleNav(sectionId);

  const splitHash = window.location.hash.split('-');
  console.log(splitHash);

  // si le premier élément est artiste, on est dans la gestion des artistes…
  switch (splitHash[0]) {
    case '#artists':
      // est-ce que le deuxième élément retourne quelque chose ? Et donc n’est pas undefined ? Oui?
      // Alors il y a un id et on affiche cet artiste
      if (splitHash[1]) {
        displayArtistsSong(splitHash[1])
      } else {
        displayAllArtists();
      }
      break;
    case '#player':

      break;
  }
}

window.addEventListener('hashchange', displaySection)

// Affichage au chargement
displaySection()