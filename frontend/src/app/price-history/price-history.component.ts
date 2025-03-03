import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Product, ProductPriceHistoryData } from '../api';
import { Properties } from '../api/model/properties';
import { retrieveProductList } from '../state/product/product.action';
import {
  getProductsList,
  ProductState,
} from '../state/product/product.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getProductHistoryData,
  ReportState,
} from '../state/report/report.selectors';
import { AsyncPipe, NgForOf } from '@angular/common';
import { retrieveProductPriceHistory } from '../state/report/report.action';
import { chartColorsEnum } from '../../objects/definedValues';
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
} from 'chart.js';

Chart.register(
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  CategoryScale,
  LineController,
  LineElement
);
@Component({
  selector: 'app-price-history',
  imports: [ReactiveFormsModule, TranslatePipe, AsyncPipe, NgForOf],
  templateUrl: './price-history.component.html',
  styleUrl: './price-history.component.css',
})
export class PriceHistoryComponent implements OnInit {
  public items: ProductPriceHistoryData[] = [];
  public products: Product[] = [];
  public _chartData$: ProductPriceHistoryData[] = [];
  private properties: Properties = {
    currency: 'USD',
    idUser: 0,
    language: 'en',
  };
  private _storeProduct$: Store<ProductState> = inject(Store);
  protected _products$!: Observable<Product[]>;
  private _reportStore$: Store<ReportState> = inject(Store);
  private config: any = undefined;
  private chart: Chart | undefined = undefined;

  private _formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this._formGroup = this.formBuilder.group({
      idProduct: 0,
      productName: '',
    });
    this.config = {
      type: 'line',
      data: {
        datasets: [],
      },
      options: {
        title: {
          text: '',
        },
        scales: {
          xAxis: {
            time: {
              parser: 'YYYY-MM-DD',
              tooltipFormat: 'YYYY-MM-DD',
              displayFormats: {
                day: 'MMM YYYY',
              },
            },
            title: {
              display: true,
              text: 'Date',
            },
          },
          yAxis: {
            title: {
              display: true,
              text: 'Value',
            },
          },
        },
        options: {
          parsing: {
            xAxisKey: 'operationDate',
            yAxisKey: 'price',
          },
        },
      },
    };
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  ngOnInit() {
    this.config.options.scales.yAxis.title.text =
      this.translate.instant('PRODUCT_PRICE') + ' ' + this.properties.currency;
    this.config.options.text = this.translate.instant('CHART_AVAILABILITY');
    this.config.options.scales.xAxis.title.text =
      this.translate.instant('DATE');
    let ctx = document.getElementById('chart');
    this.chart = new Chart(ctx as HTMLCanvasElement, this.config);
    this._storeProduct$.dispatch(retrieveProductList());
    this._products$ = this._storeProduct$.select(getProductsList);
    this.retrieveReportData();
  }

  retrieveReportData() {
    this._reportStore$.dispatch(
      retrieveProductPriceHistory({ idProduct: this.formGroup.value.idProduct })
    );
    this._reportStore$.select(getProductHistoryData).subscribe((data) => {
      this._chartData$ = data;
      if (this._formGroup.value.idProduct > 0) this.prepareChart();
    });
  }

  updateDiagram() {
    if (this._formGroup.value.idProduct > 0) {
      this.retrieveReportData();
    }
  }

  prepareChart() {
    const dataset = {
      label:
        this.translate.instant('PRODUCT_PRICE') +
        ' ' +
        this._formGroup.value.idProduct,
      steppedLine: 'before',
      pointRadius: 8,
      pointHoverRadius: 12,
      showLine: false,
      borderColor: chartColorsEnum.green,
      data: this._chartData$,
    };
    this.config.data.datasets = [];
    this.config.data.datasets.push(dataset);
    this.chart?.update();
  }
}
