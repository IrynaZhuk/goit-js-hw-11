import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import {fetchImages} from './js/request';
import {makeMarkupGallery} from './js/makeMarkupGallery';

let page = 1;
let lightbox;

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallary = document.querySelector('.gallary');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault();
    page = 1;

    const inputValue = evt.currentTarget.elements.searchQuery.value.trim();

    if (!inputValue) {
        return Notify.info('Sorry, there are no images matching your search query. Please try again.')
    }

    firstRenderMarkupGallery(inputValue);
}

function firstRenderMarkupGallery (searchIteam) {
    fetchImages(searchIteam, page).then(response => {
        if (!response.hits.length) {
            return Notify.info ('Unfortunately, there are not any matches. Try again, please') 
        }

        if (response.hits.length < 40) {
loadMoreBtn.classList.add('display-none')
        }

        gallery.innerHTML = '';
      Notify.info(`We have found ${response.totalHits} images.`);
      gallery.insertAdjacentHTML('beforeend', makeMarkupGallery(response.hits));
    })
}