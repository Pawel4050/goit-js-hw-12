import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const API_KEY = '679609-0229bb159674f4386da445b6d';
const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');
const loader = document.getElementById('loader');

let currentPage = 1; // Zmienna globalna dla paginacji
let totalHits = 0; // Zmienna do przechowywania liczby wszystkich dostępnych obrazów
let query = ''; // Globalna zmienna przechowująca aktualne zapytanie

form.addEventListener('submit', event => {
  event.preventDefault();

  query = event.target.search.value.trim();
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    return;
  }

  gallery.innerHTML = ''; // Wyczyść galerię dla nowego zapytania
  loadMoreBtn.style.display = 'none'; // Ukryj przycisk na początku wyszukiwania
  currentPage = 1; // Resetuj paginację dla nowego zapytania
  searchImages(query);
});

loadMoreBtn.addEventListener('click', () => {
  currentPage++; // Zwiększ stronę, aby załadować więcej obrazów
  searchImages(query);
});

async function searchImages(query) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`;

  try {
    loader.style.display = 'block'; // Pokaż loader
    const response = await axios.get(url);
    const data = response.data;

    if (currentPage === 1) {
      totalHits = data.totalHits; // Przechowaj całkowitą liczbę obrazów
      if (totalHits === 0) {
        iziToast.info({
          title: 'Info',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        gallery.innerHTML = '';
        return;
      }
    }

    displayImages(data.hits);

    if (gallery.children.length >= totalHits) {
      // Jeśli osiągnięto koniec zbioru
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreBtn.style.display = 'none'; // Ukryj przycisk "Load more"
    } else {
      loadMoreBtn.style.display = 'block'; // Pokaż przycisk "Load more"
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
    console.error('Error fetching images:', error);
  } finally {
    loader.style.display = 'none'; // Ukryj loader po zakończeniu żądania
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

  gallery.insertAdjacentHTML('beforeend', markup); // Dodaj obrazy do galerii
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
