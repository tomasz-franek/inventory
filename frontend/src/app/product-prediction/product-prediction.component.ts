import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  AsyncPipe,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgStyle,
} from '@angular/common';
import { reportPeriods } from '../../objects/definedValues';
import { ProductPredictionData } from '../api';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  getProductPredictionList,
  ReportState,
} from '../state/report/report.selectors';
import { retrieveProductPredictionData } from '../state/report/report.action';

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
export class ProductPredictionComponent {
  public predictions$!: Observable<ProductPredictionData[]>;
  private _reportStore$: Store<ReportState> = inject(Store);
  private oneDay = 24 * 60 * 60 * 1000;
  public periods: any[] = reportPeriods;
  private _productPredictionForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._productPredictionForm = this.formBuilder.group({
      period: reportPeriods[0].value,
      time: 60,
    });
  }

  get productPredictionForm(): FormGroup {
    return this._productPredictionForm;
  }

  async ngOnInit() {
    this._reportStore$.dispatch(retrieveProductPredictionData());
    this.predictions$ = this._reportStore$.select(getProductPredictionList);
    // this.startProgress();
    // zip(
    //   this.dataService.readStoragePrediction()
    // ).subscribe(
    //   {
    //     next: (response) => {
    //       this.allPredictions = response[0] || [];
    //       this.filterPeriod();
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       this.alertService.error(error.statusText);
    //     },
    //     complete:()=>{
    //       this.completeProgress();
    //     }
    //   }
    // );
  }

  filterPeriodEvent($event: any) {
    this._productPredictionForm.value.time = $event.target.value || 60;
    this.filterPeriod();
  }

  filterPeriod() {
    let currentTime = new Date().getTime();
    // this.predictions = this.allPredictions.filter(
    //   (el) =>
    //     el.predictedAvailabilityDateCore < currentTime + this.time * this.oneDay
    // );
  }

  rowColor(row: any) {
    let currentTime = new Date().getTime();
    if (
      row.predictedAvailabilityDateCore >
      currentTime + row.limitMax * this.oneDay
    ) {
      return '#98FB98';
    }
    if (
      row.predictedAvailabilityDateCore >
      currentTime + row.limitMed * this.oneDay
    ) {
      return '#FFFACD';
    }
    if (
      row.predictedAvailabilityDateCore >
      currentTime + row.limitMin * this.oneDay
    ) {
      return '#FFC0BB';
    }
    return '#F08080';
  }

  async addToShopping(row: any) {
    // this.startProgress();
    // await this.dataService.addShopping(row.productName, 1, row.idProduct)
    //   .subscribe({
    //     next: (data) => {
    //       if(data instanceof HttpResponse){
    //         this.alertService.success(data.statusText);
    //       }
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       this.alertService.error(error.statusText);
    //     },
    //     complete:() => {
    //       this.completeProgress();
    //     }
    //   });
  }
}
