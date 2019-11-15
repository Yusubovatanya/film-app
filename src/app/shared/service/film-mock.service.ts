import { of } from "rxjs"
import { Film } from "../models/film.model";

export class FilmMockService {
  film: Film = {
    poster_path: '/skvI4rYFrKXS73BJxWGH54Omlvv.jpg',
    title: 'testTitleFilm',
    overview: 'test info about film',
    release_date: '2019-10-16',
    popularity: 100,
    id: 0,
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

  actorCast = {
    id: 0,
    cast: [
      {
        cast_id: 1,
        character: "Maleficent",
        credit_id: "59ae61ed925141078a053b18",
        gender: 1,
        id: 11701,
        name: "Angelina Jolie",
        order: 0,
        profile_path: "/gD8jlGkQC8GBajulNlIzBK1YEO1.jpg",
      },
      {
        cast_id: 2,
        character: "Maleficent",
        credit_id: "59ae61ed925141078a053b18",
        gender: 1,
        id: 21701,
        name: "test Angelina Jolie",
        order: 0,
        profile_path: "/gD8jlGkQC8GBajulNlIzBK1YEO1.jpg",
      }
    ],
    crew: [
      {
        credit_id: "5d50766f1d820f0017798bf4",
        department: "Editing",
        gender: 2,
        id: 1722,
        job: "director",
        name: "Craig Wood",
        profile_path: null,
      },
      {
        credit_id: "5d50766f1d820f0017798bf4",
        department: "Editing",
        gender: 2,
        id: 2722,
        job: "director",
        name: "Craig Wood",
        profile_path: null,
      },
      {
        credit_id: "5d50766f1d820f0017798bf4",
        department: "Editing",
        gender: 2,
        id: 3722,
        job: "director",
        name: "Craig Wood",
        profile_path: null,
      },
    ]
  }

  videos = {
    id: 0,
    results: [
      {
        id: "5cdb1ac5c3a36831dec6e37f",
        iso_639_1: "ru",
        iso_3166_1: "RU",
        key: "bS5aeX2lo4I",
        name: "Малефисента: Владычица тьмы – тизер-трейлер",
        site: "YouTube",
        size: 1080,
        type: "Trailer",
      },
      {
        id: "5d6e4ed700fb6b0012e0488b",
        iso_639_1: "ru",
        iso_3166_1: "RU",
        key: "L0ttxMz-tyo",
        name: "Малефисента: Владычица тьмы - официальный трейлер",
        site: "YouTube",
        size: 1080,
        type: "Trailer",
      }
    ]
  }

  getFilmId(id: number) {
    this.film.id = id;
    return of(this.film);
  }

  getActorCast(id: number) {
    this.actorCast.id = id;
    return of(this.actorCast);
  }

  getVideos(id: number) {
    this.videos.id = id;
    return of(this.videos);
  }
}
