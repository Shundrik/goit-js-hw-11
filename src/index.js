import Notiflix from 'notiflix';
import Axios from 'axios';
import debounce from 'lodash.debounce';
import AxiosApiFatch from './axiosApiFatch';
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

// overlay();

const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  btn: document.querySelector('button'),
  btnLoadMore: document.querySelector('.load-more'),
  divGallery: document.querySelector('.gallery'),
};
let lightBox = new SimpleLightbox('.gallery__item a', {
  captionsData: 'alt',
  captionDelay: 250,
});
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
  newAxiosApiFatch.fetchSerch().then(pictures => {
    console.log(pictures);
    console.log(newAxiosApiFatch);
    pictures.length === 0 ? Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    ) : ""

    if (pictures.length > 0 && pictures.length === 40) {
      refs.btnLoadMore.classList.remove('not-visible');
      renderMarkup(pictures);
      console.log('remuve class');
      lightBox.refresh()
      return;
    }
    renderMarkup(pictures);
     });
  clearPicture();
}
// ___________

// function markup(pictures) {
//   return pictures
//     .map(({ views, previewURL, tags, likes, comments, downloads }) => {
//       return `<div class="photo-card">
//           <img src="${previewURL}" alt="${tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item">
//             <b>likes ${likes}</b>
//           </p>
//           <p class="info-item">
//             <b>views ${views}</b>
//            </p>
//           <p class="info-item">
//            <b>comments ${comments}</b>
//           </p>
//           <p class="info-item">
//             <b>downloads ${downloads}</b>
//           </p>
//         </div>
//       </div>`;
//     })
//     .join('');
// }

// ______________


function markup(pictures) {
  console.log(pictures);
  return pictures
    .map(({ views, previewURL, tags, likes, comments, downloads, largeImageURL }) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${largeImageURL}">
         <img class="gallery__image" src="${previewURL}" alt="${tags}" title="${tags}" loading="lazy" />
        </img>
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
        </a>
      </div>`;
    })
    .join('');
}
// const galleryCreate = markup(pictures);
// galleryRef.insertAdjacentHTML("beforeEnd", galleryCreate);


// lightBox.next()


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
// function renderThatsAll() {
//   // clearTegP()
//   refs.divGallery.insertAdjacentHTML(
//     'afterend',
//     `<p class="infoEnd"> OOO the end! </p>`
//   );
// }


