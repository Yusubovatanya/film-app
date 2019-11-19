import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { FilmIdComponent } from './film-id.component';
import { UserService } from 'src/app/shared/service/user.service';
import { UserMockService } from 'src/app/shared/service/user.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, InjectionToken } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ShortStatePipe } from 'src/app/shared/pipes/short-state.pipe';
import { LOCAL_CONFIG, localConfig } from 'src/app/shared/local-config';
import { Config } from 'src/app/shared/models/config-model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilmService } from 'src/app/shared/service/film.service';
import { FilmMockService } from 'src/app/shared/service/film-mock.service';
import { Film } from 'src/app/shared/models/film.model';
import { FilmListCredit } from 'src/app/shared/models/filmListCredit.model';
import { VideoList } from 'src/app/shared/models/video.model';


describe('ResultComponent', () => {
  let component: FilmIdComponent;
  let fixture: ComponentFixture<FilmIdComponent>;
  let userService;
  let filmService;
  let activatedRoute: ActivatedRoute;
  let config: Config;
  let filmId;
  let id;
  let activatedMockRoute = {
    snapshot: {
      paramMap: convertToParamMap({ id: '420809' })
    }
  };
  let data;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilmIdComponent, ShortStatePipe],
      imports: [RouterTestingModule, HttpClientTestingModule,],
      providers: [
        { provide: LOCAL_CONFIG, useValue: localConfig },
        { provide: UserService, useClass: UserMockService },
        { provide: FilmService, useClass: FilmMockService },
        {
          provide: ActivatedRoute, useValue: activatedMockRoute,
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be LOCAL_CONFIG', inject([LOCAL_CONFIG], () => {
    config = TestBed.get(LOCAL_CONFIG);
    component.imgFull = config.imgFull;
    expect(LOCAL_CONFIG).toBeTruthy();
  }));

  beforeEach(() => {
    userService = fixture.debugElement.injector.get(UserService);
  });

  it('should be created userService', () => {
    expect(UserService).toBeTruthy();
  });

  beforeEach(() => {
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
  });

  it('should get snapshot.paramMap id', async(() => {
    id = +activatedRoute.snapshot.paramMap.get('id');
    expect(id).toBe(420809);
  }));

  it('should be created FilmService', inject([FilmService], (service) => {
    expect(FilmService).toBeTruthy();
    filmService = service;
  }))

  it('should get data', () => {
    forkJoin(
      filmService.getFilmId(id),
      filmService.getActorCast(id),
      filmService.getVideos(id),
    ).subscribe((res: [Film, FilmListCredit, VideoList]) => {
      data = res;
      filmId = data[0];
      expect(data.length).toBe(3);
    })
  })

  it('should get data[0] id', () => {
    expect(filmId.id).toBe(id);
  })

  it('should get data[0] favorite', () => {
    const idListFavorite = userService.buildFavorites();
    expect(idListFavorite[0]).toBe(id);
    expect(idListFavorite.indexOf(filmId.id) > -1).toBe(true);
  })


  it('should get data[1]', () => {
    expect(data[1].id).toBe(id);
  })

  it('should get data[1] tobe id', () => {
    const actorListCast = data[1].cast;
    expect(actorListCast.length).toBe(2);
  })

  it('should get data[1] actorCrewDirector', () => {
    const actorCrewDirector = data[1].crew.filter(item => {
      return item.job.toLocaleLowerCase() === 'director';
    });
    expect(actorCrewDirector.length).toBe(3);
  })

  it('should get data[2] length', () => {
    expect(data[2].results.length).toBe(2);
  })

  it('should get data[2] Trailer', () => {
    const trailerElement = data[2].results.filter(element => {
      return element.type = 'Trailer';
    });
    expect(trailerElement.length).toBe(2);
  })

  it('should starFilm', () => {
    userService.makeFavoriteService(filmId,!filmId.isFavorite);
    // component.starFilm();
    expect(!filmId.isFavorite).toBe(filmId.isFavorite);
  })
     
})
