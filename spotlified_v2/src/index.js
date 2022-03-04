import './css/index.css'

/* VERSION TEMPORAIRE */
/*
  Le code que nous allons faire sera clairement différent, il s'agit juste d'un micro exemple pour vous permettre
  de tester les liens.
*/

// const links = document.querySelectorAll('nav a')

// links.forEach((link) => {
//   link.addEventListener('click', (e) => {
//     document.querySelector('nav a.active').classList.remove('active')
//     link.classList.add('active')

//     document.querySelectorAll('section').forEach((section) => section.id == link.href.split('#')[1] ? section.classList.add('active') : section.classList.remove('active'))
//   })
// })

// Affichage d'une section
const displaySection = () => {
  // Comme nos hash et nos ids de section sont les mêmes, hash = sectionid
  const sectionId = window.location.hash

  // Supprime/Ajoute la classe active sur la section
  document.querySelector('section.active')?.classList.remove('active') // ? = optional chaining > continue la chaine si non null.
  document.querySelector(sectionId)?.classList.add('active')

  // Supprime/Ajoute la classe active sur le lien
  document.querySelector('nav a.active')?.classList.remove('active')
  document.querySelector(`nav a[href="${sectionId}"]`)?.classList.add('active')
}

window.addEventListener('hashchange', displaySection)

// Affichage au chargement
displaySection()
