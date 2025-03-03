import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AsyncPipe, DecimalPipe, NgForOf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { reportPeriods } from '../../objects/definedValues';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  getNextDaysExpiredList,
  ReportState,
} from '../state/report/report.selectors';
import { NextDayExpiredData } from '../api';
import { retrieveNexDaysExpiredData } from '../state/report/report.action';

@Component({
  selector: 'app-next-days-expired',
  imports: [
    TranslatePipe,
    NgForOf,
    ReactiveFormsModule,
    DecimalPipe,
    AsyncPipe,
  ],
  templateUrl: './next-days-expired.component.html',
  styleUrl: './next-days-expired.component.css',
})
export class NextDaysExpiredComponent implements OnInit {
  public items$!: Observable<NextDayExpiredData[]>;
  private _reportStore$: Store<ReportState> = inject(Store);
  public items: any = [];
  public days: number = 60;
  public periods: any[] = reportPeriods;
  private _formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      days: this.days,
    });
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  ngOnInit() {
    this.updateDays();
  }

  updateDays() {
    this._reportStore$.dispatch(
      retrieveNexDaysExpiredData({ days: this._formGroup.value.days })
    );
    this.items$ = this._reportStore$.select(getNextDaysExpiredList);
    // this.startProgress();
    // this.dataService.readNextDaysExpired(this.days).subscribe({
    //   next: (response) => {
    //     if (response != null) {
    //       this.items = response;
    //     } else {
    //       this.items = [];
    //     }
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.items = [];
    //     this.alertService.error(error.statusText);
    //   },
    //   complete: () => {
    //     this.completeProgress();
    //   },
    // });
  }
}
