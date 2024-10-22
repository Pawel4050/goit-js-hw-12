import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '679609-0229bb159674f4386da445b6d';
const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

let currentQuery = '';
let page = 1;
const perPage = 40;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = event.target.search.value.trim();
  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    return;
  }

  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  await searchImages(currentQuery);
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await searchImages(currentQuery);
});

async function searchImages(query) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.hits.length === 0 && page === 1) {
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    totalHits = data.totalHits;

    displayImages(data.hits);

    const totalLoaded = page * perPage;

    if (totalLoaded >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
    console.error('Error fetching images:', error);
  }
}

function displayImages(images) {
  const markup = images
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

  gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

function smoothScroll() {
  const firstGalleryItem = document.querySelector('.image-card');
  if (firstGalleryItem) {
    const itemHeight = firstGalleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  }
}
