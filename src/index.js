import hitsCards from './templates/card-photos.hbs'
import './css/styles.css'

// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import FetchPixabay from './js/fetchPixabay';  

const searchForm = document.querySelector('#search-form');
const btnSubmit = document.querySelector('button');
const galleryCotainer = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const galleryList = document.querySelector('.gallery-list')
const newsApi = new FetchPixabay();
btnLoadMore.classList.add('is-hidden')
let totalHits = 0;

// document.body.innerHTML = templateFunction();
searchForm.addEventListener('submit', handleSearch);
btnLoadMore.addEventListener('click', handleLoadMore);


function handleSearch(event) {
    event.preventDefault();
        
    clearHitsPhotos();
    newsApi.query = event.currentTarget.elements.searchQuery.value.trim();
    if (newsApi.query === '') {
        btnLoadMore.classList.add('is-hidden');
    return  Notiflix.Notify.warning('Please enter a search parameter')  
    }
    btnLoadMore.classList.remove('is-hidden')
    newsApi.resetPage();
    newsApi.fetchPixabayGallery().then(appendHitsMarkup);
    
}

function handleLoadMore() {
     
    newsApi.fetchPixabayGallery().then(appendHitsMarkup)
    
}

function appendHitsMarkup(hits) {
galleryList.insertAdjacentHTML('beforeend', hitsCards(hits))
}

function clearHitsPhotos() {
    galleryList.innerHTML = '';
}