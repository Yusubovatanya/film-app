import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
  ) {
  }

  counter = 5;
  subscription$: Subscription;
  observable: Observable<number>;

  ngOnInit() {

    this.observable = interval(1000).pipe(
      map(item => {
        return 4 - item;
      }),
      take(5)
    );

    this.subscription$ = this.observable.subscribe(
      time => this.counter = time,
      error => console.log(error),
      () => this.router.navigate(['/main'])
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
