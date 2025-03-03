import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { EChartsType } from 'echarts/core';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { EChartsOption } from 'echarts';
import { Store } from '@ngrx/store';
import {
  getSumPriceCategoryData,
  ReportState,
} from '../state/report/report.selectors';
import { retrieveSumPricesByCategory } from '../state/report/report.action';

echarts.use([
  GridComponent,
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
  PieChart,
]);

@Component({
  selector: 'app-sum-categories',
  imports: [TranslatePipe, NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './sum-categories.component.html',
  styleUrl: './sum-categories.component.css',
})
export class SumCategoriesComponent implements OnInit {
  private _chart$?: EChartsType;
  private _storeReport$: Store<ReportState> = inject(Store);
  private chartData: any[] = [];

  constructor() {}

  async ngOnInit() {
    let ctx = document.getElementById('chart') || null;
    if (ctx) {
      this._chart$ = echarts.init(ctx);
      this._chart$.clear();
    }
    this.chartData = [];
    this._storeReport$.dispatch(retrieveSumPricesByCategory());
    this._storeReport$.select(getSumPriceCategoryData).subscribe((data) => {
      data.forEach((item) => {
        this.chartData.push({
          value: item.value,
          name: item.categoryName,
        });
      });
      this.updateChart(this.chartData);
    });
  }

  private updateChart(newDataset: any[]) {
    debugger;
    let chartOption: EChartsOption = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          type: 'pie',
          data: newDataset,
          radius: ['40%', '70%'],
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
        },
      ],
    };
    this._chart$?.setOption(chartOption);
  }
}
