import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { LastUsedData } from '../api';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getLastUsedList, ReportState } from '../state/report/report.selectors';
import { retrieveLastUsedReportData } from '../state/report/report.action';

@Component({
  selector: 'app-last-used',
  imports: [TranslatePipe, NgIf, NgForOf, AsyncPipe],
  templateUrl: './last-used.component.html',
  styleUrl: './last-used.component.css',
})
export class LastUsedComponent implements OnInit {
  public items$!: Observable<LastUsedData[]>;
  private _storeReport$: Store<ReportState> = inject(Store);

  ngOnInit() {
    this._storeReport$.dispatch(retrieveLastUsedReportData({ idInventory: 1 }));
    this.items$ = this._storeReport$.select(getLastUsedList);
  }
}
