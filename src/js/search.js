import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '679609-0229bb159674f4386da445b6d';
const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.target.search.value.trim();
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    return;
  }

  searchImages(query);
});

function searchImages(query) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  gallery.innerHTML = '';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          title: 'Info',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        gallery.innerHTML = '';
        return;
      }
      displayImages(data.hits);
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
      console.error('Error fetching images:', error);
    });
}

function displayImages(images) {
  gallery.innerHTML = images
    .map(
      image => `
        <a href="${image.largeImageURL}" class="image-card">
          <img src="${image.webformatURL}" alt="${image.tags}" />
          <div class="image-info">
            <p><strong>Likes:</strong> ${image.likes}</p>
            <p><strong>Views:</strong> ${image.views}</p>
            <p><strong>Comments:</strong> ${image.comments}</p>
            <p><strong>Downloads:</strong> ${image.downloads}</p>
          </div>
        </a>`
    )
    .join('');

  const lightbox = new SimpleLightbox('.gallery a', {
    /* opcje? */
  });
  lightbox.refresh();
}
