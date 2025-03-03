import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DownloadFileComponent } from '../download-file/download-file.component';
import { ExpiredReportData, ValidExpiredData } from '../api';
import { Observable } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  getExpiredProductList,
  ReportState,
} from '../state/report/report.selectors';
import { retrieveExpiredInventoryReportData } from '../state/report/report.action';

@Component({
  selector: 'app-expired-products',
  imports: [TranslatePipe, DownloadFileComponent, NgForOf, AsyncPipe, NgIf],
  templateUrl: './expired-products.component.html',
  styleUrl: './expired-products.component.css',
})
export class ExpiredProductsComponent implements OnInit {
  public expired$!: Observable<ExpiredReportData[]>;
  private _storeReport$: Store<ReportState> = inject(Store);

  constructor() {}

  ngOnInit() {
    this._storeReport$.dispatch(
      retrieveExpiredInventoryReportData({ idInventory: 0 })
    );
    this.expired$ = this._storeReport$.select(getExpiredProductList);
    // this.properties = JSON.parse(localStorage.getItem('properties') || '{}');
    // this.dataService.readExpired().subscribe({
    //   next: (response: Expired[]) => {
    //     this.expired = response;
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.alertService.error(error.statusText);
    //   },
    //   complete: () => {
    //     this.completeProgress();
    //   },
    // });
  }

  countItems(elements: ValidExpiredData[] | undefined): number {
    if (elements == undefined) {
      return 0;
    }
    return elements.reduce((sum: number, e: ValidExpiredData) => {
      return sum + (e.count != undefined ? e.count : 0);
    }, 0);
  }
}
