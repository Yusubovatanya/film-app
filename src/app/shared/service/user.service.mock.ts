import { of } from "rxjs"
import { Film } from "../models/film.model";

export class UserMockService {
  currentFavoritePage = 54;
  film: Film = {
    poster_path: '/skvI4rYFrKXS73BJxWGH54Omlvv.jpg',
    title: 'testTitleFilm',
    overview: 'test info about film',
    release_date: '2019-10-16',
    popularity: 100,
    id: 420809,
    isFavorite: true,
    isMark: false,
    vote_average: 5.6,
    production_countries: [
      { iso_3166_1: "US", name: "United States of America" }
    ],
    genres: [
      { id: 14, name: "фэнтези" },
      { id: 12, name: "приключения" },
    ],
    runtime: 120,
  };
  filmSecond: Film = {
    poster_path: '/skvI4rYFrKXS73BJxWGH54Omlvv.jpg',
    title: 'testTitleFilm',
    overview: 'test info about film',
    release_date: '2019-10-16',
    popularity: 100,
    id: 420801,
    isFavorite: true,
    isMark: false,
    vote_average: 5.6,
    production_countries: [
      { iso_3166_1: "US", name: "United States of America" }
    ],
    genres: [
      { id: 14, name: "фэнтези" },
      { id: 12, name: "приключения" },
    ],
    runtime: 120,
  };
  filmFavoriteListService: Film[] = [this.film, this.filmSecond];
  filmBookMarkListService: Film[] = [this.film, this.filmSecond];

  buildFavorites() {
    return this.filmFavoriteListService.map(film => film.id);
  }

  buildMarks() {
    return this.filmBookMarkListService.map(film => film.id);
  }

  makeFavoriteService(id, status) {
    const found = this.filmBookMarkListService.map(film => {
      if (film.id === id) {
        film.isFavorite = status;
        return film;
      }
    });
    
    return found[0];
  }

  getFavoriteFilmsService() {
    return this.filmFavoriteListService;
  }
}
