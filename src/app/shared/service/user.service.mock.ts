import { of } from "rxjs"


export class UserMockService {
  getFilmId(id: number) {
    return of({});
  }

  getActorCast(id: number) {
    return of({});
  }

  getVideos(id: number) {
    return of({});
  }

}