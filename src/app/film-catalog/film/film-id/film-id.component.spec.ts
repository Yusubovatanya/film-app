import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmIdComponent } from './film-id.component';
import { UserService } from 'src/app/shared/service/user.service';
import { UserMockService } from 'src/app/shared/service/user.service.mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('ResultComponent', () => {
  let component: FilmIdComponent;
  let fixture: ComponentFixture<FilmIdComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilmIdComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: UserService, useClass: UserMockService }
      ]
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
});
