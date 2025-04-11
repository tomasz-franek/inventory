import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  AsyncPipe,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgStyle,
} from '@angular/common';
import { reportPeriods } from '../../objects/definedValues';
import { ProductPredictionData, Shopping } from '../api';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  getFilteredProductPredictionList,
  ReportState,
} from '../state/report/report.selectors';
import {
  filterProductPrediction,
  retrieveProductPredictionData,
} from '../state/report/report.action';
import { ShoppingState } from '../state/shopping/shopping.selectors';
import { saveShopping } from '../state/shopping/shopping.action';

@Component({
  selector: 'app-product-prediction',
  imports: [
    TranslatePipe,
    AsyncPipe,
    DecimalPipe,
    DatePipe,
    NgStyle,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './product-prediction.component.html',
  styleUrl: './product-prediction.component.css',
})
export class ProductPredictionComponent implements OnInit {
  public predictions$!: Observable<ProductPredictionData[]>;
  private _storeReport$: Store<ReportState> = inject(Store);
  private _storeShopping$: Store<ShoppingState> = inject(Store);
  private oneDayEpoch = 24 * 60 * 60;
  public periods: any[] = reportPeriods;
  private _formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      period: reportPeriods[0].value,
      time: 60,
    });
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  async ngOnInit() {
    this._storeReport$.dispatch(retrieveProductPredictionData());
    this.predictions$ = this._storeReport$.select(
      getFilteredProductPredictionList
    );
  }

  filterPeriodEvent($event: any) {
    this._formGroup.value.time = $event.target.value || 60;
    this._storeReport$.dispatch(
      filterProductPrediction({ days: this._formGroup.value.time })
    );
    this.filterPeriod();
  }

  filterPeriod() {
    this.predictions$ = this._storeReport$.select(
      getFilteredProductPredictionList
    );
  }

  rowColor(row: any) {
    let currentTime = new Date().getTime();
    if (
      row.predictedAvailabilityDateCore >
      currentTime + row.limitMax * this.oneDayEpoch
    ) {
      return '#98FB98';
    }
    if (
      row.predictedAvailabilityDateCore >
      currentTime + row.limitMed * this.oneDayEpoch
    ) {
      return '#FFFACD';
    }
    if (
      row.predictedAvailabilityDateCore >
      currentTime + row.limitMin * this.oneDayEpoch
    ) {
      return '#FFC0BB';
    }
    return '#F08080';
  }

  async addToShopping(row: ProductPredictionData) {
    let shopping: Shopping = {
      name: row.productName || '',
      count: 1,
      idProduct: row.idProduct,
      items: 1,
      optLock: 0,
    };
    this._storeShopping$.dispatch(saveShopping({ shopping }));
  }
}
