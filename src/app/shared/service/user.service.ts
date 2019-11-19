import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LOCAL_CONFIG } from 'src/app/shared/local-config';
import { Config } from 'src/app/shared/models/config-model';
import { forkJoin, of, BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { Film } from 'src/app/shared/models/film.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userListService: User;
  filmBookMarkListService: Film[] = [];
  session_id: string;
  account_id: number;
  filmFavoriteListService: Film[] = [];
  totalResultFavorite: number;
  totalResultMark: number;
  totalPagesFavorite = 0;
  totalPagesMark = 0;
  currentFavoritePage = 1;
  currentMarkPage = 1;

  observerFavorite = new BehaviorSubject<number>(null);
  observerBookMark = new BehaviorSubject<number>(null);
  observerName = new BehaviorSubject<string>('');
  initFavorite$ = this.observerFavorite.asObservable();
  initBookMark$ = this.observerBookMark.asObservable();
  initName$ = this.observerName.asObservable();

  constructor(@Inject(LOCAL_CONFIG) public localConfig: Config, private http: HttpClient) { }

  getUser() {
    this.session_id = localStorage.getItem('auth_token');
    const params = new HttpParams().set('session_id', this.session_id);
    return this.http.get(`${this.localConfig.userUrl}${this.localConfig.apiKey}`, { params: params }).pipe(
      tap((res: User) => {
        this.userListService = res;
        this.account_id = res.id;
        this.observerName.next(res.username);
        return this.userListService;
      })
    );
  }

  getFavoriteFilmsService() {
    this.filmFavoriteListService = [];
    return this.getFavorite().pipe(
      switchMap((ap: any) => {
        const taskQueue = [of(ap)];
        for (let i = 2; i <= ap.total_pages; i++) {
          taskQueue.push(this.getFavorite(i));
        }
        const observables = [...taskQueue];
        return forkJoin(observables).pipe(
          tap((res: any) => {
            res.forEach(page => {
              this.filmFavoriteListService = this.filmFavoriteListService.concat(page.results);
            });
            this.totalResultFavorite = this.filmFavoriteListService.length;
            this.observerFavorite.next(this.totalResultFavorite);
          })
        );
      })
    );
  }

  getFavorite(page = 1) {
    return this.http.get(`${this.localConfig.userAccId}${this.account_id}/favorite/movies?page=${page}&sort_by=created_at.asc&language=ru-RU&session_id=${this.session_id}${this.localConfig.paramsApi}`);
  }

  getBookMarkFilmsService(sort: string = 'asc') {
    this.filmBookMarkListService = [];
    return this.getBookMark().pipe(
      switchMap((ap: any) => {
        const taskQueue = [of(ap)];
        for (let i = 2; i <= ap.total_pages; i++) {
          taskQueue.push(this.getBookMark(i));
        }
        const observables = [...taskQueue];
        return forkJoin(observables).pipe(
          tap((res: any) => {
            res.forEach(page => {
              this.filmBookMarkListService = this.filmBookMarkListService.concat(page.results);
            });
            this.totalResultMark = this.filmBookMarkListService.length;
            this.observerBookMark.next(this.totalResultMark);
          })
        );
      })
    );
  }

  getBookMark(page = 1) {
    return this.http.get(`${this.localConfig.userAccId}${this.account_id}/watchlist/movies?page=${page}&sort_by=created_at.desc&language=ru-RU&session_id=${this.session_id}${this.localConfig.paramsApi}`);
  }

  makeFavoriteService(id, status) {
    this.initParamsFavorite();
    return this.http.post(`${this.localConfig.userAccId}${this.account_id}/favorite?api_key=${this.localConfig.apiKey}&session_id=${this.session_id}`, {
      'media_type': 'movie',
      'media_id': id,
      'favorite': status,
    });
  }

  makeBookMarkService(id, status) {
    this.initParamsBookMark();
    return this.http.post(`${this.localConfig.userAccId}${this.account_id}/watchlist?api_key=${this.localConfig.apiKey}&session_id=${this.session_id}`, {
      'media_type': 'movie',
      'media_id': id,
      'watchlist': status,
    });
  }

  initParamsFavorite() {
    this.filmFavoriteListService = [];
    this.currentFavoritePage = 1;
    this.totalPagesFavorite = 0;
    this.totalResultFavorite = 0;
  }

  initParamsBookMark() {
    this.filmBookMarkListService = [];
    this.totalPagesMark = 0;
    this.totalResultMark = 0;
    this.currentMarkPage = 1;
  }

  buildFavorites() {
    return this.filmFavoriteListService.map(film => film.id);
  }

  buildMarks() {
    return this.filmBookMarkListService.map(film => film.id);
  }

  deleteSession() {
    const params = new HttpParams().set('session_id', this.session_id);
    return this.http.delete(`${this.localConfig.apiUrl}/authentication/session?api_key=${this.localConfig.apiKey}`, { params: params });
  }

  getTest() {
    return this.http.get(`${this.localConfig.userAccId}${this.account_id}/favorite/movies?page=1&sort_by=created_at.asc\&language=ru-RU&session_id=${this.session_id}${this.localConfig.paramsApi}`);
  }
}
