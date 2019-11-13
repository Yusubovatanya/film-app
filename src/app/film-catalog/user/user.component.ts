import { Component, OnInit } from '@angular/core';
import { AppSpinnerService } from 'src/app/shared/service/app-spinner.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  constructor(
    public appSpinnerService: AppSpinnerService,
  ) { }

  ngOnInit() {
    this.appSpinnerService.showOrHideSpinner(false);
   }

}
