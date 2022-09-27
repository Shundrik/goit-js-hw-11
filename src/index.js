import Notiflix from 'notiflix';
import Axios from 'axios';
import debounce from 'lodash.debounce';
import AxiosApiFatch from './axiosApiFatch';

// class LoadMoreBtn {

//   constructor({selector, hidden = true}) {
//     this.refs = this.getRefs(selector)
//   }
// hidden && this.hibe();

// }

const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  btn: document.querySelector('button'),
  btnLoadMore: document.querySelector('.load-more'),
  divGallery: document.querySelector('.gallery'),
};

// renderThatsAll()

const newAxiosApiFatch = new AxiosApiFatch();

refs.form.addEventListener('submit', onSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onSubmit(e) {
  e.preventDefault();
  newAxiosApiFatch.query = e.currentTarget.elements.searchQuery.value;
  if (newAxiosApiFatch.query === '') {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  newAxiosApiFatch.resetPage();
  // newAxiosApiFatch.fetchSerch().then(renderMarkup);
  newAxiosApiFatch.fetchSerch().then(pictures => {
    console.log(pictures);
    console.log(newAxiosApiFatch);

    if (pictures.length > 0 && pictures.length === 40) {
      refs.btnLoadMore.classList.remove('not-visible');
      renderMarkup(pictures);
      console.log('remuve class');
      return;
    }
    renderMarkup(pictures);
    // Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
    // return;
  });
  clearPicture();
}

function markup(pictures) {
  return pictures
    .map(({ views, previewURL, tags, likes, comments, downloads }) => {
      return `<div class="photo-card">
          <img src="${previewURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>views ${views}</b>
           </p>
          <p class="info-item">
           <b>comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>downloads ${downloads}</b>
          </p>
        </div>
      </div>`;
    })
    .join('');
}

function renderMarkup(pictures) {
  refs.divGallery.insertAdjacentHTML('beforeend', markup(pictures));
}

function onLoadMore() {
  newAxiosApiFatch.fetchSerch().then(pictures => {
    console.log(pictures.length);
    console.log(newAxiosApiFatch.page);

    console.log(newAxiosApiFatch.page === 2);
    if (pictures.length < 40 || newAxiosApiFatch.page === 14) {
      refs.btnLoadMore.classList.add('not-visible');
      renderMarkup(pictures);

      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results"
      );
    }
    renderMarkup(pictures);
  });
}

function clearPicture() {
  refs.divGallery.innerHTML = '';
}

// function clearTegP() {
//   refs.divGallery.innerHTML = '';
// }
function renderThatsAll() {
  // clearTegP()
  refs.divGallery.insertAdjacentHTML(
    'afterend',
    `<p class="infoEnd"> OOO the end! </p>`
  );
}
