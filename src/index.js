import PixabayAPI from './js/fetchPixabay';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lighbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: 'alt',
    captionsDelay: 500,
}) 


const searchForm = document.querySelector('#search-form');
const galleryPhotos = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const pixabayApi = new PixabayAPI();
let isShown = 0;

searchForm.addEventListener('submit', handleSearch);
btnLoadMore.addEventListener('click', handleLoadMore);

function handleSearch(event) {
    event.preventDefault();
    galleryPhotos.innerHTML = '';
    pixabayApi.query = event.currentTarget.elements.searchQuery.value.trim();
    // pixabayApi.resetPage();
    if (pixabayApi.query === '') {
            return;
    }
    fetchGallery();
    handleRenderGallery(hits);
}
async function fetchGallery() {
    btnLoadMore.classList.add('is-hidden');
    const quantityPhoto = await pixabayApi.fetchGallery;
    const { hits, total } = quantityPhoto;
    isShown += hits.length;
    if (!hits.length) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        btnLoadMore.classList.add('is-hidden');
        return;
    }
    handleRenderGallery(hits);
    isShown += hits.length;
    if (isShown < total) {
        btnLoadMore.classList.remove('is-hidden');
        Notiflix.Notify.success('Hooray! We found totalHits images.');
    }
    if (isShown >= total) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        btnLoadMore.classList.add('is-hidden');
    }
}

function handleLoadMore() {
    fetchGallery();
}
function handleRenderGallery(elements) {
    const markup = elements.map(({ webformatURL, largeImageURL, tags, likes, views, comments, dowloads,
    }) => {
        return `
        <a href="${largeImageURL}">
        <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${dowloads}
    </p>
  </div>
</div>
</a>`
    }).join('');
    galleryPhotos.insertAdjacentHTML('beforeend', markup);
    lighbox.refresh();
}
