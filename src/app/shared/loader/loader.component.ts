import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  @Input() upto: number;
  percentage = 0;
  progress = 0;
  dasharray = '0, 1000';
  input_percentage: number;
  radius = 30;
  sleep: Subscription;
  constructor() { }

  ngOnInit() {
    this.showProgress();
  }

  showProgress() {
    this.upto = (this.upto > 100) ? 100 : ((this.upto < 0) ? 0 : this.upto);
    this.input_percentage = (this.upto / 100) * (2 * Math.PI * this.radius);
    this.sleep = interval(25).subscribe((i) => {
      this.animateCircle();
    });
  }

  animateCircle() {
    this.percentage = (this.progress / 100) * (2 * Math.PI * this.radius);
    if (this.percentage >= this.input_percentage) {
      this.sleep.unsubscribe();
    } else {
      this.progress++;
      this.dasharray = `${this.percentage}, 1000`;
    }
  }

  ngOnDestroy(): void {
    this.sleep.unsubscribe();
  }
}
