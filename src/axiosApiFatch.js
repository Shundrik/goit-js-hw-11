import Axios from 'axios';
import Notiflix from 'notiflix';

export default class AxiosApiFatch {

  constructor() {
    this.serchQuery = '';
    this.page = 1;
  }

  get query() {
    return this.serchQuery;
  }

  set query(newQuery) {
    this.serchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }

  fetchSerch() {
    const axios = `https://pixabay.com/api/?key=30160414-47cf1727b7538b95ab171b382&q=${this.serchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    
   return Axios.get(axios)
      .then((response)=> {
        console.log(response);
        this.page += 1;
    // let totalHits = response.data.totalHits;
    // Notiflix.Notify.info(`Hooray! We found ${totalHits}  images.`);
    
        let pictures =  response.data.hits;
        return pictures
      })
        .catch(function (error) {
        // обработка ошибки
        console.log(error);
      })
     }
}
