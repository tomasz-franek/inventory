import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Product, ProductPriceHistoryData } from '../api';
import { Property } from '../api/model/property';
import { retrieveProductList } from '../state/product/product.action';
import {
  filterProducts,
  ProductState,
} from '../state/product/product.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getProductHistoryData,
  ReportState,
} from '../state/report/report.selectors';
import { AsyncPipe } from '@angular/common';
import { retrieveProductPriceHistory } from '../state/report/report.action';
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
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { EChartsType } from 'echarts/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';

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
  imports: [ReactiveFormsModule, TranslatePipe, AsyncPipe, NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './price-history.component.html',
  styleUrl: './price-history.component.css',
})
export class PriceHistoryComponent implements OnInit {
  public items: ProductPriceHistoryData[] = [];
  public products: Product[] = [];
  public _chartData$: ProductPriceHistoryData[] = [];
  private property: Property = {
    idProperty: 0,
    currency: 'USD',
    idUser: 0,
    language: 'en',
  };
  private _storeProduct$: Store<ProductState> = inject(Store);
  protected _products$!: Observable<Product[]>;
  private _storeReport$: Store<ReportState> = inject(Store);
  private config: any = undefined;
  public _chart$: EChartsType | undefined = undefined;

  private _formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this._formGroup = this.formBuilder.group({
      idProduct: new FormControl(0, []),
      productName: new FormControl('', []),
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
    this.config.options.text = this.translate.instant('CHART_AVAILABILITY');
    this.config.options.scales.xAxis.title.text =
      this.translate.instant('DATE');
    let ctx = document.getElementById('chart');
    if (ctx) {
      this._chart$ = echarts.init(ctx);
    }
    this._storeProduct$.dispatch(retrieveProductList());
    this._products$ = this._storeProduct$.select(filterProducts);
    this.retrieveReportData();
  }

  retrieveReportData() {
    this._storeReport$.dispatch(
      retrieveProductPriceHistory({ idProduct: this.formGroup.value.idProduct })
    );
    this._storeReport$.select(getProductHistoryData).subscribe((data) => {
      this._chartData$ = data;
      if (this._formGroup.get('idProduct')?.value > 0) this.prepareChart();
    });
  }

  updateDiagram() {
    if (this._formGroup.get('idProduct')?.value > 0) {
      this.retrieveReportData();
    }
  }

  prepareChart() {
    if (this._chartData$ == undefined) {
      return;
    }
    let chartOption: EChartsOption = {
      title: {
        text:
          this.translate.instant('SUM_VALUES') + ' ' + this.property.currency,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: this._chartData$.map(function (item: ProductPriceHistoryData) {
          return item.operationDate;
        }),
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      yAxis: {
        type: 'value',
        min: 0,
      },
      series: {
        name: this.translate.instant('SUM_VALUES'),
        type: 'line',
        step: 'start',
        data: this._chartData$.map(function (item: ProductPriceHistoryData) {
          return item.price;
        }),
      },
    };
    this._chart$?.setOption(chartOption);
  }
}
