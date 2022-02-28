import './css/index.css'

const searchSubmit = document.querySelector('.search-submit');
console.log(searchSubmit);
const searchBox = document.querySelector('.search-box');

searchSubmit.addEventListener('click', evt => {
    searchBox.classList.toggle('toggle-search');
});