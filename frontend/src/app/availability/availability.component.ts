import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductAvailabilityData } from '../api';
import { EChartsOption } from 'echarts';
import { reportPeriods } from '../../objects/definedValues';
import { TranslatePipe } from '@ngx-translate/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import * as echarts from 'echarts/core';
import { EChartsType } from 'echarts/core';
import { Store } from '@ngrx/store';
import {
  getProductsList,
  ProductState,
} from '../state/product/product.selectors';
import { retrieveProductList } from '../state/product/product.action';
import { readProductAvailabilityForPeriod } from '../state/report/report.action';
import {
  getProductAvailabilityList,
  ReportState,
} from '../state/report/report.selectors';

echarts.use([
  GridComponent,
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
  LineChart,
]);

@Component({
  selector: 'app-availability',
  imports: [
    TranslatePipe,
    NgForOf,
    NgxEchartsDirective,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css',
})
export class AvailabilityComponent implements OnInit {
  public initialDays: number = 720;
  protected products$!: Observable<Product[]>;
  private _storeProduct$: Store<ProductState> = inject(Store);
  private _storeReport$: Store<ReportState> = inject(Store);
  public _chart$: EChartsType | undefined = undefined;
  public legend: string[] = [];
  public periods: any[] = reportPeriods;
  public chartData: any[] = [];
  private options: EChartsOption | null = null;
  private _formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      period: this.initialDays,
      idProduct: 0,
      product: null,
    });
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  ngOnInit() {
    let ctx = document.getElementById('chart') || null;
    if (ctx) {
      this._chart$ = echarts.init(ctx);
    }
    this._storeProduct$.dispatch(retrieveProductList());
    this.products$ = this._storeProduct$.select(getProductsList);
    this.prepareChartOptions([], [], []);
  }

  clearChart() {
    this._chart$?.clear();
    this.chartData = [];
    this.legend = [];
    this.prepareChartOptions([], [], this.legend);
    if (this.options != null) {
      this._chart$?.setOption(this.options);
    }
  }

  updateDiagram($event: any) {
    this._formGroup.value.idProduct = $event.target.value;
    if (this._formGroup.value.idProduct > 0) {
      this._storeReport$.dispatch(
        readProductAvailabilityForPeriod({
          idProduct: this._formGroup.value.idProduct,
          period: this._formGroup.value.period,
        })
      );
      this._storeReport$
        .select(getProductAvailabilityList)
        .subscribe((data: ProductAvailabilityData[]) => {
          if (data.length > 0) {
            let chartData: any[] = data;
            let series = {
              name: data[0].productName,
              type: 'line',
              data: chartData.map((item) => {
                return item.count;
              }),
            };
            this.chartData.push(series);
            this.legend.push(data[0].productName || '');
            let axisX = chartData.map((item) => {
              return item.date;
            });
            this.prepareChartOptions(axisX, this.chartData, this.legend);
          }
        });
    }
  }

  prepareChartOptions(axisX: any[], series: any[], legend: any[]) {
    this.options = {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        },
      },
      legend: {
        data: legend,
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: axisX,
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        scale: true,
      },
      series: series,
    };
    this._chart$?.setOption(this.options);
  }
}
